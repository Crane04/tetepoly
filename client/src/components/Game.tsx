import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameStore, getSavedName, saveName } from "../store/gameStore";
import { getSocket } from "../socket/socketClient";
import Board, { PLAYER_COLORS } from "./Board";
import PropertyCard from "./PropertyCard";
import CardDrawnModal from "./CardDrawnModal";

// ── 3D Dice ──────────────────────────────────────────────────────────────────
const DOT_POS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]],
};

// Rotation to bring each face's number to face the camera.
// Face layout: front=1, back=6, right=3, left=4, top=5, bottom=2
const CUBE_ROT: Record<number, string> = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateX(-90deg) rotateY(0deg)",
  3: "rotateY(-90deg) rotateX(0deg)",
  4: "rotateY(90deg) rotateX(0deg)",
  5: "rotateX(90deg) rotateY(0deg)",
  6: "rotateY(180deg) rotateX(0deg)",
};

const DIE_FACES: { num: number; tf: string }[] = [
  { num: 1, tf: "translateZ(22px)" },
  { num: 6, tf: "rotateY(180deg) translateZ(22px)" },
  { num: 3, tf: "rotateY(90deg) translateZ(22px)" },
  { num: 4, tf: "rotateY(-90deg) translateZ(22px)" },
  { num: 5, tf: "rotateX(-90deg) translateZ(22px)" },
  { num: 2, tf: "rotateX(90deg) translateZ(22px)" },
];

