import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import { getSocket } from "../socket/socketClient";
import Board from "./Board";
import PropertyCard from "./PropertyCard";
import CardDrawnModal from "./CardDrawnModal";

export default function Game() {
  const {
    gameState, myPlayerId,
    pendingPropertyLanded, lastRentPaid, lastCardDrawn,
    clearPendingProperty, clearRentPaid, clearCardDrawn,
    playerDisplayPositions,
  } = useGameStore();
  const socket = getSocket();

  // Auto-dismiss rent notification after 3 s
  useEffect(() => {
    if (!lastRentPaid) return;
    const t = setTimeout(clearRentPaid, 3000);
    return () => clearTimeout(t);
  }, [lastRentPaid, clearRentPaid]);

  if (!gameState) return <div className="p-8">Loading game…</div>;

  const me = gameState.players.find((p) => p.id === myPlayerId);
  const current = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = current?.id === myPlayerId;

  function emit(event: string, payload?: object) {
    socket.emit(event, { gameId: gameState!.gameId, ...payload });
  }

  const playerCards = gameState.players.map((p) => (
    <div
      key={p.id}
      className={`rounded-lg p-2 text-xs shrink-0 ${
        p.id === current?.id
          ? "bg-yellow-400 text-gray-900"
          : "bg-green-700"
      } ${p.isBankrupt ? "opacity-40" : ""}`}
    >
      <p className="font-semibold truncate max-w-[120px]">
        {p.name} {p.id === myPlayerId && <span className="opacity-60">(you)</span>}
      </p>
      <p className="font-bold text-sm">${p.money}</p>
      <p className="opacity-70">
        Pos {p.position}
        {p.inJail ? " 🔒" : ""}
      </p>
      <p className="opacity-70">{p.properties.length} props</p>
    </div>
  ));

  const isPendingMyDecision =
    pendingPropertyLanded !== null && pendingPropertyLanded.playerId === myPlayerId;

  const actionButtons = (
    <>
      {isMyTurn && gameState.diceRoll && !gameState.lastDiceRollWasDoubles && !isPendingMyDecision && (
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2 font-semibold text-sm w-full"
          onClick={() => emit("endTurn")}
        >
          End Turn
        </button>
      )}
      {isMyTurn && me?.inJail && (
        <>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded px-3 py-2 text-sm font-semibold w-full"
            onClick={() => emit("payJailFine")}
          >
            Pay $50 Fine
          </button>
          {me.getOutOfJailCards > 0 && (
            <button
              className="bg-purple-600 hover:bg-purple-700 rounded px-3 py-2 text-sm font-semibold w-full"
              onClick={() => emit("useJailCard")}
            >
              Use GOOJF Card
            </button>
          )}
          <button
            className="bg-red-600 hover:bg-red-700 rounded px-3 py-2 text-sm font-semibold w-full"
            onClick={() => emit("rollDice")}
          >
            Try Doubles
          </button>
        </>
      )}
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-green-900 text-white overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between bg-green-800 px-4 py-2 gap-4">
        <span className="font-bold text-lg">Monopoly</span>
        <div className="flex items-center gap-3 text-sm flex-wrap justify-end">
          {gameState.diceRoll && (
            <div className="flex items-center gap-1 bg-green-700 px-2 py-1 rounded">
              <span className="font-bold">{gameState.diceRoll[0]}</span>
              <span>+</span>
              <span className="font-bold">{gameState.diceRoll[1]}</span>
              <span className="text-yellow-300 font-bold ml-1">
                = {gameState.diceRoll[0] + gameState.diceRoll[1]}
              </span>
              {gameState.lastDiceRollWasDoubles && (
                <span className="text-yellow-400 ml-1 font-bold text-xs">DOUBLES!</span>
              )}
            </div>
          )}
          <span className={isMyTurn ? "text-yellow-300 font-bold" : "opacity-80"}>
            {isMyTurn ? "🎲 Your turn!" : `${current?.name}'s turn`}
          </span>
        </div>
      </header>

      {/* ── Main row: [players] [board] [actions] ───────────────────────── */}
      <div className="flex flex-1 min-h-0 gap-2 p-2">
        {/* Left sidebar — players (desktop) */}
        <aside className="hidden md:flex flex-col gap-2 w-36 shrink-0 overflow-y-auto">
          {playerCards}
        </aside>

        {/* Board — fills remaining space, capped so it never overflows vertically */}
        <main className="flex-1 min-w-0 flex items-center justify-center overflow-auto">
          <div
            className="relative"
            style={{
              width: "100%",
              maxWidth: "calc(100vh - 100px)",
              aspectRatio: "1 / 1",
            }}
          >
            <Board
              spaces={gameState.board}
              players={gameState.players}
              playerDisplayPositions={playerDisplayPositions}
            />

            {/* Roll-dice overlay on the board center */}
            {isMyTurn &&
              !me?.inJail &&
              (!gameState.diceRoll || gameState.lastDiceRollWasDoubles) && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <button
                    className="bg-red-600 hover:bg-red-700 rounded-2xl px-6 py-4 font-bold text-xl shadow-2xl pointer-events-auto border-4 border-red-400"
                    onClick={() => emit("rollDice")}
                  >
                    🎲 Roll Dice
                    {gameState.lastDiceRollWasDoubles && (
                      <span className="block text-sm font-normal text-yellow-300">
                        Doubles! Roll again
                      </span>
                    )}
                  </button>
                </div>
              )}
          </div>
        </main>

        {/* Right sidebar — actions + log (desktop) */}
        <aside className="hidden md:flex flex-col gap-2 w-44 shrink-0">
          {/* Dice recap */}
          {gameState.diceRoll && (
            <div className="bg-green-700 rounded p-2 text-center text-sm shrink-0">
              <p className="opacity-70 text-xs mb-1">Last roll</p>
              <div className="flex items-center justify-center gap-2">
                <div className="bg-white text-gray-900 rounded w-9 h-9 flex items-center justify-center text-lg font-bold shadow">
                  {gameState.diceRoll[0]}
                </div>
                <span className="font-bold">+</span>
                <div className="bg-white text-gray-900 rounded w-9 h-9 flex items-center justify-center text-lg font-bold shadow">
                  {gameState.diceRoll[1]}
                </div>
              </div>
              <p className="mt-1 font-bold">
                = {gameState.diceRoll[0] + gameState.diceRoll[1]}
              </p>
              {gameState.lastDiceRollWasDoubles && (
                <p className="text-yellow-400 text-xs font-bold">DOUBLES!</p>
              )}
            </div>
          )}

          {actionButtons}

          {/* Game log — takes remaining space */}
          <div className="flex-1 min-h-0 bg-green-700 rounded p-2 overflow-y-auto">
            <p className="text-xs font-semibold mb-1 opacity-70">Game Log</p>
            {[...gameState.log].reverse().map((entry, i) => (
              <p
                key={i}
                className="text-xs opacity-80 border-b border-green-600 py-0.5"
              >
                {entry}
              </p>
            ))}
          </div>
        </aside>
      </div>

      {/* ── Mobile bottom panel ─────────────────────────────────────────── */}
      <div className="md:hidden shrink-0 bg-green-800 border-t border-green-700 p-2 flex gap-2 overflow-x-auto">
        {playerCards}
        <div className="flex gap-2 items-start ml-auto shrink-0">
          {isMyTurn &&
            gameState.diceRoll &&
            !gameState.lastDiceRollWasDoubles &&
            !isPendingMyDecision && (
              <button
                className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-2 font-semibold text-sm whitespace-nowrap"
                onClick={() => emit("endTurn")}
              >
                End Turn
              </button>
            )}
          {isMyTurn && me?.inJail && (
            <>
              <button
                className="bg-yellow-500 text-gray-900 rounded px-2 py-1 text-xs font-semibold whitespace-nowrap"
                onClick={() => emit("payJailFine")}
              >
                Pay $50
              </button>
              {me.getOutOfJailCards > 0 && (
                <button
                  className="bg-purple-600 rounded px-2 py-1 text-xs font-semibold whitespace-nowrap"
                  onClick={() => emit("useJailCard")}
                >
                  GOOJF
                </button>
              )}
              <button
                className="bg-red-600 rounded px-2 py-1 text-xs font-semibold whitespace-nowrap"
                onClick={() => emit("rollDice")}
              >
                Try Doubles
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Property card modal (unowned property landed on) ────────────── */}
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

      {/* ── Rent paid toast ─────────────────────────────────────────────── */}
      {lastRentPaid && (() => {
        const payer = gameState.players.find((p) => p.id === lastRentPaid.fromId);
        const owner = gameState.players.find((p) => p.id === lastRentPaid.toId);
        const space = gameState.board[lastRentPaid.position];
        return (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-xl px-5 py-3 shadow-2xl z-50 text-sm text-center pointer-events-none">
            <span className="font-semibold text-red-400">{payer?.name ?? 'Someone'}</span>
            {' paid '}
            <span className="font-bold text-yellow-300">${lastRentPaid.amount}</span>
            {' rent to '}
            <span className="font-semibold text-green-400">{owner?.name ?? 'someone'}</span>
            {space ? <span className="opacity-60"> ({space.name})</span> : null}
          </div>
        );
      })()}

      {/* ── Card drawn modal (Chance / Community Chest) ─────────────────── */}
      {lastCardDrawn && (() => {
        const drawer = gameState.players.find((p) => p.id === lastCardDrawn.playerId);
        return (
          <CardDrawnModal
            deck={lastCardDrawn.deck}
            card={lastCardDrawn.card}
            playerName={drawer?.name ?? "Someone"}
            onClose={clearCardDrawn}
          />
        );
      })()}

      {/* ── Game over overlay ───────────────────────────────────────────── */}
      {gameState.status === "ended" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Game Over!</h2>
            <p className="text-xl">
              {gameState.players.find((p) => p.id === gameState.winner)?.name ??
                "Someone"}{" "}
              wins!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
