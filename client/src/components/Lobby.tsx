import { useEffect, useState } from 'react';
import { useGameStore, getSavedName, saveName } from '../store/gameStore';
import { getSocket } from '../socket/socketClient';

// Per-room visual config
const ROOM_META: Record<string, { tag: string; gradient: string; tagColor: string }> = {
  'room-1': {
    tag: 'BEGINNER',
    gradient: 'linear-gradient(160deg, #071528 0%, #0a1e3a 40%, #071020 100%)',
    tagColor: '#2a7a6a',
  },
  'room-2': {
    tag: 'STANDARD',
    gradient: 'linear-gradient(160deg, #080f1e 0%, #0c1830 40%, #060c18 100%)',
    tagColor: '#2a507a',
  },
  'room-3': {
    tag: 'HIGH STAKES',
    gradient: 'linear-gradient(160deg, #1a0c00 0%, #2a1400 40%, #120800 100%)',
    tagColor: '#7a4a10',
  },
  'room-4': {
    tag: 'OPEN TABLE',
    gradient: 'linear-gradient(160deg, #0e0720 0%, #160d30 40%, #090414 100%)',
    tagColor: '#4a2a7a',
  },
};

const DEFAULT_META = {
  tag: 'ROOM',
  gradient: 'linear-gradient(160deg, #0d0f16 0%, #111520 100%)',
  tagColor: '#3a4a5a',
};

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

export default function Lobby() {
  const { availableRooms, connected, setMyPlayerId } = useGameStore();
  const [playerName, setPlayerName] = useState(getSavedName);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  const [nameError, setNameError] = useState('');
  const socket = getSocket();

  useEffect(() => {
    socket.emit('listRooms');
    const interval = setInterval(() => socket.emit('listRooms'), 5000);
    return () => clearInterval(interval);
  }, [socket]);

  function handleJoin(roomId: string) {
    const trimmed = playerName.trim();
    if (!trimmed) { setNameError('Enter a name first.'); return; }
    setNameError('');
    setJoiningId(roomId);
    saveName(trimmed);
    setMyPlayerId(trimmed);
    socket.emit('joinGame', { gameId: roomId, playerName: trimmed });
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col">
      {/* ── Header nav ────────────────────────────────────── */}
      <header className="border-b border-[#1a1f2c] px-6 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#1e2230] rounded flex items-center justify-center">
            <span className="text-xs font-bold text-slate-400">T</span>
          </div>
          <span className="font-bold tracking-[0.18em] text-xs uppercase text-slate-300">Tetepoly</span>
        </div>
        <div className={`flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase ${connected ? 'text-teal-600' : 'text-red-600'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-teal-600' : 'bg-red-600'}`} />
          {connected ? 'Online' : 'Offline'}
        </div>
      </header>

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10">
        {/* Section heading */}
        <div className="mb-10">
          <p className="text-[10px] text-[#2a3848] tracking-[0.25em] uppercase mb-2">— High-Stakes Browser</p>
          <h1 className="text-4xl font-bold tracking-tight uppercase text-slate-100">The Rooms</h1>
        </div>

        {/* Name input */}
        <div className="mb-10">
          <label className="block text-[10px] text-[#3a4a5a] tracking-[0.2em] uppercase mb-2">Your Name</label>
          <input
            className="w-72 bg-[#0c0e15] border border-[#1a1f2c] text-slate-200 rounded px-4 py-2.5 text-sm font-mono placeholder-[#252d3a] focus:outline-none focus:border-[#2a3848] transition-colors"
            placeholder="ENTER NAME…"
            value={playerName}
            onChange={(e) => { setPlayerName(e.target.value); setNameError(''); }}
          />
          {nameError && <p className="text-red-500 text-xs mt-1.5 font-mono">{nameError}</p>}
        </div>

        {/* Room grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableRooms.length === 0 && (
            <p className="col-span-2 text-[#2a3848] text-xs tracking-[0.2em] uppercase font-mono">Syncing rooms…</p>
          )}

          {availableRooms.map((room) => {
            const meta = ROOM_META[room.id] ?? DEFAULT_META;
            const isJoining = joiningId === room.id;
            const disabled = !connected || isJoining;
            const hasActiveGame = room.status === 'started';

            return (
              <RoomCard
                key={room.id}
                room={room}
                meta={meta}
                disabled={disabled}
                isJoining={isJoining}
                hasActiveGame={hasActiveGame}
                onJoin={() => handleJoin(room.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface RoomCardProps {
  room: { id: string; name: string; startingMoney: number; capacity: number; playerCount: number; waitingCount: number; status: string; countdownEndsAt: number | null };
  meta: { tag: string; gradient: string; tagColor: string };
  disabled: boolean;
  isJoining: boolean;
  hasActiveGame: boolean;
  onJoin: () => void;
}

function RoomCard({ room, meta, disabled, isJoining, hasActiveGame, onJoin }: RoomCardProps) {
  const countdown = useCountdown(room.countdownEndsAt);
  const hasCountdown = room.countdownEndsAt !== null && countdown > 0;

  const tagLabel = hasActiveGame ? 'IN PROGRESS' : meta.tag;
  const tagColor = hasActiveGame ? '#7a2020' : meta.tagColor;

  const buttonLabel = isJoining
    ? 'JOINING…'
    : hasActiveGame
      ? 'JOIN QUEUE'
      : 'JOIN ROOM';

  return (
    <div
      className={`rounded-lg overflow-hidden border border-[#1a1f2c] flex flex-col transition-opacity ${disabled ? 'opacity-40' : 'hover:border-[#252b3a] transition-colors'}`}
    >
      {/* Image area */}
      <div className="h-36 relative flex flex-col justify-between p-4" style={{ background: meta.gradient }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <div className="relative z-10 flex items-start justify-between">
          <span
            className="text-[10px] tracking-[0.18em] uppercase px-2 py-0.5 rounded border font-semibold"
            style={{ color: tagColor, borderColor: `${tagColor}60`, backgroundColor: `${tagColor}15` }}
          >
            {tagLabel}
          </span>
          <div className="text-right">
            {hasActiveGame && room.playerCount > 0 && (
              <p className="font-mono text-[10px] text-[#2a3848]">{room.playerCount} playing</p>
            )}
            {room.waitingCount > 0 && (
              <p className="font-mono text-[10px] text-[#2a6a4a]">{room.waitingCount} waiting</p>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold uppercase tracking-wide text-slate-200">{room.name}</h3>
        </div>
      </div>

      {/* Info area */}
      <div className="bg-[#0c0e15] p-4 flex flex-col gap-3 border-t border-[#1a1f2c]">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-base font-semibold text-slate-300">
              ${room.startingMoney.toLocaleString()} <span className="text-[#3a4a5a] text-xs font-normal tracking-widest">START</span>
            </p>
            <p className="text-[10px] text-[#2a3848] tracking-[0.15em] uppercase mt-0.5">
              {room.capacity} Player Max
            </p>
          </div>

          {/* Countdown badge */}
          {hasCountdown && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-xs text-amber-500 tabular-nums">{countdown}s</span>
            </div>
          )}
        </div>

        <button
          disabled={disabled}
          onClick={onJoin}
          className="w-full text-[10px] font-semibold tracking-[0.2em] uppercase py-2.5 rounded border transition-colors disabled:cursor-not-allowed border-[#1e2230] text-[#3a4a5a] hover:border-[#2a3848] hover:text-slate-400 disabled:border-[#12151e] disabled:text-[#1e2530]"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
