import { useState } from 'react';

export interface GameSettings {
  cellRowCount: number;
  cellColCount: number;
  cellRadius: number;
  boardWidth: number;
  boardHeight: number;
  cellWidth: number;
  cellHeight: number;
  speed: number;
}

export const useGameSettings = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    cellRowCount: 16,
    cellColCount: 12,
    cellRadius: 4,
    boardWidth: 1200,
    boardHeight: 1600,
    cellWidth: 100,
    cellHeight: 100,
    speed: 1000,
  });

  return {
    gameSettings,
    updateRowCount: (cellRowCount: number) =>
      setGameSettings({
        ...gameSettings,
        cellRowCount,
        cellHeight: gameSettings.boardHeight / cellRowCount,
      }),
    updateColCount: (cellColCount: number) =>
      setGameSettings({
        ...gameSettings,
        cellColCount,
        cellWidth: gameSettings.boardWidth / cellColCount,
      }),
    updateCellRadius: (cellRadius: number) =>
      setGameSettings({ ...gameSettings, cellRadius }),
    updateBoardWidth: (boardWidth: number) =>
      setGameSettings({
        ...gameSettings,
        boardWidth,
        cellWidth: boardWidth / gameSettings.cellColCount,
      }),
    updateBoardHeight: (boardHeight: number) =>
      setGameSettings({
        ...gameSettings,
        boardHeight,
        cellHeight: boardHeight / gameSettings.cellRowCount,
      }),
    updateAnimationSpeed: (speed: number) =>
      setGameSettings({ ...gameSettings, speed }),
  };
};
