import { useReducer, createContext } from 'react';

export type SpeedSetting = 'slow' | 'normal' | 'fast';

export interface IGameSettings {
  cellRowCount: number;
  cellColCount: number;
  cellRadius: number;
  boardWidth: number;
  boardHeight: number;
  cellWidth: number;
  cellHeight: number;
  speed: SpeedSetting;
}

export const initialState: IGameSettings = {
  cellRowCount: 16,
  cellColCount: 12,
  cellRadius: 4,
  boardWidth: 1200,
  boardHeight: 1600,
  cellWidth: 100,
  cellHeight: 100,
  speed: 'normal',
};

enum GameSettingsActionType {
  UPDATE_BOARD_WIDTH = 'UPDATE_BOARD_WIDTH',
  UPDATE_BOARD_HEIGHT = 'UPDATE_BOARD_HEIGHT',
  UPDATE_ROW_COUNT = 'UPDATE_ROW_COUNT',
  UPDATE_COL_COUNT = 'UPDATE_COL_COUNT',
  UPDATE_SPEED = 'UPDATE_SPEED',
  UPDATE_RADIUS = 'UPDATE_RADIUS',
  RESET_SETTINGS = 'RESET_SETTINGS',
}

function gameSettingsReducer(
  state: IGameSettings,
  action:
    | { type: GameSettingsActionType; payload?: number }
    | { type: GameSettingsActionType; payload?: SpeedSetting },
): IGameSettings {
  switch (action.type) {
    case GameSettingsActionType.UPDATE_ROW_COUNT:
      return {
        ...state,
        cellRowCount: action.payload as number,
        cellHeight: state.boardHeight / (action.payload as number),
      };
    case GameSettingsActionType.UPDATE_COL_COUNT:
      return {
        ...state,
        cellColCount: action.payload as number,
        cellWidth: state.boardWidth / (action.payload as number),
      };
    case GameSettingsActionType.UPDATE_SPEED:
      return {
        ...state,
        speed: action.payload as SpeedSetting,
      };
    case GameSettingsActionType.UPDATE_RADIUS:
      return {
        ...state,
        cellRadius: action.payload as number,
      };
    case GameSettingsActionType.UPDATE_BOARD_WIDTH:
      return {
        ...state,
        boardWidth: action.payload as number,
        cellWidth: (action.payload as number) / state.cellColCount,
      };
    case GameSettingsActionType.UPDATE_BOARD_HEIGHT:
      return {
        ...state,
        boardHeight: action.payload as number,
        cellHeight: (action.payload as number) / state.cellRowCount,
      };
    case GameSettingsActionType.RESET_SETTINGS:
      return initialState;
    default:
      return state;
  }
}

export const GameSettingsContext = createContext({
  gameSettings:
    JSON.parse(localStorage.getItem('gameSettings') as string) || initialState,
  updateRowCount: (cellRowCount: number) => {},
  updateColCount: (cellColCount: number) => {},
  updateCellRadius: (cellRadius: number) => {},
  updateBoardWidth: (boardWidth: number) => {},
  updateBoardHeight: (boardHeight: number) => {},
  updateAnimationSpeed: (speed: SpeedSetting) => {},
  resetSettings: () => {},
});

export const useGameSettings = () => {
  const [gameSettings, dispatch] = useReducer(
    gameSettingsReducer,
    JSON.parse(localStorage.getItem('gameSettings') as string) || initialState,
  );

  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));

  return {
    gameSettings,
    resetSettings: () => {
      dispatch({
        type: GameSettingsActionType.RESET_SETTINGS,
      });
    },
    updateRowCount: (cellRowCount: number) =>
      dispatch({
        type: GameSettingsActionType.UPDATE_ROW_COUNT,
        payload: cellRowCount,
      }),
    updateColCount: (cellColCount: number) =>
      dispatch({
        type: GameSettingsActionType.UPDATE_COL_COUNT,
        payload: cellColCount,
      }),
    updateCellRadius: (cellRadius: number) =>
      dispatch({
        type: GameSettingsActionType.UPDATE_RADIUS,
        payload: cellRadius,
      }),
    updateBoardWidth: (boardWidth: number) =>
      dispatch({
        type: GameSettingsActionType.UPDATE_BOARD_WIDTH,
        payload: boardWidth,
      }),
    updateBoardHeight: (boardHeight: number) =>
      dispatch({
        type: GameSettingsActionType.UPDATE_BOARD_HEIGHT,
        payload: boardHeight,
      }),
    updateAnimationSpeed: (speed: SpeedSetting) =>
      dispatch({
        type: GameSettingsActionType.UPDATE_SPEED,
        payload: speed,
      }),
  };
};
