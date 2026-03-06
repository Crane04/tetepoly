import { create } from "zustand";
import type { GameState, Player, BoardSpace, Card, RoomInfo } from "../types";
import { getSocket, connectSocket } from "../socket/socketClient";

// ─── Name persistence (convenience only, not for identity) ───────────────────

export function getSavedName(): string {
  return localStorage.getItem("monopoly_player_name") ?? "";
}

export function saveName(name: string): void {
  localStorage.setItem("monopoly_player_name", name);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface LobbyPlayer {
  name: string;
  token: string;
}

interface GameStore {
  // State
  gameState: GameState | null;
  myPlayerId: string | null; // player's name (= player.id in game)
  connected: boolean;
  lobbyPlayers: LobbyPlayer[];
  currentGameId: string | null; // roomId or gameCode
  countdownEndsAt: number | null; // ms timestamp for waiting-room countdown
  availableRooms: RoomInfo[];
  pendingPropertyLanded: {
    playerId: string;
    position: number;
    space: BoardSpace;
  } | null;
  queuedPropertyLanded: {
    playerId: string;
    position: number;
    space: BoardSpace;
  } | null;
  lastRentPaid: {
    fromId: string;
    toId: string;
    amount: number;
    position: number;
  } | null;
  lastCardDrawn: {
    playerId: string;
    deck: "chance" | "community_chest";
    card: Card;
  } | null;
  // Card shown immediately on landing (before movement, for advance_to cards)
  pendingCardDrawn: {
    playerId: string;
    deck: "chance" | "community_chest";
    card: Card;
    isMoving: boolean; // true if this card causes movement
  } | null;
  queuedCardDrawn: {
    playerId: string;
    deck: "chance" | "community_chest";
    card: Card;
  } | null;
  playerDisplayPositions: Record<string, number>;
  animatingPlayerIds: string[];
  // Timer for current player's turn — null while animating, set once animation done
  activeTurnTimerEndsAt: number | null;

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

  set((s) => ({
    animatingPlayerIds: [...new Set([...s.animatingPlayerIds, playerId])],
  }));

  steps.forEach((stepPos, i) => {
    setTimeout(
      () => {
        set((s) => {
          const isLast = i === steps.length - 1;
          const queued =
            isLast && s.queuedPropertyLanded?.playerId === playerId
              ? s.queuedPropertyLanded
              : null;
          // Flush the queued card at the very last animation step — even if the card
          // arrived after animation started (i.e. check live state, not a closure capture).
          const queuedCard =
            isLast && s.queuedCardDrawn?.playerId === playerId
              ? s.queuedCardDrawn
              : null;
          const remainingAnimators = isLast
            ? s.animatingPlayerIds.filter((id) => id !== playerId)
            : s.animatingPlayerIds;
          const noneAnimating = isLast && remainingAnimators.length === 0;
          return {
            playerDisplayPositions: {
              ...s.playerDisplayPositions,
              [playerId]: stepPos,
            },
            animatingPlayerIds: remainingAnimators,
            // Activate turn timer display once ALL animations are done
            ...(noneAnimating && s.gameState?.turnEndsAt
              ? { activeTurnTimerEndsAt: s.gameState.turnEndsAt }
              : {}),
            ...(queued
              ? { pendingPropertyLanded: queued, queuedPropertyLanded: null }
              : {}),
            ...(queuedCard
              ? { lastCardDrawn: queuedCard, queuedCardDrawn: null }
              : {}),
          };
        });
      },
      (i + 1) * 200,
    );
  });

  // Safety net: if the card arrives *after* the last setTimeout fires (e.g. slow network),
  // watch for it and flush once animation is confirmed done.
  const totalDuration = steps.length * 200 + 200;
  setTimeout(() => {
    set((s) => {
      if (
        s.queuedCardDrawn?.playerId === playerId &&
        !s.animatingPlayerIds.includes(playerId)
      ) {
        return { lastCardDrawn: s.queuedCardDrawn, queuedCardDrawn: null };
      }
      return s;
    });
  }, totalDuration);
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
  queuedPropertyLanded: null,
  lastRentPaid: null,
  lastCardDrawn: null,
  queuedCardDrawn: null,
  pendingCardDrawn: null,
  playerDisplayPositions: {},
  animatingPlayerIds: [],
  activeTurnTimerEndsAt: null,

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
  clearCardDrawn: () => set({ lastCardDrawn: null, pendingCardDrawn: null }),

  leaveRoom: () => {
    const { currentGameId } = get();
    if (currentGameId) {
      getSocket().emit("leaveGame", { gameId: currentGameId });
    }
    set({
      currentGameId: null,
      lobbyPlayers: [],
      countdownEndsAt: null,
      gameState: null,
      myPlayerId: null,
    });
  },

  initSocket: () => {
    const socket = getSocket();

    socket.on("connect", () => {
      set({ connected: true });
      socket.emit("listRooms");
    });

    socket.on("disconnect", () => {
      set({ connected: false });
    });

    socket.on("roomsList", (rooms: RoomInfo[]) => {
      set({ availableRooms: rooms });
    });

    // Full state sync (in-game or reconnect)
    socket.on("gameState", (state: GameState) => {
      const { playerDisplayPositions, animatingPlayerIds, queuedCardDrawn, pendingCardDrawn } =
        get();
      const toAnimate: Array<{ id: string; from: number; to: number }> = [];
      const newDisplayPositions: Record<string, number> = {};

      for (const player of state.players) {
        const displayed = playerDisplayPositions[player.id];
        if (displayed === undefined) {
          newDisplayPositions[player.id] = player.position;
        } else if (
          displayed !== player.position &&
          !animatingPlayerIds.includes(player.id)
        ) {
          toAnimate.push({
            id: player.id,
            from: displayed,
            to: player.position,
          });
          newDisplayPositions[player.id] = displayed;
        } else {
          newDisplayPositions[player.id] = displayed;
        }
      }

      // Pre-mark players that are ABOUT to animate as animating — synchronously,
      // before the setTimeout(0) fires animatePlayerMove. This prevents the
      // `propertyLanded` event (which can arrive on the next tick) from seeing
      // an empty animatingPlayerIds and flashing the modal too early.
      const pendingAnimatorIds =
        toAnimate.length > 0
          ? [...new Set([...animatingPlayerIds, ...toAnimate.map((a) => a.id)])]
          : animatingPlayerIds;

      set({
        gameState: state,
        playerDisplayPositions: newDisplayPositions,
        currentGameId: state.gameId,
        animatingPlayerIds: pendingAnimatorIds,
        // Only activate turn timer display when no animation is in progress
        activeTurnTimerEndsAt:
          toAnimate.length === 0 && animatingPlayerIds.length === 0
            ? (state.turnEndsAt ?? null)
            : null,
      });

      // Delay movement animation if a moving card is currently being shown,
      // so the player has time to read the card before the token jumps.
      const moveDelay = pendingCardDrawn?.isMoving ? 1500 : 0;
      for (const { id, from, to } of toAnimate) {
        setTimeout(() => animatePlayerMove(id, from, to, set), moveDelay);
      }

      // Only flush the queued card once the player's token is fully at rest.
      // Guard against both: a movement that is about to start (toAnimate) and one
      // already in progress (animatingPlayerIds). In either case, animatePlayerMove
      // will flush the card at its final step instead.
      if (queuedCardDrawn) {
        const playerIsMoving =
          toAnimate.some((a) => a.id === queuedCardDrawn.playerId) ||
          animatingPlayerIds.includes(queuedCardDrawn.playerId);
        if (!playerIsMoving) {
          set({ lastCardDrawn: queuedCardDrawn, queuedCardDrawn: null });
        }
      }
    });

    socket.on("gameStarted", (state: GameState) => {
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
    socket.on(
      "roomState",
      ({
        players,
        gameId,
        countdownEndsAt,
      }: {
        players: LobbyPlayer[];
        gameId: string;
        countdownEndsAt: number | null;
      }) => {
        set({
          lobbyPlayers: players,
          currentGameId: gameId,
          countdownEndsAt: countdownEndsAt ?? null,
        });
      },
    );

    socket.on("playerLeft", ({ playerId }: { playerId: string }) => {
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

    socket.on(
      "propertyLanded",
      (data: { playerId: string; position: number; space: BoardSpace }) => {
        const { myPlayerId, animatingPlayerIds } = get();
        if (data.playerId !== myPlayerId) return;
        if (animatingPlayerIds.includes(data.playerId)) {
          set({ queuedPropertyLanded: data });
        } else {
          set({ pendingPropertyLanded: data });
        }
      },
    );

    socket.on("propertyBought", () => {
      set({ pendingPropertyLanded: null });
    });

    // auctionStarted removed — no auction system

    socket.on(
      "rentPaid",
      (data: {
        fromId: string;
        toId: string;
        amount: number;
        position: number;
      }) => {
        set({ lastRentPaid: data });
      },
    );

    socket.on(
      "cardDrawn",
      (data: {
        playerId: string;
        deck: "chance" | "community_chest";
        card: Card;
      }) => {
        const isMoving =
          data.card.action === "advance_to" ||
          data.card.action === "advance_to_nearest" ||
          data.card.action === "go_to_jail" ||
          data.card.action === "go_back";

        if (isMoving) {
          // Show card immediately so player sees WHY they are moving
          // Also queue it so it persists through/after animation
          set({
            pendingCardDrawn: { ...data, isMoving: true },
            queuedCardDrawn: data,
          });
        } else {
          // Non-moving card: queue as before (flush after animation if any)
          set({ queuedCardDrawn: data });
        }
      },
    );

    socket.on("error", ({ message }: { message: string }) => {
      console.error("[Server error]", message);
      if (message.includes("not found") || message.includes("full")) {
        set({ currentGameId: null, lobbyPlayers: [], countdownEndsAt: null });
      }
    });

    connectSocket();
  },
}));
