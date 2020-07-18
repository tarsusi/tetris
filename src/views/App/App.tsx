import React from 'react';
import './App.scss';
import Routes from '../../routes';
import {
  GameSettingsContext,
  useGameSettings,
} from '../../hooks/useGameSettings';

const App: React.FC = () => {
  const gameSettings = useGameSettings();

  return (
    <GameSettingsContext.Provider value={gameSettings}>
      <Routes></Routes>
    </GameSettingsContext.Provider>
  );
};

export default App;
