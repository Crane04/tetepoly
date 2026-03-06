import { Server, Socket } from "socket.io";
import { GameState, Trade, Card } from "../types";
import {
  getRoom,
  addPlayerToRoom,
  removePlayerFromRoom,
  startGame,
  getGame,
  setGame,
  getRoomList,
  getRoomPendingPlayers,
  getRoomPendingSocketIds,
  registerSocket,
  unregisterSocket,
  getPlayerIdFromSocket,
  getLocationForPlayer,
  setRoomCountdown,
  clearRoomCountdown,
  getRoomCountdownEndsAt,
} from "../game/GameManager";
import {
  currentPlayer,
  getPlayerById,
  getSpace,
  movePlayer,
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
} from "../game/GameState";
import { rollDice, isDoubles } from "../game/Dice";

const COUNTDOWN_SECONDS = 30;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function emit(io: Server, gameId: string, state: GameState) {
  io.to(gameId).emit("gameState", state);
}

function err(socket: Socket, message: string) {
  socket.emit("error", { message });
}

function guardAuth(socket: Socket): string | null {
  const playerId = getPlayerIdFromSocket(socket.id);
  if (!playerId) {
    err(socket, "Not authenticated.");
    return null;
  }
  return playerId;
}

function guardGame(socket: Socket, gameId: string): GameState | null {
  const game = getGame(gameId);
  if (!game) {
    err(socket, "Game not found.");
    return null;
  }
  return game;
}

function guardTurn(socket: Socket, game: GameState, playerId: string): boolean {
  const cp = currentPlayer(game);
  if (cp.id !== playerId) {
    err(socket, "Not your turn.");
    return false;
  }
  return true;
}

function guardStarted(socket: Socket, game: GameState): boolean {
  if (game.status !== "started") {
    err(socket, "Game is not in progress.");
    return false;
  }
  return true;
}

// ─── Timer Management ─────────────────────────────────────────────────────────

const roomTimers = new Map<string, NodeJS.Timeout>();

function broadcastRoomState(roomId: string, io: Server) {
  const room = getRoom(roomId);
  if (!room) return;
  io.to(roomId).emit("roomState", {
    gameId: roomId,
    players: getRoomPendingPlayers(roomId),
    countdownEndsAt: getRoomCountdownEndsAt(roomId),
  });
}

function scheduleAutoStart(roomId: string, io: Server) {
  if (roomTimers.has(roomId)) return; // already running
  const endsAt = Date.now() + COUNTDOWN_SECONDS * 1000;
  setRoomCountdown(roomId, endsAt);
  const timer = setTimeout(() => {
    roomTimers.delete(roomId);
    clearRoomCountdown(roomId);
    autoStartGame(roomId, io);
  }, COUNTDOWN_SECONDS * 1000);
  roomTimers.set(roomId, timer);
  broadcastRoomState(roomId, io);
  io.emit("roomsList", getRoomList());
}

function cancelAutoStart(roomId: string, io: Server) {
  const timer = roomTimers.get(roomId);
  if (timer) {
    clearTimeout(timer);
    roomTimers.delete(roomId);
    clearRoomCountdown(roomId);
  }
}

function autoStartGame(roomId: string, io: Server) {
  const result = startGame(roomId);
  if (typeof result === "string") {
    // Not enough players — reset and let waiting room know
    broadcastRoomState(roomId, io);
    io.emit("roomsList", getRoomList());
    return;
  }

  const { game, socketIds } = result;
  const gameCode = game.gameId;

  // Move each waiting-room socket to the game socket room
  for (const socketId of socketIds) {
    const s = io.sockets.sockets.get(socketId);
    if (s) {
      s.leave(roomId);
      s.join(gameCode);
    }
  }

  io.to(gameCode).emit("gameStarted", game);
  io.to(gameCode).emit("gameState", game);
  io.emit("roomsList", getRoomList());
}

