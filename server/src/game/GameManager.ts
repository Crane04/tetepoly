import { GameState } from '../types';
import { initGameState } from './GameState';

// ─── Room Config ──────────────────────────────────────────────────────────────

export interface RoomConfig {
  id: string;
  name: string;
  startingMoney: number;
  capacity: number;
}

export const ROOM_CONFIGS: RoomConfig[] = [
  { id: 'room-1', name: 'Starter Stakes', startingMoney: 1000, capacity: 4 },
  { id: 'room-2', name: 'Classic',        startingMoney: 1500, capacity: 6 },
  { id: 'room-3', name: 'High Roller',    startingMoney: 3000, capacity: 4 },
  { id: 'room-4', name: 'Open Table',     startingMoney: 1500, capacity: 8 },
];

const TOKENS = ['🎩', '🚗', '🐶', '⛵', '👢', '🎭', '🛒', '🥾'];

function generateGameCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

// ─── Internal Types ───────────────────────────────────────────────────────────

interface PendingPlayer {
  name: string;     // used as player ID
  token: string;
  socketId: string;
}

interface Room {
  config: RoomConfig;
  pendingPlayers: PendingPlayer[];
  activeGameCode: string | null;
}

// ─── In-Memory State ──────────────────────────────────────────────────────────

// roomId → Room
const rooms = new Map<string, Room>();

// gameCode → GameState
const games = new Map<string, GameState>();

// socketId → playerName
const socketToPlayer = new Map<string, string>();
// playerName → socketId
const playerToSocket = new Map<string, string>();
// playerName → gameCode or roomId (wherever they currently are)
const playerToLocation = new Map<string, string>();

// roomId → countdown end timestamp (ms)
const roomCountdownEndsAt = new Map<string, number>();

// Initialize pre-defined rooms
for (const config of ROOM_CONFIGS) {
  rooms.set(config.id, { config, pendingPlayers: [], activeGameCode: null });
}

// ─── Countdown State ──────────────────────────────────────────────────────────

export function setRoomCountdown(roomId: string, endsAt: number): void {
  roomCountdownEndsAt.set(roomId, endsAt);
}

export function clearRoomCountdown(roomId: string): void {
  roomCountdownEndsAt.delete(roomId);
}

export function getRoomCountdownEndsAt(roomId: string): number | null {
  return roomCountdownEndsAt.get(roomId) ?? null;
}

// ─── Socket / Player Session ──────────────────────────────────────────────────

export function registerSocket(socketId: string, playerName: string): void {
  const oldSocket = playerToSocket.get(playerName);
  if (oldSocket && oldSocket !== socketId) {
    socketToPlayer.delete(oldSocket);
  }
  socketToPlayer.set(socketId, playerName);
  playerToSocket.set(playerName, socketId);
}

export function unregisterSocket(socketId: string): void {
  const playerName = socketToPlayer.get(socketId);
  if (playerName) {
    socketToPlayer.delete(socketId);
    if (playerToSocket.get(playerName) === socketId) {
      playerToSocket.delete(playerName);
    }
  }
}

export function getPlayerIdFromSocket(socketId: string): string | undefined {
  return socketToPlayer.get(socketId);
}

export function getLocationForPlayer(playerName: string): string | undefined {
  return playerToLocation.get(playerName);
}

// ─── Public Room Info ─────────────────────────────────────────────────────────

export interface RoomInfo {
  id: string;
  name: string;
  startingMoney: number;
  capacity: number;
  playerCount: number;
  waitingCount: number;
  status: 'waiting' | 'started' | 'ended';
  countdownEndsAt: number | null;
}

