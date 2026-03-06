import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameStore, getSavedName, saveName } from "../store/gameStore";
import { getSocket } from "../socket/socketClient";
import Board, { PLAYER_COLORS } from "./Board";
import PropertyCard from "./PropertyCard";
import CardDrawnModal from "./CardDrawnModal";

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
    clearPendingProperty,
    clearRentPaid,
    clearCardDrawn,
    playerDisplayPositions,
    leaveRoom,
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
          {/* Dice result (compact) */}
          {gameState.diceRoll && (
            <div className="flex items-center gap-1 font-mono text-xs text-[#2a3848]">
              <span className="bg-[#0f1117] border border-[#1a1f2c] px-1.5 py-0.5 rounded text-slate-400">
                {gameState.diceRoll[0]}
              </span>
              <span>+</span>
              <span className="bg-[#0f1117] border border-[#1a1f2c] px-1.5 py-0.5 rounded text-slate-400">
                {gameState.diceRoll[1]}
              </span>
              {gameState.lastDiceRollWasDoubles && (
                <span className="text-[#2a5040] tracking-widest uppercase text-[10px] ml-1">
                  ×2
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.2em] uppercase">
          <span
            className={`font-semibold ${isMyTurn ? "text-[#2a6050]" : "text-[#2a3848]"}`}
          >
            {isMyTurn ? "Your Turn" : `${current?.name}'s Turn`}
          </span>
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

            {/* Roll dice overlay */}
            {canRollDice && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  className="bg-[#0c0e15]/90 hover:bg-[#111520] border border-[#1e2230] hover:border-[#2a3848] rounded-xl px-8 py-5 text-[10px] font-semibold tracking-[0.25em] uppercase text-[#3a5060] hover:text-slate-400 transition-all pointer-events-auto shadow-2xl backdrop-blur-sm"
                  onClick={() => emit("rollDice")}
                >
                  Roll Dice
                  {gameState.lastDiceRollWasDoubles && (
                    <span className="block text-[10px] text-[#2a6050] font-normal mt-1 text-center tracking-widest">
                      Doubles — Roll Again
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </main>

        {/* ── RIGHT: Transmission Log ─────────────────────────────── */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-l border-[#1a1f2c]">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a1f2c] shrink-0">
            <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase">
              Transmission Log
            </p>
            <span className="font-mono text-[10px] text-[#1e2530]">
              {String(gameState.log.length).padStart(3, "0")}:R
            </span>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {[...gameState.log].reverse().map((entry, i) => (
              <div
                key={i}
                className="flex gap-2.5 border-b border-[#10131a] pb-2.5 last:border-0"
              >
                <span className="font-mono text-[10px] text-[#1e2530] shrink-0 mt-0.5 pt-px">
                  {String(gameState.log.length - i).padStart(3, "0")}
                </span>
                <p className="text-xs text-[#3a4a5a] leading-relaxed">
                  {entry}
                </p>
              </div>
            ))}
          </div>
          {/* Initiate Transfer */}
          <div className="shrink-0 border-t border-[#1a1f2c] p-3">
            <button className="w-full flex items-center justify-center gap-2 text-[10px] tracking-[0.2em] uppercase py-2.5 rounded border border-[#1a1f2c] text-[#2a3848] hover:border-[#1e2a38] hover:text-[#3a4a5a] transition-colors">
              <span className="font-mono">⇄</span>
              <span>Initiate Transfer</span>
            </button>
          </div>
        </aside>
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
          <div className="bg-[#0f1117] border border-[#1e2230] rounded-xl p-10 text-center flex flex-col gap-5 max-w-sm w-full mx-4">
            <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase">
              Game Over
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100 uppercase">
              {gameState.players.find((p) => p.id === gameState.winner)?.name ??
                "Someone"}{" "}
              Wins
            </h2>
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