// After rolling, resolve the space the player is on.
// Returns deferred events to emit AFTER gameState, so the client always
// starts the token animation before any modal/UI reaction is triggered.
interface DeferredEvents {
  cardDrawn?: { deck: "chance" | "community_chest"; card: Card };
  propertyLanded?: {
    playerId: string;
    position: number;
    space: ReturnType<typeof getSpace>;
  };
  rentPaid?: { fromId: string; toId: string; amount: number; position: number };
}

function resolveSpace(
  io: Server,
  socket: Socket,
  game: GameState,
  playerId: string,
  diceTotal: number,
  doubleRent = false,
  utilityMultiplier?: number,
): DeferredEvents {
  const player = getPlayerById(game, playerId)!;
  const position = player.position;
  const space = getSpace(game, position);

  io.to(game.gameId).emit("playerMoved", {
    playerId,
    from: player.position,
    to: position,
    passedGo: false,
  });

  switch (space.type) {
    case "go":
      break;

    case "go_to_jail":
      sendToJail(game, playerId);
      io.to(game.gameId).emit("jailEntered", { playerId });
      break;

    case "tax":
      player.money -= space.taxAmount ?? 0;
      io.to(game.gameId).emit("taxPaid", {
        playerId,
        amount: space.taxAmount ?? 0,
      });
      break;

    case "chance":
    case "community_chest": {
      const card = drawCard(game, space.type);
      const overrides = applyCard(game, playerId, card, diceTotal);

      if (
        card.action === "advance_to" ||
        card.action === "advance_to_nearest"
      ) {
        if (card.action === "advance_to" && player.position !== position) {
          resolveSpace(
            io,
            socket,
            game,
            playerId,
            diceTotal,
            overrides.rentDoubled ?? false,
            overrides.utilityMultiplier,
          );
        } else if (card.action === "advance_to_nearest") {
          resolveSpace(
            io,
            socket,
            game,
            playerId,
            diceTotal,
            overrides.rentDoubled ?? false,
            overrides.utilityMultiplier,
          );
        }
      }
      return { cardDrawn: { deck: space.type, card } };
    }

    case "property":
    case "railroad":
    case "utility": {
      if (!space.ownerId) {
        return { propertyLanded: { playerId, position, space } };
      } else if (space.ownerId !== playerId) {
        const owner = getPlayerById(game, space.ownerId);
        if (owner && !owner.isBankrupt) {
          const amount = payRent(
            game,
            playerId,
            position,
            diceTotal,
            doubleRent,
            utilityMultiplier,
          );
          if (amount > 0) {
            return {
              rentPaid: {
                fromId: playerId,
                toId: space.ownerId,
                amount,
                position,
              },
            };
          }
        }
      }
      break;
    }

    case "jail":
    case "free_parking":
    default:
      break;
  }
  return {};
}

function emitDeferred(
  io: Server,
  gameId: string,
  playerId: string,
  events: DeferredEvents,
): void {
  if (events.cardDrawn) {
    io.to(gameId).emit("cardDrawn", { playerId, ...events.cardDrawn });
  }
  if (events.propertyLanded) {
    io.to(gameId).emit("propertyLanded", events.propertyLanded);
  }
  if (events.rentPaid) {
    io.to(gameId).emit("rentPaid", events.rentPaid);
  }
}

// ─── Register all socket events ───────────────────────────────────────────────

