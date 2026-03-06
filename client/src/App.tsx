import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import Lobby from './components/Lobby';
import WaitingRoom from './components/WaitingRoom';
import Game from './components/Game';

/** Watches the store and navigates when game state changes. */
function Navigator() {
  const { gameState, currentGameId, lobbyPlayers } = useGameStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameState?.status === 'started' || gameState?.status === 'ended') {
      navigate(`/game/${gameState.gameId}`, { replace: true });
    } else if (currentGameId && lobbyPlayers.length > 0) {
      navigate(`/room/${currentGameId}`, { replace: true });
    }
    // Never force-redirect to home — let the user navigate freely
  }, [gameState?.status, gameState?.gameId, currentGameId, lobbyPlayers.length]);

  return null;
}

export default function App() {
  const { initSocket, connected } = useGameStore();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  return (
    <div className="min-h-screen bg-[#0b0d12] text-slate-100">
      {!connected && (
        <div className="fixed top-0 inset-x-0 bg-red-900/80 border-b border-red-800 text-red-300 text-center text-xs tracking-widest uppercase py-1.5 z-50">
          Connecting to server…
        </div>
      )}
      <Navigator />
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/room/:gameId" element={<WaitingRoom />} />
        <Route path="/game/:gameId" element={<Game />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
