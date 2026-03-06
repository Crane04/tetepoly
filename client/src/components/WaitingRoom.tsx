import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';

function useCountdown(endsAt: number | null): number {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!endsAt) { setRemaining(0); return; }
    const update = () => setRemaining(Math.max(0, Math.floor((endsAt - Date.now()) / 1000)));
    update();
    const t = setInterval(update, 500);
    return () => clearInterval(t);
  }, [endsAt]);
  return remaining;
}

export default function WaitingRoom() {
  const { myPlayerId, lobbyPlayers, currentGameId, countdownEndsAt, availableRooms, leaveRoom } = useGameStore();

  const roomInfo = availableRooms.find((r) => r.id === currentGameId);
  const capacity = roomInfo?.capacity ?? 4;
  const emptySlots = Math.max(0, capacity - lobbyPlayers.length);
  const countdown = useCountdown(countdownEndsAt);
  const hasCountdown = countdownEndsAt !== null && countdown > 0;

  const commsLog = [
    { user: 'SYS', msg: 'Room initialized. Awaiting nodes.' },
    ...lobbyPlayers.map((p, i) => ({
      user: `NODE_${String(i + 1).padStart(2, '0')}`,
      msg: `${p.name}: Connected.`,
    })),
  ];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1a1f2c] px-6 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#1e2230] rounded flex items-center justify-center">
            <span className="text-xs font-bold text-slate-400">T</span>
          </div>
          <span className="font-bold tracking-[0.18em] text-xs uppercase text-slate-300">Tetepoly</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] text-[#2a3848] tracking-[0.2em] uppercase">Room</p>
            <p className="font-mono text-xs text-[#3a4a5a] mt-0.5">{currentGameId}</p>
          </div>
          <button
            className="text-[10px] text-[#2a3848] hover:text-red-600 tracking-[0.15em] uppercase transition-colors"
            onClick={leaveRoom}
          >
            EXIT
          </button>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-12 relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] uppercase whitespace-nowrap"
              style={{ color: '#0f1218' }}
            >
              WAITING FOR PLAYERS
            </h1>
          </div>

          {/* Player slots */}
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            {lobbyPlayers.map((p) => {
              const isMine = p.name === myPlayerId;
              return (
                <div
                  key={p.name}
                  className="bg-[#0c0e15] border border-[#1e2230] rounded-xl flex flex-col items-center gap-3 p-5 w-36"
                  style={isMine ? { borderColor: '#1e3a30' } : {}}
                >
                  <div className="w-16 h-16 rounded-lg bg-[#0a0c12] border border-[#1a2030] flex items-center justify-center text-4xl">
                    {p.token}
                  </div>
                  <p className="text-xs font-semibold text-slate-300 text-center truncate w-full">{p.name}</p>
                  <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 rounded border border-[#1e3a30] text-[#2a7a5a]">
                    READY
                  </span>
                </div>
              );
            })}

            {/* Empty slots */}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="bg-[#0a0c12] border border-[#14181f] border-dashed rounded-xl w-36 flex flex-col items-center justify-center gap-2 p-5"
                style={{ height: '168px' }}
              >
                <span className="text-[#1e2530] text-2xl font-light">+</span>
                <span className="text-[10px] text-[#1e2530] tracking-[0.15em] uppercase">WAITING</span>
              </div>
            ))}
          </div>

          {/* Countdown / status */}
          <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-xs">
            {lobbyPlayers.length < 2 ? (
              <p className="text-[10px] text-[#2a3848] tracking-[0.2em] uppercase text-center">
                Need at least 2 players to start
              </p>
            ) : hasCountdown ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <p className="text-[10px] text-amber-600 tracking-[0.2em] uppercase">Game starting in</p>
                </div>
                <p className="font-mono text-5xl font-bold text-amber-500 tabular-nums">{countdown}</p>
              </>
            ) : (
              <p className="text-[10px] text-[#2a3848] tracking-[0.2em] uppercase text-center">
                Starting soon…
              </p>
            )}
          </div>
        </div>

        {/* Comms link panel */}
        <div className="md:absolute md:bottom-6 md:left-6 w-full md:w-72 bg-[#0c0e15] border border-[#1a1f2c] rounded-lg overflow-hidden shrink-0">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1f2c]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e3028]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#3a4a5a]">Comms Link</span>
          </div>
          <div className="px-4 py-3 flex flex-col gap-2 max-h-36 overflow-y-auto">
            {commsLog.map((entry, i) => (
              <p key={i} className="text-xs text-[#3a4a5a] leading-relaxed font-mono">
                <span className="text-[#2a5040]">{entry.user}</span>
                {': '}
                <span className="text-[#3a4a5a]">{entry.msg}</span>
              </p>
            ))}
          </div>
          <div className="px-3 py-2 border-t border-[#1a1f2c]">
            <input
              className="w-full bg-transparent text-xs text-[#2a3848] placeholder-[#1e2530] focus:outline-none font-mono"
              placeholder="Transmit…"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
