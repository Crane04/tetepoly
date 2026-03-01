import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { getSocket } from '../socket/socketClient';

const TOKENS = ['car', 'hat', 'dog', 'ship', 'iron', 'boot', 'wheelbarrow', 'thimble'];

export default function Lobby() {
  const { myPlayerId, lobbyPlayers, lobbyHostId } = useGameStore();
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [token, setToken] = useState(TOKENS[0]);
  const [joined, setJoined] = useState(false);

  const socket = getSocket();

  function handleJoin() {
    if (!gameId.trim() || !playerName.trim()) return;
    socket.emit('joinGame', { gameId: gameId.trim(), playerName: playerName.trim(), token });
    setJoined(true);
  }

  function handleStart() {
    socket.emit('startGame', { gameId: gameId.trim() });
  }

  const players = lobbyPlayers;
  const isHost = lobbyHostId === myPlayerId;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-5xl font-bold tracking-tight">Monopoly</h1>

      {!joined ? (
        <div className="bg-white text-gray-900 rounded-xl p-6 w-full max-w-sm flex flex-col gap-4">
          <input
            className="border rounded px-3 py-2"
            placeholder="Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          >
            {TOKENS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <button
            className="bg-green-600 text-white rounded px-4 py-2 font-semibold hover:bg-green-700"
            onClick={handleJoin}
          >
            Join / Create Game
          </button>
        </div>
      ) : (
        <div className="bg-white text-gray-900 rounded-xl p-6 w-full max-w-sm flex flex-col gap-4">
          <p className="font-semibold text-lg">Room: {gameId}</p>
          <p className="text-sm text-gray-500">Waiting for players…</p>
          <ul className="divide-y">
            {players.map((p) => (
              <li key={p.id} className="py-2 flex items-center gap-2">
                <span className="font-medium">{p.name}</span>
                <span className="text-xs text-gray-400">({p.token})</span>
                {p.id === players[0]?.id && (
                  <span className="ml-auto text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                    Host
                  </span>
                )}
              </li>
            ))}
          </ul>
          {isHost && players.length >= 2 && (
            <button
              className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700"
              onClick={handleStart}
            >
              Start Game
            </button>
          )}
          {isHost && players.length < 2 && (
            <p className="text-sm text-gray-400 text-center">Need at least 2 players to start.</p>
          )}
        </div>
      )}
    </div>
  );
}
