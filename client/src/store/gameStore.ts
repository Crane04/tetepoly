import { create } from 'zustand';
import type { GameState, Player, BoardSpace, Card, RoomInfo } from '../types';
import { getSocket, connectSocket } from '../socket/socketClient';

// ─── Name persistence (convenience only, not for identity) ───────────────────

export function getSavedName(): string {
  return localStorage.getItem('monopoly_player_name') ?? '';
}

export function saveName(name: string): void {
  localStorage.setItem('monopoly_player_name', name);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface LobbyPlayer {
  name: string;
  token: string;
}

interface GameStore {
  // State
  gameState: GameState | null;
  myPlayerId: string | null;          // player's name (= player.id in game)
  connected: boolean;
  lobbyPlayers: LobbyPlayer[];
  currentGameId: string | null;       // roomId or gameCode
  countdownEndsAt: number | null;     // ms timestamp for waiting-room countdown
  availableRooms: RoomInfo[];
  pendingPropertyLanded: { playerId: string; position: number; space: BoardSpace } | null;
  lastRentPaid: { fromId: string; toId: string; amount: number; position: number } | null;
  lastCardDrawn: { playerId: string; deck: 'chance' | 'community_chest'; card: Card } | null;
  playerDisplayPositions: Record<string, number>;
  animatingPlayerIds: string[];

  // Actions
  setGameState: (state: GameState) => void;
  updatePlayer: (player: Player) => void;
  setConnected: (connected: boolean) => void;
  setMyPlayerId: (id: string) => void;
  clearPendingProperty: () => void;
  clearRentPaid: () => void;
  clearCardDrawn: () => void;
  leaveRoom: () => void;

  // Socket initializer
  initSocket: () => void;
}

// ─── Token animation ──────────────────────────────────────────────────────────

function animatePlayerMove(
  playerId: string,
  from: number,
  to: number,
  set: (fn: (s: GameStore) => Partial<GameStore>) => void,
) {
  if (from === to) return;
  const steps: number[] = [];
  let pos = from;
  for (let i = 0; i < 40; i++) {
    pos = (pos + 1) % 40;
    steps.push(pos);
    if (pos === to) break;
  }

  set((s) => ({ animatingPlayerIds: [...new Set([...s.animatingPlayerIds, playerId])] }));

  steps.forEach((stepPos, i) => {
    setTimeout(() => {
      set((s) => ({
        playerDisplayPositions: { ...s.playerDisplayPositions, [playerId]: stepPos },
        animatingPlayerIds:
          i === steps.length - 1
            ? s.animatingPlayerIds.filter((id) => id !== playerId)
            : s.animatingPlayerIds,
      }));
    }, (i + 1) * 200);
  });
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  myPlayerId: null,
  connected: false,
  lobbyPlayers: [],
  currentGameId: null,
  countdownEndsAt: null,
  availableRooms: [],
  pendingPropertyLanded: null,
  lastRentPaid: null,
  lastCardDrawn: null,
  playerDisplayPositions: {},
  animatingPlayerIds: [],

  setGameState: (gameState) => set({ gameState }),

  updatePlayer: (updatedPlayer) =>
    set((s) => {
      if (!s.gameState) return s;
      return {
        gameState: {
          ...s.gameState,
          players: s.gameState.players.map((p) =>
            p.id === updatedPlayer.id ? updatedPlayer : p,
          ),
        },
      };
    }),

  setConnected: (connected) => set({ connected }),
  setMyPlayerId: (id) => set({ myPlayerId: id }),
  clearPendingProperty: () => set({ pendingPropertyLanded: null }),
  clearRentPaid: () => set({ lastRentPaid: null }),
  clearCardDrawn: () => set({ lastCardDrawn: null }),

  leaveRoom: () => {
    const { currentGameId } = get();
    if (currentGameId) {
      getSocket().emit('leaveGame', { gameId: currentGameId });
    }
    set({ currentGameId: null, lobbyPlayers: [], countdownEndsAt: null, gameState: null, myPlayerId: null });
  },

  initSocket: () => {
    const socket = getSocket();

    socket.on('connect', () => {
      set({ connected: true });
      socket.emit('listRooms');
    });

    socket.on('disconnect', () => {
      set({ connected: false });
    });

    socket.on('roomsList', (rooms: RoomInfo[]) => {
      set({ availableRooms: rooms });
    });

    // Full state sync (in-game or reconnect)
    socket.on('gameState', (state: GameState) => {
      const { playerDisplayPositions, animatingPlayerIds } = get();
      const toAnimate: Array<{ id: string; from: number; to: number }> = [];
      const newDisplayPositions: Record<string, number> = {};

      for (const player of state.players) {
        const displayed = playerDisplayPositions[player.id];
        if (displayed === undefined) {
          newDisplayPositions[player.id] = player.position;
        } else if (displayed !== player.position && !animatingPlayerIds.includes(player.id)) {
          toAnimate.push({ id: player.id, from: displayed, to: player.position });
          newDisplayPositions[player.id] = displayed;
        } else {
          newDisplayPositions[player.id] = displayed;
        }
      }

      set({ gameState: state, playerDisplayPositions: newDisplayPositions, currentGameId: state.gameId });

      for (const { id, from, to } of toAnimate) {
        animatePlayerMove(id, from, to, set);
      }
    });

    socket.on('gameStarted', (state: GameState) => {
      const displayPositions: Record<string, number> = {};
      for (const p of state.players) displayPositions[p.id] = p.position;
      set({
        gameState: state,
        currentGameId: state.gameId,
        lobbyPlayers: [],
        countdownEndsAt: null,
        playerDisplayPositions: displayPositions,
        animatingPlayerIds: [],
      });
    });

    // Pre-game waiting room state
    socket.on('roomState', ({ players, gameId, countdownEndsAt }: { players: LobbyPlayer[]; gameId: string; countdownEndsAt: number | null }) => {
      set({ lobbyPlayers: players, currentGameId: gameId, countdownEndsAt: countdownEndsAt ?? null });
    });

    socket.on('playerLeft', ({ playerId }: { playerId: string }) => {
      set((s) => {
        if (!s.gameState) return s;
        return {
          gameState: {
            ...s.gameState,
            players: s.gameState.players.map((p) =>
              p.id === playerId ? { ...p, isConnected: false } : p,
            ),
          },
        };
      });
    });

    socket.on('propertyLanded', (data: { playerId: string; position: number; space: BoardSpace }) => {
      set({ pendingPropertyLanded: data });
    });

    socket.on('propertyBought', () => {
      set({ pendingPropertyLanded: null });
    });

    socket.on('auctionStarted', () => {
      set({ pendingPropertyLanded: null });
    });

    socket.on('rentPaid', (data: { fromId: string; toId: string; amount: number; position: number }) => {
      set({ lastRentPaid: data });
    });

    socket.on('cardDrawn', (data: { playerId: string; deck: 'chance' | 'community_chest'; card: Card }) => {
      set({ lastCardDrawn: data });
    });

    socket.on('error', ({ message }: { message: string }) => {
      console.error('[Server error]', message);
      if (message.includes('not found') || message.includes('full')) {
        set({ currentGameId: null, lobbyPlayers: [], countdownEndsAt: null });
      }
    });

    connectSocket();
  },
}));
