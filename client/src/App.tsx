import { useEffect, useState } from 'react';
import { useGameStore } from './store/gameStore';
import { getSocket } from './socket/socketClient';
import Lobby from './components/Lobby';
import Game from './components/Game';

export default function App() {
  const { initSocket, gameState, connected } = useGameStore();
  const [view, setView] = useState<'lobby' | 'game'>('lobby');

  // Connect socket once on mount
  useEffect(() => {
    initSocket();
  }, [initSocket]);

  // Switch to game view when game starts
  useEffect(() => {
    if (gameState?.status === 'started') {
      setView('game');
    } else if (gameState?.status === 'waiting' || !gameState) {
      setView('lobby');
    }
  }, [gameState?.status]);

  return (
    <div className="min-h-screen bg-green-900 text-white">
      {!connected && (
        <div className="fixed top-0 inset-x-0 bg-red-600 text-center text-sm py-1 z-50">
          Connecting to server…
        </div>
      )}
      {view === 'lobby' ? <Lobby /> : <Game />}
    </div>
  );
}
