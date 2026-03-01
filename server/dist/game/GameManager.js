"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateRoom = getOrCreateRoom;
exports.getRoom = getRoom;
exports.addPlayerToRoom = addPlayerToRoom;
exports.startGame = startGame;
exports.getGame = getGame;
exports.setGame = setGame;
exports.removeRoom = removeRoom;
const GameState_1 = require("./GameState");
const rooms = new Map();
function getOrCreateRoom(gameId, hostId) {
    if (!rooms.has(gameId)) {
        rooms.set(gameId, { hostId, pendingPlayers: [], game: null });
    }
    return rooms.get(gameId);
}
function getRoom(gameId) {
    return rooms.get(gameId);
}
function addPlayerToRoom(gameId, player) {
    const room = rooms.get(gameId);
    if (!room)
        return 'Room not found.';
    if (room.game)
        return 'Game already started.';
    if (room.pendingPlayers.length >= 8)
        return 'Room is full.';
    if (room.pendingPlayers.find((p) => p.id === player.id))
        return null; // already in
    room.pendingPlayers.push(player);
    return null;
}
function startGame(gameId, requesterId) {
    const room = rooms.get(gameId);
    if (!room)
        return 'Room not found.';
    if (room.hostId !== requesterId)
        return 'Only the host can start the game.';
    if (room.pendingPlayers.length < 2)
        return 'Need at least 2 players.';
    if (room.game)
        return 'Game already started.';
    const game = (0, GameState_1.initGameState)(room.pendingPlayers);
    game.gameId = gameId;
    room.game = game;
    return game;
}
function getGame(gameId) {
    return rooms.get(gameId)?.game ?? null;
}
function setGame(gameId, game) {
    const room = rooms.get(gameId);
    if (room)
        room.game = game;
}
function removeRoom(gameId) {
    rooms.delete(gameId);
}
