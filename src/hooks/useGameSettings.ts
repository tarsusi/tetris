import { useReducer, createContext } from 'react';
import { IGameSettings } from 'types/interfaces/IGameSettings';
import { SpeedSetting } from 'types';
import { GameSettingsActionEnum } from 'types/enums/GameSettingsActionEnum';

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

function gameSettingsReducer(
  state: IGameSettings,
  action:
    | { type: GameSettingsActionEnum; payload?: number }
    | { type: GameSettingsActionEnum; payload?: SpeedSetting },
): IGameSettings {
  switch (action.type) {
    case GameSettingsActionEnum.UPDATE_ROW_COUNT:
      return {
        ...state,
        cellRowCount: action.payload as number,
        cellHeight: state.boardHeight / (action.payload as number),
      };
    case GameSettingsActionEnum.UPDATE_COL_COUNT:
      return {
        ...state,
        cellColCount: action.payload as number,
        cellWidth: state.boardWidth / (action.payload as number),
      };
    case GameSettingsActionEnum.UPDATE_SPEED:
      return {
        ...state,
        speed: action.payload as SpeedSetting,
      };
    case GameSettingsActionEnum.UPDATE_RADIUS:
      return {
        ...state,
        cellRadius: action.payload as number,
      };
    case GameSettingsActionEnum.UPDATE_BOARD_WIDTH:
      return {
        ...state,
        boardWidth: action.payload as number,
        cellWidth: (action.payload as number) / state.cellColCount,
      };
    case GameSettingsActionEnum.UPDATE_BOARD_HEIGHT:
      return {
        ...state,
        boardHeight: action.payload as number,
        cellHeight: (action.payload as number) / state.cellRowCount,
      };
    case GameSettingsActionEnum.RESET_SETTINGS:
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
        type: GameSettingsActionEnum.RESET_SETTINGS,
      });
    },
    updateRowCount: (cellRowCount: number) =>
      dispatch({
        type: GameSettingsActionEnum.UPDATE_ROW_COUNT,
        payload: cellRowCount,
      }),
    updateColCount: (cellColCount: number) =>
      dispatch({
        type: GameSettingsActionEnum.UPDATE_COL_COUNT,
        payload: cellColCount,
      }),
    updateCellRadius: (cellRadius: number) =>
      dispatch({
        type: GameSettingsActionEnum.UPDATE_RADIUS,
        payload: cellRadius,
      }),
    updateBoardWidth: (boardWidth: number) =>
      dispatch({
        type: GameSettingsActionEnum.UPDATE_BOARD_WIDTH,
        payload: boardWidth,
      }),
    updateBoardHeight: (boardHeight: number) =>
      dispatch({
        type: GameSettingsActionEnum.UPDATE_BOARD_HEIGHT,
        payload: boardHeight,
      }),
    updateAnimationSpeed: (speed: SpeedSetting) =>
      dispatch({
        type: GameSettingsActionEnum.UPDATE_SPEED,
        payload: speed,
      }),
  };
};
