import { Server, Socket } from 'socket.io';
import { GameState, Trade } from '../types';
import {
  getOrCreateRoom,
  getRoom,
  addPlayerToRoom,
  startGame,
  getGame,
  setGame,
} from '../game/GameManager';
import {
  currentPlayer,
  getPlayerById,
  getSpace,
  movePlayer,
  movePlayerTo,
  payRent,
  buyProperty,
  buildHouse,
  buildHotel,
  sellHouse,
  sellHotel,
  mortgageProperty,
  unmortgageProperty,
  drawCard,
  applyCard,
  sendToJail,
  exitJail,
  startAuction,
  placeBid,
  withdrawFromAuction,
  endAuction,
  proposeTrade,
  executeTrade,
  declareBankruptcy,
  advanceTurn,
} from '../game/GameState';
import { rollDice, isDoubles } from '../game/Dice';
import { getNearestOf } from '../game/RentCalculator';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function emit(io: Server, gameId: string, state: GameState) {
  io.to(gameId).emit('gameState', state);
}

function err(socket: Socket, message: string) {
  socket.emit('error', { message });
}

function guardGame(socket: Socket, gameId: string): GameState | null {
  const game = getGame(gameId);
  if (!game) {
    err(socket, 'Game not found.');
    return null;
  }
  return game;
}

function guardTurn(socket: Socket, game: GameState, playerId: string): boolean {
  const cp = currentPlayer(game);
  if (cp.id !== playerId) {
    err(socket, 'Not your turn.');
    return false;
  }
  return true;
}

function guardStarted(socket: Socket, game: GameState): boolean {
  if (game.status !== 'started') {
    err(socket, 'Game is not in progress.');
    return false;
  }
  return true;
}

// After rolling, resolve the space the player is on
function resolveSpace(
  io: Server,
  socket: Socket,
  game: GameState,
  playerId: string,
  diceTotal: number,
  doubleRent = false,
  utilityMultiplier?: number,
): void {
  const player = getPlayerById(game, playerId)!;
  const position = player.position;
  const space = getSpace(game, position);

  io.to(game.gameId).emit('playerMoved', {
    playerId,
    from: player.position,
    to: position,
    passedGo: false, // already notified via movePlayer
  });

  switch (space.type) {
    case 'go':
      // $200 already collected in movePlayer
      break;

    case 'go_to_jail':
      sendToJail(game, playerId);
      io.to(game.gameId).emit('jailEntered', { playerId });
      break;

    case 'tax':
      player.money -= space.taxAmount ?? 0;
      io.to(game.gameId).emit('taxPaid', { playerId, amount: space.taxAmount ?? 0 });
      break;

    case 'chance':
    case 'community_chest': {
      const card = drawCard(game, space.type);
      const overrides = applyCard(game, playerId, card, diceTotal);
      io.to(game.gameId).emit('cardDrawn', { playerId, deck: space.type, card });

      // If card moved player to a new space, resolve that space too
      if (card.action === 'advance_to' || card.action === 'advance_to_nearest') {
        if (card.action === 'advance_to' && player.position !== position) {
          resolveSpace(
            io, socket, game, playerId, diceTotal,
            overrides.rentDoubled ?? false,
            overrides.utilityMultiplier,
          );
        } else if (card.action === 'advance_to_nearest') {
          resolveSpace(
            io, socket, game, playerId, diceTotal,
            overrides.rentDoubled ?? false,
            overrides.utilityMultiplier,
          );
        }
      }
      break;
    }

    case 'property':
    case 'railroad':
    case 'utility': {
      if (!space.ownerId) {
        // Offer to buy
        io.to(game.gameId).emit('propertyLanded', { playerId, position, space });
      } else if (space.ownerId !== playerId) {
        const owner = getPlayerById(game, space.ownerId);
        if (owner && !owner.isBankrupt) {
          const amount = payRent(game, playerId, position, diceTotal, doubleRent, utilityMultiplier);
          if (amount > 0) {
            io.to(game.gameId).emit('rentPaid', {
              fromId: playerId,
              toId: space.ownerId,
              amount,
              position,
            });
          }
        }
      }
      break;
    }

    case 'jail':
    case 'free_parking':
    default:
      break;
  }
}

// ─── Register all socket events ──────────────────────────────────────────────

