"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOM_CONFIGS = void 0;
exports.registerSocket = registerSocket;
exports.unregisterSocket = unregisterSocket;
exports.getPlayerIdFromSocket = getPlayerIdFromSocket;
exports.getGameIdForPlayer = getGameIdForPlayer;
exports.getRoomList = getRoomList;
exports.getRoom = getRoom;
exports.addPlayerToRoom = addPlayerToRoom;
exports.startGame = startGame;
exports.getGame = getGame;
exports.setGame = setGame;
exports.resetRoom = resetRoom;
const GameState_1 = require("./GameState");
exports.ROOM_CONFIGS = [
    { id: 'room-1', name: 'Starter Stakes', startingMoney: 1000, capacity: 4 },
    { id: 'room-2', name: 'Classic', startingMoney: 1500, capacity: 6 },
    { id: 'room-3', name: 'High Roller', startingMoney: 3000, capacity: 4 },
    { id: 'room-4', name: 'Open Table', startingMoney: 1500, capacity: 8 },
];
const TOKENS = ['🎩', '🚗', '🐶', '⛵', '👢', '🎭', '🛒', '🥾'];
// ─── In-Memory State ──────────────────────────────────────────────────────────
const rooms = new Map();
// socketId → persistentId
const socketToPlayer = new Map();
// persistentId → socketId
const playerToSocket = new Map();
// persistentId → gameId
const playerToGame = new Map();
// Initialize pre-defined rooms
for (const config of exports.ROOM_CONFIGS) {
    rooms.set(config.id, { config, hostId: null, pendingPlayers: [], game: null });
}
// ─── Socket / Player Session ──────────────────────────────────────────────────
function registerSocket(socketId, persistentId) {
    const oldSocket = playerToSocket.get(persistentId);
    if (oldSocket && oldSocket !== socketId) {
        socketToPlayer.delete(oldSocket);
    }
    socketToPlayer.set(socketId, persistentId);
    playerToSocket.set(persistentId, socketId);
}
function unregisterSocket(socketId) {
    const persistentId = socketToPlayer.get(socketId);
    if (persistentId) {
        socketToPlayer.delete(socketId);
        if (playerToSocket.get(persistentId) === socketId) {
            playerToSocket.delete(persistentId);
        }
    }
}
function getPlayerIdFromSocket(socketId) {
    return socketToPlayer.get(socketId);
}
function getGameIdForPlayer(persistentId) {
    return playerToGame.get(persistentId);
}
function getRoomList() {
    return exports.ROOM_CONFIGS.map((config) => {
        const room = rooms.get(config.id);
        const gameStatus = (room.game?.status ?? 'waiting');
        const playerCount = room.game
            ? room.game.players.filter((p) => !p.isBankrupt).length
            : room.pendingPlayers.length;
        return {
            id: config.id,
            name: config.name,
            startingMoney: config.startingMoney,
            capacity: config.capacity,
            playerCount,
            status: gameStatus,
        };
    });
}
// ─── Room Access ──────────────────────────────────────────────────────────────
function getRoom(gameId) {
    return rooms.get(gameId);
}
function pickToken(gameId) {
    const room = rooms.get(gameId);
    const usedTokens = new Set([
        ...room.pendingPlayers.map((p) => p.token),
        ...(room.game?.players.map((p) => p.token) ?? []),
    ]);
    const available = TOKENS.filter((t) => !usedTokens.has(t));
    if (available.length === 0)
        return TOKENS[0];
    return available[Math.floor(Math.random() * available.length)];
}
function addPlayerToRoom(gameId, player) {
    const room = rooms.get(gameId);
    if (!room)
        return 'Room not found.';
    if (room.game?.status === 'started')
        return 'Game already in progress.';
    if (room.pendingPlayers.length >= room.config.capacity)
        return 'Room is full.';
    if (room.pendingPlayers.find((p) => p.id === player.id))
        return null; // already in
    const token = pickToken(gameId);
    room.pendingPlayers.push({ ...player, token });
    if (!room.hostId)
        room.hostId = player.id;
    playerToGame.set(player.id, gameId);
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
    if (room.game?.status === 'started')
        return 'Game already started.';
    const game = (0, GameState_1.initGameState)(room.pendingPlayers, room.config.startingMoney);
    game.gameId = gameId;
    room.game = game;
    // Register all players to this game
    for (const p of room.pendingPlayers) {
        playerToGame.set(p.id, gameId);
    }
    room.pendingPlayers = [];
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
function resetRoom(gameId) {
    const room = rooms.get(gameId);
    if (!room)
        return;
    if (room.game) {
        for (const p of room.game.players)
            playerToGame.delete(p.id);
    }
    for (const p of room.pendingPlayers)
        playerToGame.delete(p.id);
    room.game = null;
    room.hostId = null;
    room.pendingPlayers = [];
}