export function registerSocketHandlers(io: Server): void {
  io.on("connection", (socket: Socket) => {
    // ── listRooms ────────────────────────────────────────────────────────────
    socket.on("listRooms", () => {
      socket.emit("roomsList", getRoomList());
    });

    // ── joinGame ─────────────────────────────────────────────────────────────
    // gameId can be a roomId (room-1…) or a gameCode (ABC123)
    socket.on(
      "joinGame",
      ({ gameId, playerName }: { gameId: string; playerName: string }) => {
        if (!playerName?.trim()) return err(socket, "Player name is required.");
        const name = playerName.trim();

        // Check if it's an active game (reconnect)
        const game = getGame(gameId);
        if (game) {
          const player = game.players.find((p) => p.id === name);
          if (!player) return err(socket, "You are not in this game.");
          registerSocket(socket.id, name);
          socket.join(gameId);
          player.isConnected = true;
          setGame(gameId, game);
          socket.emit("gameState", game);
          return;
        }

        // Otherwise treat as a room join (waiting queue)
        const room = getRoom(gameId);
        if (!room) return err(socket, "Room not found.");

        const joinErr = addPlayerToRoom(gameId, { name, socketId: socket.id });
        if (joinErr) return err(socket, joinErr);

        socket.join(gameId);

        broadcastRoomState(gameId, io);
        io.emit("roomsList", getRoomList());

        // Start countdown once we have ≥2 players
        if (room.pendingPlayers.length >= 2) {
          scheduleAutoStart(gameId, io);
        }
      },
    );

    // ── rollDice ─────────────────────────────────────────────────────────────
    socket.on("rollDice", ({ gameId }: { gameId: string }) => {
      const playerId = guardAuth(socket);
      if (!playerId) return;
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, playerId)) return;

      const player = currentPlayer(game);

      // Jail handling
      if (player.inJail) {
        const dice = rollDice();
        const total = dice[0] + dice[1];
        game.diceRoll = dice;

        io.to(gameId).emit("diceRolled", {
          playerId,
          dice,
          total,
          isDoubles: isDoubles(dice),
        });

        let jailDeferred: DeferredEvents = {};
        if (isDoubles(dice)) {
          exitJail(game, playerId, "roll");
          io.to(gameId).emit("jailExited", { playerId, method: "roll" });
          movePlayer(game, playerId, total);
          jailDeferred = resolveSpace(io, socket, game, playerId, total);
        } else {
          player.jailTurnsRemaining -= 1;
          if (player.jailTurnsRemaining <= 0) {
            if (player.money >= 50) {
              player.money -= 50;
              exitJail(game, playerId, "fine");
              io.to(gameId).emit("jailExited", { playerId, method: "fine" });
            }
            movePlayer(game, playerId, total);
            jailDeferred = resolveSpace(io, socket, game, playerId, total);
          }
        }
        setGame(gameId, game);
        emit(io, gameId, game);
        emitDeferred(io, gameId, playerId, jailDeferred);
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
          sendToJail(game, playerId);
          io.to(gameId).emit("diceRolled", {
            playerId,
            dice,
            total,
            isDoubles: true,
          });
          io.to(gameId).emit("jailEntered", { playerId });
          setGame(gameId, game);
          emit(io, gameId, game);
          return;
        }
      } else {
        game.doublesCount = 0;
      }

      io.to(gameId).emit("diceRolled", {
        playerId,
        dice,
        total,
        isDoubles: doubles,
      });
      movePlayer(game, playerId, total);
      const deferred = resolveSpace(io, socket, game, playerId, total);

      setGame(gameId, game);
      emit(io, gameId, game);
      emitDeferred(io, gameId, playerId, deferred);
    });

    // ── buyProperty ──────────────────────────────────────────────────────────
    socket.on(
      "buyProperty",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const ok = buyProperty(game, playerId, position);
        if (!ok) return err(socket, "Cannot buy this property.");

        io.to(gameId).emit("propertyBought", { playerId, position });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── declineBuy ───────────────────────────────────────────────────────────
    socket.on(
      "declineBuy",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        startAuction(game, position);
        io.to(gameId).emit("auctionStarted", { auction: game.auction });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── placeBid ─────────────────────────────────────────────────────────────
    socket.on(
      "placeBid",
      ({ gameId, amount }: { gameId: string; amount: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;

        const bidErr = placeBid(game, playerId, amount);
        if (bidErr) return err(socket, bidErr);

        io.to(gameId).emit("auctionBid", { auction: game.auction });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── withdrawFromAuction ──────────────────────────────────────────────────
    socket.on("withdrawFromAuction", ({ gameId }: { gameId: string }) => {
      const playerId = guardAuth(socket);
      if (!playerId) return;
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      withdrawFromAuction(game, playerId);

      const remaining = game.auction?.activeBidders ?? [];
      if (remaining.length <= 1) {
        const result = endAuction(game);
        io.to(gameId).emit("auctionEnded", result);
      } else {
        io.to(gameId).emit("auctionBid", { auction: game.auction });
      }
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── buildHouse ───────────────────────────────────────────────────────────
    socket.on(
      "buildHouse",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const buildErr = buildHouse(game, playerId, position);
        if (buildErr) return err(socket, buildErr);

        io.to(gameId).emit("houseBuilt", { playerId, position });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── buildHotel ───────────────────────────────────────────────────────────
    socket.on(
      "buildHotel",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const buildErr = buildHotel(game, playerId, position);
        if (buildErr) return err(socket, buildErr);

        io.to(gameId).emit("hotelBuilt", { playerId, position });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── sellHouse ────────────────────────────────────────────────────────────
    socket.on(
      "sellHouse",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const sellErr = sellHouse(game, playerId, position);
        if (sellErr) return err(socket, sellErr);

        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── sellHotel ────────────────────────────────────────────────────────────
    socket.on(
      "sellHotel",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const sellErr = sellHotel(game, playerId, position);
        if (sellErr) return err(socket, sellErr);

        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── mortgageProperty ─────────────────────────────────────────────────────
    socket.on(
      "mortgageProperty",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const mortErr = mortgageProperty(game, playerId, position);
        if (mortErr) return err(socket, mortErr);

        io.to(gameId).emit("propertyMortgaged", { playerId, position });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── unmortgageProperty ───────────────────────────────────────────────────
    socket.on(
      "unmortgageProperty",
      ({ gameId, position }: { gameId: string; position: number }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;
        if (!guardTurn(socket, game, playerId)) return;

        const unErr = unmortgageProperty(game, playerId, position);
        if (unErr) return err(socket, unErr);

        io.to(gameId).emit("propertyUnmortgaged", { playerId, position });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── proposeTrade ─────────────────────────────────────────────────────────
    socket.on(
      "proposeTrade",
      ({ gameId, trade }: { gameId: string; trade: Trade }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;

        const tradeErr = proposeTrade(game, {
          ...trade,
          fromPlayerId: playerId,
        });
        if (tradeErr) return err(socket, tradeErr);

        io.to(gameId).emit("tradeProposed", { trade: game.activeTrade });
        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── respondTrade ─────────────────────────────────────────────────────────
    socket.on(
      "respondTrade",
      ({ gameId, accept }: { gameId: string; accept: boolean }) => {
        const playerId = guardAuth(socket);
        if (!playerId) return;
        const game = guardGame(socket, gameId);
        if (!game) return;
        if (!guardStarted(socket, game)) return;

        const trade = game.activeTrade;
        if (!trade) return err(socket, "No active trade.");
        if (trade.toPlayerId !== playerId)
          return err(socket, "Trade not addressed to you.");

        if (accept) {
          const execErr = executeTrade(game);
          if (execErr) return err(socket, execErr);
          io.to(gameId).emit("tradeCompleted", { trade });
        } else {
          trade.status = "declined";
          game.activeTrade = null;
          io.to(gameId).emit("tradeDeclined", { trade });
        }

        setGame(gameId, game);
        emit(io, gameId, game);
      },
    );

    // ── payJailFine ──────────────────────────────────────────────────────────
    socket.on("payJailFine", ({ gameId }: { gameId: string }) => {
      const playerId = guardAuth(socket);
      if (!playerId) return;
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, playerId)) return;

      const jailErr = exitJail(game, playerId, "fine");
      if (jailErr) return err(socket, jailErr);

      io.to(gameId).emit("jailExited", { playerId, method: "fine" });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── useJailCard ──────────────────────────────────────────────────────────
    socket.on("useJailCard", ({ gameId }: { gameId: string }) => {
      const playerId = guardAuth(socket);
      if (!playerId) return;
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, playerId)) return;

      const jailErr = exitJail(game, playerId, "card");
      if (jailErr) return err(socket, jailErr);

      io.to(gameId).emit("jailExited", { playerId, method: "card" });
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── declareBankruptcy ────────────────────────────────────────────────────
    socket.on("declareBankruptcy", ({ gameId }: { gameId: string }) => {
      const playerId = guardAuth(socket);
      if (!playerId) return;
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;

      declareBankruptcy(game, playerId, null);
      io.to(gameId).emit("playerBankrupt", { playerId, creditorId: null });

      if (game.status === "ended" && game.winner) {
        const winner = getPlayerById(game, game.winner)!;
        io.to(gameId).emit("gameOver", {
          winnerId: game.winner,
          winnerName: winner.name,
        });
        io.emit("roomsList", getRoomList());
      }

      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── endTurn ──────────────────────────────────────────────────────────────
    socket.on("endTurn", ({ gameId }: { gameId: string }) => {
      const playerId = guardAuth(socket);
      if (!playerId) return;
      const game = guardGame(socket, gameId);
      if (!game) return;
      if (!guardStarted(socket, game)) return;
      if (!guardTurn(socket, game, playerId)) return;

      if (game.lastDiceRollWasDoubles && !currentPlayer(game).inJail) {
        return err(socket, "You rolled doubles — you must roll again.");
      }

      advanceTurn(game);
      setGame(gameId, game);
      emit(io, gameId, game);
    });

    // ── leaveGame ────────────────────────────────────────────────────────────
    socket.on("leaveGame", ({ gameId }: { gameId: string }) => {
      const playerName = getPlayerIdFromSocket(socket.id);
      socket.leave(gameId);

      // Check if this is a waiting room leave
      const room = getRoom(gameId);
      if (room && playerName) {
        removePlayerFromRoom(gameId, playerName);
        if (room.pendingPlayers.length < 2) {
          cancelAutoStart(gameId, io);
        }
        broadcastRoomState(gameId, io);
        io.emit("roomsList", getRoomList());
        return;
      }

      // In-game leave
      const game = getGame(gameId);
      if (game && playerName) {
        const player = getPlayerById(game, playerName);
        if (player) player.isConnected = false;
        setGame(gameId, game);
        io.to(gameId).emit("playerLeft", { playerId: playerName });
        emit(io, gameId, game);
      }
      io.emit("roomsList", getRoomList());
    });

    // ── disconnect ───────────────────────────────────────────────────────────
    socket.on("disconnect", () => {
      const playerName = getPlayerIdFromSocket(socket.id);
      if (!playerName) {
        unregisterSocket(socket.id);
        return;
      }

      const locationId = getLocationForPlayer(playerName);
      if (locationId) {
        const game = getGame(locationId);
        if (game) {
          // In an active game
          const player = game.players.find((p) => p.id === playerName);
          if (player) {
            player.isConnected = false;
            setGame(locationId, game);
            io.to(locationId).emit("playerLeft", { playerId: playerName });
            emit(io, locationId, game);
          }
        } else {
          // In a waiting room
          removePlayerFromRoom(locationId, playerName);
          const room = getRoom(locationId);
          if ((room?.pendingPlayers.length ?? 0) < 2) {
            cancelAutoStart(locationId, io);
          }
          broadcastRoomState(locationId, io);
          io.emit("roomsList", getRoomList());
        }
      }

      unregisterSocket(socket.id);
    });
  });
}
