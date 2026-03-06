"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = registerSocketHandlers;
const GameManager_1 = require("../game/GameManager");
const GameState_1 = require("../game/GameState");
const Dice_1 = require("../game/Dice");
// ─── Helpers ──────────────────────────────────────────────────────────────────
function emit(io, gameId, state) {
    io.to(gameId).emit('gameState', state);
}
function err(socket, message) {
    socket.emit('error', { message });
}
function guardAuth(socket) {
    const playerId = (0, GameManager_1.getPlayerIdFromSocket)(socket.id);
    if (!playerId) {
        err(socket, 'Not authenticated.');
        return null;
    }
    return playerId;
}
function guardGame(socket, gameId) {
    const game = (0, GameManager_1.getGame)(gameId);
    if (!game) {
        err(socket, 'Game not found.');
        return null;
    }
    return game;
}
function guardTurn(socket, game, playerId) {
    const cp = (0, GameState_1.currentPlayer)(game);
    if (cp.id !== playerId) {
        err(socket, 'Not your turn.');
        return false;
    }
    return true;
}
function guardStarted(socket, game) {
    if (game.status !== 'started') {
        err(socket, 'Game is not in progress.');
        return false;
    }
    return true;
}
// After rolling, resolve the space the player is on
function resolveSpace(io, socket, game, playerId, diceTotal, doubleRent = false, utilityMultiplier) {
    const player = (0, GameState_1.getPlayerById)(game, playerId);
    const position = player.position;
    const space = (0, GameState_1.getSpace)(game, position);
    io.to(game.gameId).emit('playerMoved', {
        playerId,
        from: player.position,
        to: position,
        passedGo: false,
    });
    switch (space.type) {
        case 'go':
            break;
        case 'go_to_jail':
            (0, GameState_1.sendToJail)(game, playerId);
            io.to(game.gameId).emit('jailEntered', { playerId });
            break;
        case 'tax':
            player.money -= space.taxAmount ?? 0;
            io.to(game.gameId).emit('taxPaid', { playerId, amount: space.taxAmount ?? 0 });
            break;
        case 'chance':
        case 'community_chest': {
            const card = (0, GameState_1.drawCard)(game, space.type);
            const overrides = (0, GameState_1.applyCard)(game, playerId, card, diceTotal);
            io.to(game.gameId).emit('cardDrawn', { playerId, deck: space.type, card });
            if (card.action === 'advance_to' || card.action === 'advance_to_nearest') {
                if (card.action === 'advance_to' && player.position !== position) {
                    resolveSpace(io, socket, game, playerId, diceTotal, overrides.rentDoubled ?? false, overrides.utilityMultiplier);
                }
                else if (card.action === 'advance_to_nearest') {
                    resolveSpace(io, socket, game, playerId, diceTotal, overrides.rentDoubled ?? false, overrides.utilityMultiplier);
                }
            }
            break;
        }
        case 'property':
        case 'railroad':
        case 'utility': {
            if (!space.ownerId) {
                io.to(game.gameId).emit('propertyLanded', { playerId, position, space });
            }
            else if (space.ownerId !== playerId) {
                const owner = (0, GameState_1.getPlayerById)(game, space.ownerId);
                if (owner && !owner.isBankrupt) {
                    const amount = (0, GameState_1.payRent)(game, playerId, position, diceTotal, doubleRent, utilityMultiplier);
                    if (amount > 0) {
                        io.to(game.gameId).emit('rentPaid', { fromId: playerId, toId: space.ownerId, amount, position });
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
// ─── Register all socket events ───────────────────────────────────────────────
function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
        // ── listRooms ────────────────────────────────────────────────────────────
        socket.on('listRooms', () => {
            socket.emit('roomsList', (0, GameManager_1.getRoomList)());
        });
        // ── joinGame ─────────────────────────────────────────────────────────────
        socket.on('joinGame', ({ gameId, playerName, persistentId }) => {
            // Register socket ↔ persistentId mapping
            (0, GameManager_1.registerSocket)(socket.id, persistentId);
            const room = (0, GameManager_1.getRoom)(gameId);
            if (!room)
                return err(socket, 'Room not found.');
            // If a game is active, check if this player is in it (reconnect)
            const game = (0, GameManager_1.getGame)(gameId);
            if (game) {
                const player = game.players.find((p) => p.id === persistentId);
                if (player) {
                    socket.join(gameId);
                    player.isConnected = true;
                    (0, GameManager_1.setGame)(gameId, game);
                    socket.emit('gameState', game);
                    return;
                }
                if (game.status === 'started') {
                    return err(socket, 'Game already in progress.');
                }
            }
            // Pre-game: add player to pending list
            const joinErr = (0, GameManager_1.addPlayerToRoom)(gameId, { id: persistentId, name: playerName });
            if (joinErr)
                return err(socket, joinErr);
            socket.join(gameId);
            const updatedRoom = (0, GameManager_1.getRoom)(gameId);
            io.to(gameId).emit('roomState', {
                gameId,
                hostId: updatedRoom.hostId,
                players: updatedRoom.pendingPlayers,
            });
            // Also send current room list to everyone so counts stay fresh
            io.emit('roomsList', (0, GameManager_1.getRoomList)());
        });
        // ── startGame ────────────────────────────────────────────────────────────
        socket.on('startGame', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const result = (0, GameManager_1.startGame)(gameId, playerId);
            if (typeof result === 'string')
                return err(socket, result);
            io.to(gameId).emit('gameStarted', result);
            emit(io, gameId, result);
            io.emit('roomsList', (0, GameManager_1.getRoomList)());
        });
        // ── rollDice ─────────────────────────────────────────────────────────────
        socket.on('rollDice', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const player = (0, GameState_1.currentPlayer)(game);
            // Jail handling
            if (player.inJail) {
                const dice = (0, Dice_1.rollDice)();
                const total = dice[0] + dice[1];
                game.diceRoll = dice;
                io.to(gameId).emit('diceRolled', { playerId, dice, total, isDoubles: (0, Dice_1.isDoubles)(dice) });
                if ((0, Dice_1.isDoubles)(dice)) {
                    (0, GameState_1.exitJail)(game, playerId, 'roll');
                    io.to(gameId).emit('jailExited', { playerId, method: 'roll' });
                    (0, GameState_1.movePlayer)(game, playerId, total);
                    resolveSpace(io, socket, game, playerId, total);
                }
                else {
                    player.jailTurnsRemaining -= 1;
                    if (player.jailTurnsRemaining <= 0) {
                        if (player.money >= 50) {
                            player.money -= 50;
                            (0, GameState_1.exitJail)(game, playerId, 'fine');
                            io.to(gameId).emit('jailExited', { playerId, method: 'fine' });
                        }
                        (0, GameState_1.movePlayer)(game, playerId, total);
                        resolveSpace(io, socket, game, playerId, total);
                    }
                }
                (0, GameManager_1.setGame)(gameId, game);
                emit(io, gameId, game);
                return;
            }
            // Normal roll
            const dice = (0, Dice_1.rollDice)();
            const total = dice[0] + dice[1];
            const doubles = (0, Dice_1.isDoubles)(dice);
            game.diceRoll = dice;
            game.lastDiceRollWasDoubles = doubles;
            if (doubles) {
                game.doublesCount += 1;
                if (game.doublesCount >= 3) {
                    (0, GameState_1.sendToJail)(game, playerId);
                    io.to(gameId).emit('diceRolled', { playerId, dice, total, isDoubles: true });
                    io.to(gameId).emit('jailEntered', { playerId });
                    (0, GameManager_1.setGame)(gameId, game);
                    emit(io, gameId, game);
                    return;
                }
            }
            else {
                game.doublesCount = 0;
            }
            io.to(gameId).emit('diceRolled', { playerId, dice, total, isDoubles: doubles });
            (0, GameState_1.movePlayer)(game, playerId, total);
            resolveSpace(io, socket, game, playerId, total);
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── buyProperty ──────────────────────────────────────────────────────────
        socket.on('buyProperty', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const ok = (0, GameState_1.buyProperty)(game, playerId, position);
            if (!ok)
                return err(socket, 'Cannot buy this property.');
            io.to(gameId).emit('propertyBought', { playerId, position });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── declineBuy ───────────────────────────────────────────────────────────
        socket.on('declineBuy', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            (0, GameState_1.startAuction)(game, position);
            io.to(gameId).emit('auctionStarted', { auction: game.auction });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── placeBid ─────────────────────────────────────────────────────────────
        socket.on('placeBid', ({ gameId, amount }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            const bidErr = (0, GameState_1.placeBid)(game, playerId, amount);
            if (bidErr)
                return err(socket, bidErr);
            io.to(gameId).emit('auctionBid', { auction: game.auction });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── withdrawFromAuction ──────────────────────────────────────────────────
        socket.on('withdrawFromAuction', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            (0, GameState_1.withdrawFromAuction)(game, playerId);
            const remaining = game.auction?.activeBidders ?? [];
            if (remaining.length <= 1) {
                const result = (0, GameState_1.endAuction)(game);
                io.to(gameId).emit('auctionEnded', result);
            }
            else {
                io.to(gameId).emit('auctionBid', { auction: game.auction });
            }
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── buildHouse ───────────────────────────────────────────────────────────
        socket.on('buildHouse', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const buildErr = (0, GameState_1.buildHouse)(game, playerId, position);
            if (buildErr)
                return err(socket, buildErr);
            io.to(gameId).emit('houseBuilt', { playerId, position });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── buildHotel ───────────────────────────────────────────────────────────
        socket.on('buildHotel', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const buildErr = (0, GameState_1.buildHotel)(game, playerId, position);
            if (buildErr)
                return err(socket, buildErr);
            io.to(gameId).emit('hotelBuilt', { playerId, position });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── sellHouse ────────────────────────────────────────────────────────────
        socket.on('sellHouse', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const sellErr = (0, GameState_1.sellHouse)(game, playerId, position);
            if (sellErr)
                return err(socket, sellErr);
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── sellHotel ────────────────────────────────────────────────────────────
        socket.on('sellHotel', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const sellErr = (0, GameState_1.sellHotel)(game, playerId, position);
            if (sellErr)
                return err(socket, sellErr);
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── mortgageProperty ─────────────────────────────────────────────────────
        socket.on('mortgageProperty', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const mortErr = (0, GameState_1.mortgageProperty)(game, playerId, position);
            if (mortErr)
                return err(socket, mortErr);
            io.to(gameId).emit('propertyMortgaged', { playerId, position });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── unmortgageProperty ───────────────────────────────────────────────────
        socket.on('unmortgageProperty', ({ gameId, position }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const unErr = (0, GameState_1.unmortgageProperty)(game, playerId, position);
            if (unErr)
                return err(socket, unErr);
            io.to(gameId).emit('propertyUnmortgaged', { playerId, position });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── proposeTrade ─────────────────────────────────────────────────────────
        socket.on('proposeTrade', ({ gameId, trade }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            const tradeErr = (0, GameState_1.proposeTrade)(game, { ...trade, fromPlayerId: playerId });
            if (tradeErr)
                return err(socket, tradeErr);
            io.to(gameId).emit('tradeProposed', { trade: game.activeTrade });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── respondTrade ─────────────────────────────────────────────────────────
        socket.on('respondTrade', ({ gameId, accept }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            const trade = game.activeTrade;
            if (!trade)
                return err(socket, 'No active trade.');
            if (trade.toPlayerId !== playerId)
                return err(socket, 'Trade not addressed to you.');
            if (accept) {
                const execErr = (0, GameState_1.executeTrade)(game);
                if (execErr)
                    return err(socket, execErr);
                io.to(gameId).emit('tradeCompleted', { trade });
            }
            else {
                trade.status = 'declined';
                game.activeTrade = null;
                io.to(gameId).emit('tradeDeclined', { trade });
            }
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── payJailFine ──────────────────────────────────────────────────────────
        socket.on('payJailFine', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const jailErr = (0, GameState_1.exitJail)(game, playerId, 'fine');
            if (jailErr)
                return err(socket, jailErr);
            io.to(gameId).emit('jailExited', { playerId, method: 'fine' });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── useJailCard ──────────────────────────────────────────────────────────
        socket.on('useJailCard', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            const jailErr = (0, GameState_1.exitJail)(game, playerId, 'card');
            if (jailErr)
                return err(socket, jailErr);
            io.to(gameId).emit('jailExited', { playerId, method: 'card' });
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── declareBankruptcy ────────────────────────────────────────────────────
        socket.on('declareBankruptcy', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            (0, GameState_1.declareBankruptcy)(game, playerId, null);
            io.to(gameId).emit('playerBankrupt', { playerId, creditorId: null });
            if (game.status === 'ended' && game.winner) {
                const winner = (0, GameState_1.getPlayerById)(game, game.winner);
                io.to(gameId).emit('gameOver', { winnerId: game.winner, winnerName: winner.name });
                io.emit('roomsList', (0, GameManager_1.getRoomList)());
            }
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── endTurn ──────────────────────────────────────────────────────────────
        socket.on('endTurn', ({ gameId }) => {
            const playerId = guardAuth(socket);
            if (!playerId)
                return;
            const game = guardGame(socket, gameId);
            if (!game)
                return;
            if (!guardStarted(socket, game))
                return;
            if (!guardTurn(socket, game, playerId))
                return;
            if (game.lastDiceRollWasDoubles && !(0, GameState_1.currentPlayer)(game).inJail) {
                return err(socket, 'You rolled doubles — you must roll again.');
            }
            (0, GameState_1.advanceTurn)(game);
            (0, GameManager_1.setGame)(gameId, game);
            emit(io, gameId, game);
        });
        // ── leaveGame ────────────────────────────────────────────────────────────
        socket.on('leaveGame', ({ gameId }) => {
            const playerId = (0, GameManager_1.getPlayerIdFromSocket)(socket.id);
            socket.leave(gameId);
            const game = (0, GameManager_1.getGame)(gameId);
            if (game && playerId) {
                const player = (0, GameState_1.getPlayerById)(game, playerId);
                if (player)
                    player.isConnected = false;
                (0, GameManager_1.setGame)(gameId, game);
                io.to(gameId).emit('playerLeft', { playerId });
                emit(io, gameId, game);
            }
            io.emit('roomsList', (0, GameManager_1.getRoomList)());
        });
        // ── disconnect ───────────────────────────────────────────────────────────
        socket.on('disconnect', () => {
            const persistentId = (0, GameManager_1.getPlayerIdFromSocket)(socket.id);
            if (!persistentId) {
                (0, GameManager_1.unregisterSocket)(socket.id);
                return;
            }
            const gameId = (0, GameManager_1.getGameIdForPlayer)(persistentId);
            if (gameId) {
                const game = (0, GameManager_1.getGame)(gameId);
                if (game) {
                    const player = game.players.find((p) => p.id === persistentId);
                    if (player) {
                        player.isConnected = false;
                        (0, GameManager_1.setGame)(gameId, game);
                        io.to(gameId).emit('playerLeft', { playerId: persistentId });
                        emit(io, gameId, game);
                    }
                }
            }
            (0, GameManager_1.unregisterSocket)(socket.id);
        });
    });
}
