import { GameState } from '../types';
import { initGameState } from './GameState';

interface PendingPlayer {
  id: string;
  name: string;
  token: string;
}

interface Room {
  hostId: string;
  pendingPlayers: PendingPlayer[];
  game: GameState | null;
}

const rooms = new Map<string, Room>();

export function getOrCreateRoom(gameId: string, hostId: string): Room {
  if (!rooms.has(gameId)) {
    rooms.set(gameId, { hostId, pendingPlayers: [], game: null });
  }
  return rooms.get(gameId)!;
}

export function getRoom(gameId: string): Room | undefined {
  return rooms.get(gameId);
}

export function addPlayerToRoom(gameId: string, player: PendingPlayer): string | null {
  const room = rooms.get(gameId);
  if (!room) return 'Room not found.';
  if (room.game) return 'Game already started.';
  if (room.pendingPlayers.length >= 8) return 'Room is full.';
  if (room.pendingPlayers.find((p) => p.id === player.id)) return null; // already in

  room.pendingPlayers.push(player);
  return null;
}

export function startGame(gameId: string, requesterId: string): GameState | string {
  const room = rooms.get(gameId);
  if (!room) return 'Room not found.';
  if (room.hostId !== requesterId) return 'Only the host can start the game.';
  if (room.pendingPlayers.length < 2) return 'Need at least 2 players.';
  if (room.game) return 'Game already started.';

  const game = initGameState(room.pendingPlayers);
  game.gameId = gameId;
  room.game = game;
  return game;
}

export function getGame(gameId: string): GameState | null {
  return rooms.get(gameId)?.game ?? null;
}

export function setGame(gameId: string, game: GameState): void {
  const room = rooms.get(gameId);
  if (room) room.game = game;
}

export function removeRoom(gameId: string): void {
  rooms.delete(gameId);
}