export function getRoomList(): RoomInfo[] {
  return ROOM_CONFIGS.map((config) => {
    const room = rooms.get(config.id)!;
    const activeGame = room.activeGameCode ? games.get(room.activeGameCode) : null;
    const status = activeGame
      ? (activeGame.status as 'waiting' | 'started' | 'ended')
      : 'waiting';
    const playerCount = activeGame
      ? activeGame.players.filter((p) => !p.isBankrupt).length
      : 0;
    return {
      id: config.id,
      name: config.name,
      startingMoney: config.startingMoney,
      capacity: config.capacity,
      playerCount,
      waitingCount: room.pendingPlayers.length,
      status,
      countdownEndsAt: roomCountdownEndsAt.get(config.id) ?? null,
    };
  });
}

// ─── Room Access ──────────────────────────────────────────────────────────────

export function getRoom(roomId: string): Room | undefined {
  return rooms.get(roomId);
}

export function getRoomPendingPlayers(roomId: string): PendingPlayer[] {
  return rooms.get(roomId)?.pendingPlayers ?? [];
}

export function getRoomPendingSocketIds(roomId: string): string[] {
  return rooms.get(roomId)?.pendingPlayers.map((p) => p.socketId) ?? [];
}

function pickToken(usedTokens: Set<string>): string {
  const available = TOKENS.filter((t) => !usedTokens.has(t));
  if (available.length === 0) return TOKENS[0];
  return available[Math.floor(Math.random() * available.length)];
}

export function addPlayerToRoom(
  roomId: string,
  player: { name: string; socketId: string },
): string | null {
  const room = rooms.get(roomId);
  if (!room) return 'Room not found.';

  // If already in queue, just update socket ID (reconnect to waiting room)
  const existing = room.pendingPlayers.find((p) => p.name === player.name);
  if (existing) {
    existing.socketId = player.socketId;
    registerSocket(player.socketId, player.name);
    return null;
  }

  if (room.pendingPlayers.length >= room.config.capacity) return 'Room is full.';

  // Enforce unique names within the queue
  if (room.pendingPlayers.find((p) => p.name.toLowerCase() === player.name.toLowerCase())) {
    return 'Name already taken in this room.';
  }

  const usedTokens = new Set(room.pendingPlayers.map((p) => p.token));
  const token = pickToken(usedTokens);
  room.pendingPlayers.push({ name: player.name, token, socketId: player.socketId });
  registerSocket(player.socketId, player.name);
  playerToLocation.set(player.name, roomId);
  return null;
}

export function removePlayerFromRoom(roomId: string, playerName: string): void {
  const room = rooms.get(roomId);
  if (!room) return;
  room.pendingPlayers = room.pendingPlayers.filter((p) => p.name !== playerName);
  if (playerToLocation.get(playerName) === roomId) {
    playerToLocation.delete(playerName);
  }
}

export function startGame(roomId: string): { game: GameState; socketIds: string[] } | string {
  const room = rooms.get(roomId);
  if (!room) return 'Room not found.';
  if (room.pendingPlayers.length < 2) return 'Need at least 2 players.';

  const gameCode = generateGameCode();
  const game = initGameState(
    room.pendingPlayers.map((p) => ({ id: p.name, name: p.name, token: p.token })),
    room.config.startingMoney,
  );
  game.gameId = gameCode;

  const socketIds = room.pendingPlayers.map((p) => p.socketId);

  for (const p of room.pendingPlayers) {
    playerToLocation.set(p.name, gameCode);
  }

  games.set(gameCode, game);
  room.activeGameCode = gameCode;
  room.pendingPlayers = [];

  return { game, socketIds };
}

export function getGame(gameId: string): GameState | null {
  return games.get(gameId) ?? null;
}

export function setGame(gameId: string, game: GameState): void {
  games.set(gameId, game);
}

export function resetRoom(roomId: string): void {
  const room = rooms.get(roomId);
  if (!room) return;
  if (room.activeGameCode) {
    const game = games.get(room.activeGameCode);
    if (game) {
      for (const p of game.players) playerToLocation.delete(p.id);
    }
    games.delete(room.activeGameCode);
    room.activeGameCode = null;
  }
  for (const p of room.pendingPlayers) playerToLocation.delete(p.name);
  room.pendingPlayers = [];
  clearRoomCountdown(roomId);
}
