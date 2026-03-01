import { create } from 'zustand';
import type { GameState, Player, BoardSpace, Card } from '../types';
import { getSocket, connectSocket } from '../socket/socketClient';

interface LobbyPlayer {
  id: string;
  name: string;
  token: string;
}

interface GameStore {
  // State
  gameState: GameState | null;
  myPlayerId: string | null;
  connected: boolean;
  lobbyPlayers: LobbyPlayer[];
  lobbyHostId: string | null;
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

  // Socket initializer
  initSocket: () => void;
}

// Animate a player token from one board position to another, stepping clockwise.
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

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: null,
  myPlayerId: null,
  connected: false,
  lobbyPlayers: [],
  lobbyHostId: null,
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

  initSocket: () => {
    const socket = getSocket();

    socket.on('connect', () => {
      set({ connected: true, myPlayerId: socket.id ?? null });
    });

    socket.on('disconnect', () => {
      set({ connected: false });
    });

    // Full state syncs — preserve display positions; start animations for moved players
    socket.on('gameState', (state: GameState) => {
      const { playerDisplayPositions, animatingPlayerIds } = get();

      // Capture which players moved (compare current display → new actual)
      const toAnimate: Array<{ id: string; from: number; to: number }> = [];
      const newDisplayPositions: Record<string, number> = {};

      for (const player of state.players) {
        const displayed = playerDisplayPositions[player.id];
        if (displayed === undefined) {
          // First time: place at actual position
          newDisplayPositions[player.id] = player.position;
        } else if (
          displayed !== player.position &&
          !animatingPlayerIds.includes(player.id)
        ) {
          // Player moved and not already animating — queue animation
          toAnimate.push({ id: player.id, from: displayed, to: player.position });
          // Keep the current displayed position; animation will advance it
          newDisplayPositions[player.id] = displayed;
        } else {
          // Either not moved or already animating — preserve displayed position
          newDisplayPositions[player.id] = displayed;
        }
      }

      set({ gameState: state, playerDisplayPositions: newDisplayPositions });

      // Start step-by-step animations
      for (const { id, from, to } of toAnimate) {
        animatePlayerMove(id, from, to, set);
      }
    });

    socket.on('gameStarted', (state: GameState) => {
      // Initialize display positions for all players at their starting positions
      const displayPositions: Record<string, number> = {};
      for (const p of state.players) displayPositions[p.id] = p.position;
      set({ gameState: state, lobbyPlayers: [], lobbyHostId: null, playerDisplayPositions: displayPositions, animatingPlayerIds: [] });
    });

    // Pre-game lobby — server sends full pending player list on each join
    socket.on('roomState', ({ players, hostId }: { players: LobbyPlayer[]; hostId: string; gameId: string }) => {
      set({ lobbyPlayers: players, lobbyHostId: hostId });
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
    });

    connectSocket();
  },
}));