function Dice3D({ value }: { value: number }) {
  return (
    <div style={{ width: 44, height: 44, perspective: 220 }}>
      <div
        style={{
          width: 44,
          height: 44,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: CUBE_ROT[value] ?? "rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
      >
        {DIE_FACES.map(({ num, tf }) => (
          <div
            key={num}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#0d1019",
              border: "1.5px solid #222a38",
              borderRadius: 7,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: tf,
            }}
          >
            {(DOT_POS[num] ?? []).map(([x, y], i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#8ab0a8",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 4px #3a7060aa",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Sidebar asset accent colors (visible on dark bg)
const ASSET_ACCENT: Record<string, string> = {
  Brown: "#7a3510",
  "Light Blue": "#1a6080",
  Pink: "#803060",
  Orange: "#805010",
  Red: "#802020",
  Yellow: "#706800",
  Green: "#207020",
  "Dark Blue": "#1020a0",
};

export default function Game() {
  const { gameId: gameCode } = useParams<{ gameId: string }>();
  const {
    gameState,
    myPlayerId,
    setMyPlayerId,
    pendingPropertyLanded,
    lastRentPaid,
    lastCardDrawn,
    pendingCardDrawn,
    clearPendingProperty,
    clearRentPaid,
    clearCardDrawn,
    playerDisplayPositions,
    leaveRoom,
    activeTurnTimerEndsAt,
    animatingPlayerIds,
  } = useGameStore();
  const socket = getSocket();

  const [reconnectName, setReconnectName] = useState(getSavedName);
  const [reconnectError, setReconnectError] = useState("");
  const [viewingSpace, setViewingSpace] = useState<
    import("../types").BoardSpace | null
  >(null);

  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  );

  useEffect(() => {
    const t = setInterval(
      () =>
        setClock(
          new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        ),
      60000,
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!lastRentPaid) return;
    const t = setTimeout(clearRentPaid, 3000);
    return () => clearTimeout(t);
  }, [lastRentPaid, clearRentPaid]);

  // Turn timer countdown — updates every second, only ticks when no animation playing
  const [turnSecsLeft, setTurnSecsLeft] = useState<number | null>(null);
  useEffect(() => {
    if (!activeTurnTimerEndsAt) {
      setTurnSecsLeft(null);
      return;
    }
    const tick = () => {
      const secs = Math.max(
        0,
        Math.round((activeTurnTimerEndsAt - Date.now()) / 1000),
      );
      setTurnSecsLeft(secs);
    };
    tick();
    const t = setInterval(tick, 500);
    return () => clearInterval(t);
  }, [activeTurnTimerEndsAt]);

  function handleReconnect() {
    const name = reconnectName.trim();
    if (!name) {
      setReconnectError("Enter your name to rejoin.");
      return;
    }
    if (!gameCode) return;
    saveName(name);
    setMyPlayerId(name);
    socket.emit("joinGame", { gameId: gameCode, playerName: name });
  }

  if (!gameState)
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center px-4">
        <div className="bg-[#0c0e15] border border-[#1a1f2c] rounded-xl p-8 flex flex-col gap-5 w-full max-w-xs text-center">
          <div>
            <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase mb-1">
              Game
            </p>
            <p className="font-mono text-xs text-[#3a4a5a]">{gameCode}</p>
          </div>
          <div className="flex flex-col gap-2 text-left">
            <label className="text-[10px] text-[#3a4a5a] tracking-[0.2em] uppercase">
              Your Name
            </label>
            <input
              className="bg-[#080a0f] border border-[#1a1f2c] text-slate-200 rounded px-3 py-2.5 text-sm font-mono placeholder-[#252d3a] focus:outline-none focus:border-[#2a3848]"
              placeholder="NAME…"
              value={reconnectName}
              onChange={(e) => {
                setReconnectName(e.target.value);
                setReconnectError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleReconnect()}
            />
            {reconnectError && (
              <p className="text-red-500 text-xs font-mono">{reconnectError}</p>
            )}
          </div>
          <button
            onClick={handleReconnect}
            className="text-[10px] font-semibold tracking-[0.2em] uppercase py-2.5 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a3848] hover:text-slate-400 transition-colors"
          >
            Rejoin Game
          </button>
        </div>
      </div>
    );

  const me = gameState.players.find((p) => p.id === myPlayerId);
  const current = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = current?.id === myPlayerId;

  function emit(event: string, payload?: object) {
    socket.emit(event, { gameId: gameState!.gameId, ...payload });
  }

  const isPendingMyDecision =
    pendingPropertyLanded !== null &&
    pendingPropertyLanded.playerId === myPlayerId;
  const canEndTurn =
    isMyTurn &&
    gameState.diceRoll &&
    !gameState.lastDiceRollWasDoubles &&
    !isPendingMyDecision;
  const canRollDice =
    isMyTurn &&
    !me?.inJail &&
    (!gameState.diceRoll || gameState.lastDiceRollWasDoubles);

  const myAssets = gameState.board.filter((s) => s.ownerId === myPlayerId);

  return (
    <div className="flex flex-col h-screen bg-[#0a0c10] text-slate-100 overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center border-b border-[#1a1f2c] px-5 h-12 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 border border-[#1e2230] rounded flex items-center justify-center">
            <span className="text-[10px] font-bold text-slate-500">T</span>
          </div>
          <span className="font-bold tracking-[0.18em] text-[10px] uppercase text-slate-500 hidden sm:block">
            NOPOLY
          </span>
        </div>

        {/* Clock + Balance */}
        <div className="flex items-center gap-3 ml-1">
          <span className="font-mono text-xs text-[#3a4a5a]">{clock}</span>
          {me && (
            <span className="font-mono text-sm font-semibold text-slate-300">
              ${me.money.toLocaleString()}
            </span>
          )}
        </div>

        <div className="flex-1" />

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold ${isMyTurn ? "text-[#2a6050]" : "text-[#2a3848]"}`}
            >
              {isMyTurn ? "Your Turn" : `${current?.name}'s Turn`}
            </span>
            {turnSecsLeft !== null && (
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
                style={{
                  borderColor: turnSecsLeft <= 5 ? "#5a1a1a" : "#1a2a1a",
                  color: turnSecsLeft <= 5 ? "#c04040" : "#2a6050",
                  backgroundColor: turnSecsLeft <= 5 ? "#1a0808" : "#0a1810",
                  minWidth: "2.5rem",
                  textAlign: "center",
                }}
              >
                {String(turnSecsLeft).padStart(2, "0")}s
              </span>
            )}
          </div>
          <button
            className="text-[#2a3848] hover:text-red-600 transition-colors"
            onClick={leaveRoom}
          >
            Exit
          </button>
        </nav>

        {/* End Turn button */}
        {canEndTurn && (
          <button
            className="text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-slate-100 transition-colors shrink-0 ml-2"
            onClick={() => emit("endTurn")}
          >
            End Turn
          </button>
        )}

        {/* My token avatar */}
        {me && (
          <div className="w-7 h-7 rounded-full bg-[#0f1117] border border-[#1e2230] flex items-center justify-center text-sm shrink-0">
            {me.token}
          </div>
        )}
      </header>

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* ── LEFT: Registry + Assets ─────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-[#1a1f2c] overflow-y-auto">
          {/* Registry */}
          <div>
            <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase px-4 py-2.5 border-b border-[#1a1f2c]">
              Registry
            </p>
            <div className="divide-y divide-[#1a1f2c]">
              {gameState.players.map((p, pi) => {
                const isActive = p.id === current?.id;
                const isMine = p.id === myPlayerId;
                const pColor =
                  PLAYER_COLORS[pi % PLAYER_COLORS.length] ?? "#4a5a6a";
                return (
                  <div
                    key={p.id}
                    className={`px-4 py-3 flex items-start gap-3 ${p.isBankrupt ? "opacity-25" : ""}`}
                  >
                    <div
                      className="w-7 h-7 rounded border flex items-center justify-center text-sm shrink-0"
                      style={{
                        borderColor: isActive ? "#1e3a30" : "#1a1f2c",
                        backgroundColor: isActive ? "#0a1810" : "#0c0e15",
                      }}
                    >
                      {p.token}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p
                          className="text-xs font-semibold truncate"
                          style={{ color: pColor }}
                        >
                          {p.name}
                        </p>
                        {isMine && (
                          <span className="text-[10px] text-[#2a3848] shrink-0">
                            you
                          </span>
                        )}
                      </div>
                      <p
                        className="font-mono text-xs mt-0.5"
                        style={{ color: isActive ? "#c0d0c8" : "#2a3848" }}
                      >
                        ${p.money.toLocaleString()}
                      </p>
                      <p
                        className="text-[10px] tracking-[0.15em] uppercase mt-0.5"
                        style={{ color: isActive ? "#2a6050" : "#1e2a38" }}
                      >
                        {p.isBankrupt
                          ? "BANKRUPT"
                          : p.inJail
                            ? "DETAINED"
                            : isActive
                              ? "ACTIVE"
                              : "IDLE"}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-1 h-1 rounded-full bg-[#2a6050] shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assets */}
          {myAssets.length > 0 && (
            <div className="border-t border-[#1a1f2c]">
              <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase px-4 py-2.5 border-b border-[#1a1f2c]">
                Assets
              </p>
              <div className="divide-y divide-[#14181f]">
                {myAssets.map((s) => (
                  <div
                    key={s.position}
                    className="px-4 py-2 flex items-center gap-2"
                  >
                    {s.colorGroup && (
                      <div
                        className="w-0.5 h-4 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            ASSET_ACCENT[s.colorGroup] ?? "#3a4a5a",
                        }}
                      />
                    )}
                    <p className="text-xs text-[#3a4a5a] flex-1 truncate">
                      {s.name}
                    </p>
                    <p className="font-mono text-[10px] text-[#2a3848] shrink-0">
                      ${s.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jail actions (shown at bottom of left panel when in jail) */}
          {isMyTurn && me?.inJail && (
            <div className="border-t border-[#1a1f2c] px-3 py-3 flex flex-col gap-2 mt-auto">
              <button
                className="text-[10px] tracking-[0.15em] uppercase py-2 px-3 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a4038] hover:text-[#3a7060] transition-colors"
                onClick={() => emit("payJailFine")}
              >
                Pay $50 Fine
              </button>
              {me.getOutOfJailCards > 0 && (
                <button
                  className="text-[10px] tracking-[0.15em] uppercase py-2 px-3 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a4038] hover:text-[#3a7060] transition-colors"
                  onClick={() => emit("useJailCard")}
                >
                  Use GOOJF Card
                </button>
              )}
              <button
                className="text-[10px] tracking-[0.15em] uppercase py-2 px-3 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-red-900/60 hover:text-red-600 transition-colors"
                onClick={() => emit("rollDice")}
              >
                Try Doubles
              </button>
            </div>
          )}
        </aside>

        {/* ── CENTER: Board ─────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 flex items-center justify-center p-3 overflow-hidden relative">
          <div
            className="relative"
            style={{
              width: "100%",
              maxWidth: "calc(100vh - 80px)",
              aspectRatio: "1 / 1",
            }}
          >
            <Board
              spaces={gameState.board}
              players={gameState.players}
              playerDisplayPositions={playerDisplayPositions}
              onSpaceClick={(space) => setViewingSpace(space)}
            />

            {/* Center overlay: 3D dice result + roll button */}
            {(canRollDice || gameState.diceRoll) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center gap-4">
                  {gameState.diceRoll && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-4">
                        <Dice3D value={gameState.diceRoll[0]} />
                        <Dice3D value={gameState.diceRoll[1]} />
                      </div>
                      {gameState.lastDiceRollWasDoubles && (
                        <span className="text-[9px] text-[#2a6050] tracking-[0.25em] uppercase">
                          doubles
                        </span>
                      )}
                    </div>
                  )}
                  {canRollDice && (
                    <button
                      className="bg-[#0c0e15]/90 hover:bg-[#111520] border border-[#1e2230] hover:border-[#2a3848] rounded-xl px-8 py-4 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#3a5060] hover:text-slate-400 transition-all pointer-events-auto shadow-2xl backdrop-blur-sm"
                      onClick={() => emit("rollDice")}
                    >
                      {gameState.lastDiceRollWasDoubles ? "Roll Again" : "Roll Dice"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Bottom status bar ─────────────────────────────────────── */}
      <div className="shrink-0 border-t border-[#1a1f2c] px-5 h-9 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile player list */}
          <div className="md:hidden flex gap-3 overflow-x-auto">
            {gameState.players.map((p) => (
              <div
                key={p.id}
                className={`flex items-center gap-1.5 text-xs shrink-0 ${p.id === current?.id ? "text-[#3a7060]" : "text-[#2a3848]"}`}
              >
                <span>{p.token}</span>
                <span className="font-mono">${p.money}</span>
              </div>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[10px] text-[#1e2530] tracking-[0.15em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e3028]" />
            <span>Nodes Connected</span>
          </div>
        </div>

        {/* Player node pills */}
        <div className="flex items-center gap-1.5">
          {gameState.players.map((p, i) => (
            <div
              key={p.id}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
              style={{
                borderColor: p.id === current?.id ? "#1e4030" : "#14181f",
                color: p.id === current?.id ? "#3a8060" : "#2a3848",
                backgroundColor:
                  p.id === current?.id ? "#0a1810" : "transparent",
              }}
            >
              P{i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile bottom actions ──────────────────────────────────── */}
      <div className="md:hidden shrink-0 border-t border-[#1a1f2c] p-3 flex flex-wrap gap-2 bg-[#0c0e15]">
        {canEndTurn && (
          <button
            className="text-[10px] tracking-widest uppercase px-4 py-2 rounded border border-[#2a3848] text-slate-400"
            onClick={() => emit("endTurn")}
          >
            End Turn
          </button>
        )}
        {canRollDice && (
          <button
            className="text-[10px] tracking-widest uppercase px-4 py-2 rounded border border-[#1e2230] text-[#3a4a5a]"
            onClick={() => emit("rollDice")}
          >
            Roll Dice
          </button>
        )}
        {isMyTurn && me?.inJail && (
          <>
            <button
              className="text-[10px] px-3 py-1.5 rounded border border-[#1e2230] text-[#3a4a5a]"
              onClick={() => emit("payJailFine")}
            >
              Pay $50
            </button>
            {me.getOutOfJailCards > 0 && (
              <button
                className="text-[10px] px-3 py-1.5 rounded border border-[#1e2230] text-[#3a4a5a]"
                onClick={() => emit("useJailCard")}
              >
                GOOJF
              </button>
            )}
            <button
              className="text-[10px] px-3 py-1.5 rounded border border-[#1e2230] text-[#3a4a5a]"
              onClick={() => emit("rollDice")}
            >
              Doubles
            </button>
          </>
        )}
      </div>

      {/* ── Modals ────────────────────────────────────────────────── */}

      {/* Pending card (shown BEFORE movement for advance_to cards) */}
      {pendingCardDrawn &&
        !lastCardDrawn &&
        (() => {
          const drawer = gameState.players.find(
            (p) => p.id === pendingCardDrawn.playerId,
          );
          return (
            <CardDrawnModal
              deck={pendingCardDrawn.deck}
              card={pendingCardDrawn.card}
              playerName={drawer?.name ?? "Someone"}
              onClose={clearCardDrawn}
            />
          );
        })()}

      {viewingSpace && !pendingPropertyLanded && (
        <PropertyCard
          space={viewingSpace}
          canBuy={false}
          onClose={() => setViewingSpace(null)}
        />
      )}

      {pendingPropertyLanded && (
        <PropertyCard
          space={pendingPropertyLanded.space}
          canBuy={isPendingMyDecision}
          playerMoney={me?.money}
          onBuy={() => {
            emit("buyProperty", { position: pendingPropertyLanded.position });
            clearPendingProperty();
          }}
          onDecline={() => {
            // No auction — just decline, property stays unowned
            emit("declineBuy", { position: pendingPropertyLanded.position });
            clearPendingProperty();
          }}
          onClose={clearPendingProperty}
        />
      )}

      {/* Rent toast */}
      {lastRentPaid &&
        (() => {
          const payer = gameState.players.find(
            (p) => p.id === lastRentPaid.fromId,
          );
          const owner = gameState.players.find(
            (p) => p.id === lastRentPaid.toId,
          );
          const space = gameState.board[lastRentPaid.position];
          return (
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#0c0e15] border border-[#1e2230] rounded-lg px-5 py-3 shadow-2xl z-50 text-xs text-center pointer-events-none">
              <span className="text-red-500/80">
                {payer?.name ?? "Someone"}
              </span>
              {" paid "}
              <span className="font-mono text-slate-300">
                ${lastRentPaid.amount}
              </span>
              {" → "}
              <span className="text-[#3a8060]">{owner?.name ?? "someone"}</span>
              {space ? (
                <span className="text-[#2a3848]"> · {space.name}</span>
              ) : null}
            </div>
          );
        })()}

      {/* Card drawn modal */}
      {lastCardDrawn &&
        (() => {
          const drawer = gameState.players.find(
            (p) => p.id === lastCardDrawn.playerId,
          );
          return (
            <CardDrawnModal
              deck={lastCardDrawn.deck}
              card={lastCardDrawn.card}
              playerName={drawer?.name ?? "Someone"}
              onClose={clearCardDrawn}
            />
          );
        })()}

      {/* Game over */}
      {gameState.status === "ended" && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-[#0f1117] border border-[#1e2230] rounded-xl p-10 text-center flex flex-col gap-6 max-w-sm w-full mx-4">
            <div>
              <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase mb-3">
                Game Over
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-100 uppercase">
                {gameState.players.find((p) => p.id === gameState.winner)
                  ?.name ?? "Someone"}{" "}
                Wins
              </h2>
            </div>

            {/* Payout breakdown */}
            {gameState.winners && gameState.winners.length > 0 && (
              <div className="flex flex-col gap-2 border border-[#1a1f2c] rounded-lg overflow-hidden">
                {gameState.winners.map((w) => {
                  const player = gameState.players.find(
                    (p) => p.id === w.playerId,
                  );
                  return (
                    <div
                      key={w.playerId}
                      className="flex items-center justify-between px-4 py-3 border-b border-[#1a1f2c] last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#2a3848] font-mono w-5">
                          {w.place === 1 ? "1ST" : "2ND"}
                        </span>
                        <span className="text-xs text-slate-300 font-semibold">
                          {player?.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-slate-300">
                          {Math.round(w.payoutShare * 100)}%
                        </p>
                        <p className="font-mono text-[10px] text-[#2a3848]">
                          NW: ${w.netWorth.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0a0c12]">
                  <span className="text-[10px] text-[#2a3848] tracking-[0.15em] uppercase">
                    House
                  </span>
                  <span className="font-mono text-xs text-[#2a3848]">8%</span>
                </div>
              </div>
            )}

            <button
              className="text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-2.5 rounded border border-[#1e2230] text-[#3a4a5a] hover:border-[#2a3848] hover:text-slate-400 transition-colors"
              onClick={leaveRoom}
            >
              Back to Lobby
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