export function registerSocketHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    const socketPlayerId = socket.id;

    // ── joinGame ────────────────────────────────────────────────────────────
    socket.on('joinGame', ({ gameId, playerName, token }: { gameId: string; playerName: string; token: string }) => {
      getOrCreateRoom(gameId, socketPlayerId);
      const joinErr = addPlayerToRoom(gameId, { id: socketPlayerId, name: playerName, token });
      if (joinErr) return err(socket, joinErr);

      socket.join(gameId);

      const game = getGame(gameId);
      if (game) {
        socket.emit('gameState', game);
        return;
      }

      // Game not started yet — broadcast the full lobby state so all clients
      // can display the correct player list and know who the host is.
      const room = getRoom(gameId)!;
      io.to(gameId).emit('roomState', {
        gameId,
        hostId: room.hostId,
        players: room.pendingPlayers,
      });
    });

    // ── startGame ───────────────────────────────────────────────────────────
    socket.on('startGame', ({ gameId }: { gameId: string }) => {
      const result = startGame(gameId, socketPlayerId);
      if (typeof result === 'string') return err(socket, result);

      io.to(gameId).emit('gameStarted', result);
      emit(io, gameId, result);
    });

    // ── rollDice ────────────────────────────────────────────────────────────
    socket.on('rollDice', ({ gameId }: { gameId: string }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const player = currentPlayer(game);

      // Jail handling
      if (player.inJail) {
        const dice = rollDice();
        const total = dice[0] + dice[1];
        game.diceRoll = dice;

        io.to(gameId).emit('diceRolled', {
          playerId: socketPlayerId,
          dice,
          total,
          isDoubles: isDoubles(dice),
        });

        if (isDoubles(dice)) {
          exitJail(game, socketPlayerId, 'roll');
          io.to(gameId).emit('jailExited', { playerId: socketPlayerId, method: 'roll' });
          movePlayer(game, socketPlayerId, total);
          resolveSpace(io, socket, game, socketPlayerId, total);
        } else {
          player.jailTurnsRemaining -= 1;
          if (player.jailTurnsRemaining <= 0) {
            // Force pay fine and move
            if (player.money >= 50) {
              player.money -= 50;
              exitJail(game, socketPlayerId, 'fine');
              io.to(gameId).emit('jailExited', { playerId: socketPlayerId, method: 'fine' });
            }
            movePlayer(game, socketPlayerId, total);
            resolveSpace(io, socket, game, socketPlayerId, total);
          }
          // else: stay in jail, turn ends
        }
        setGame(gameId, game);
        emit(io, gameId, game);
        return;
      }

      // Normal roll
      const dice = rollDice();
      const total = dice[0] + dice[1];
      const doubles = isDoubles(dice);
      game.diceRoll = dice;
      game.lastDiceRollWasDoubles = doubles;

      if (doubles) {
        game.doublesCount += 1;
        if (game.doublesCount >= 3) {
          // Three doubles — go to jail
          sendToJail(game, socketPlayerId);
          io.to(gameId).emit('diceRolled', { playerId: socketPlayerId, dice, total, isDoubles: true });
          io.to(gameId).emit('jailEntered', { playerId: socketPlayerId });
          setGame(gameId, game);
          emit(io, gameId, game);
          return;
        }
      } else {
        game.doublesCount = 0;
      }

      io.to(gameId).emit('diceRolled', { playerId: socketPlayerId, dice, total, isDoubles: doubles });
      movePlayer(game, socketPlayerId, total);
      resolveSpace(io, socket, game, socketPlayerId, total);

      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── buyProperty ─────────────────────────────────────────────────────────
    socket.on('buyProperty', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const ok = buyProperty(game, socketPlayerId, position);
      if (!ok) return err(socket, 'Cannot buy this property.');

      io.to(gameId).emit('propertyBought', { playerId: socketPlayerId, position });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── declineBuy ──────────────────────────────────────────────────────────
    socket.on('declineBuy', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      startAuction(game, position);
      io.to(gameId).emit('auctionStarted', { auction: game.auction });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── placeBid ────────────────────────────────────────────────────────────
    socket.on('placeBid', ({ gameId, amount }: { gameId: string; amount: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      const bidErr = placeBid(game, socketPlayerId, amount);
      if (bidErr) return err(socket, bidErr);

      io.to(gameId).emit('auctionBid', { auction: game.auction });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── withdrawFromAuction ─────────────────────────────────────────────────
    socket.on('withdrawFromAuction', ({ gameId }: { gameId: string }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      withdrawFromAuction(game, socketPlayerId);

      const remaining = game.auction?.activeBidders ?? [];
      if (remaining.length <= 1) {
        const result = endAuction(game);
        io.to(gameId).emit('auctionEnded', result);
      } else {
        io.to(gameId).emit('auctionBid', { auction: game.auction });
      }
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── buildHouse ──────────────────────────────────────────────────────────
    socket.on('buildHouse', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const buildErr = buildHouse(game, socketPlayerId, position);
      if (buildErr) return err(socket, buildErr);

      io.to(gameId).emit('houseBuilt', { playerId: socketPlayerId, position });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── buildHotel ──────────────────────────────────────────────────────────
    socket.on('buildHotel', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const buildErr = buildHotel(game, socketPlayerId, position);
      if (buildErr) return err(socket, buildErr);

      io.to(gameId).emit('hotelBuilt', { playerId: socketPlayerId, position });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── sellHouse ───────────────────────────────────────────────────────────
    socket.on('sellHouse', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const sellErr = sellHouse(game, socketPlayerId, position);
      if (sellErr) return err(socket, sellErr);

      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── sellHotel ───────────────────────────────────────────────────────────
    socket.on('sellHotel', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const sellErr = sellHotel(game, socketPlayerId, position);
      if (sellErr) return err(socket, sellErr);

      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── mortgageProperty ────────────────────────────────────────────────────
    socket.on('mortgageProperty', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const mortErr = mortgageProperty(game, socketPlayerId, position);
      if (mortErr) return err(socket, mortErr);

      io.to(gameId).emit('propertyMortgaged', { playerId: socketPlayerId, position });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── unmortgageProperty ──────────────────────────────────────────────────
    socket.on('unmortgageProperty', ({ gameId, position }: { gameId: string; position: number }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const unErr = unmortgageProperty(game, socketPlayerId, position);
      if (unErr) return err(socket, unErr);

      io.to(gameId).emit('propertyUnmortgaged', { playerId: socketPlayerId, position });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── proposeTrade ────────────────────────────────────────────────────────
    socket.on('proposeTrade', ({ gameId, trade }: { gameId: string; trade: Trade }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      const tradeErr = proposeTrade(game, { ...trade, fromPlayerId: socketPlayerId });
      if (tradeErr) return err(socket, tradeErr);

      io.to(gameId).emit('tradeProposed', { trade: game.activeTrade });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── respondTrade ────────────────────────────────────────────────────────
    socket.on('respondTrade', ({ gameId, accept }: { gameId: string; accept: boolean }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      const trade = game.activeTrade;
      if (!trade) return err(socket, 'No active trade.');
      if (trade.toPlayerId !== socketPlayerId) return err(socket, 'Trade not addressed to you.');

      if (accept) {
        const execErr = executeTrade(game);
        if (execErr) return err(socket, execErr);
        io.to(gameId).emit('tradeCompleted', { trade });
      } else {
        trade.status = 'declined';
        game.activeTrade = null;
        io.to(gameId).emit('tradeDeclined', { trade });
      }

      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── payJailFine ─────────────────────────────────────────────────────────
    socket.on('payJailFine', ({ gameId }: { gameId: string }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const jailErr = exitJail(game, socketPlayerId, 'fine');
      if (jailErr) return err(socket, jailErr);

      io.to(gameId).emit('jailExited', { playerId: socketPlayerId, method: 'fine' });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── useJailCard ─────────────────────────────────────────────────────────
    socket.on('useJailCard', ({ gameId }: { gameId: string }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      const jailErr = exitJail(game, socketPlayerId, 'card');
      if (jailErr) return err(socket, jailErr);

      io.to(gameId).emit('jailExited', { playerId: socketPlayerId, method: 'card' });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── declareBankruptcy ───────────────────────────────────────────────────
    socket.on('declareBankruptcy', ({ gameId }: { gameId: string }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      // Determine creditor from context (simplify: pass null for bank bankruptcy)
      // In a full implementation the client would pass creditorId
      declareBankruptcy(game, socketPlayerId, null);

      io.to(gameId).emit('playerBankrupt', { playerId: socketPlayerId, creditorId: null });

      if (game.status === 'ended' && game.winner) {
        const winner = getPlayerById(game, game.winner)!;
        io.to(gameId).emit('gameOver', { winnerId: game.winner, winnerName: winner.name });
      }

      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── endTurn ─────────────────────────────────────────────────────────────
    socket.on('endTurn', ({ gameId }: { gameId: string }) => {
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, socketPlayerId)) return;

      // If last roll was doubles and player is not in jail, they must roll again
      if (game.lastDiceRollWasDoubles && !currentPlayer(game).inJail) {
        return err(socket, 'You rolled doubles — you must roll again.');
      }

      advanceTurn(game);
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── leaveGame ───────────────────────────────────────────────────────────
    socket.on('leaveGame', ({ gameId }: { gameId: string }) => {
      socket.leave(gameId);
      const game = getGame(gameId);
      if (game) {
        const player = getPlayerById(game, socketPlayerId);
        if (player) player.isConnected = false;
        setGame(gameId, game);
        io.to(gameId).emit('playerLeft', { playerId: socketPlayerId });
        emit(io, gameId, game);
      }
    });

    // ── disconnect ──────────────────────────────────────────────────────────
    socket.on('disconnect', () => {
      // Mark disconnected in any active game rooms
      // (Room tracking would need socket→gameId map for full impl)
    });
  });
}
