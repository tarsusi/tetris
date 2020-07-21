import { SpeedSetting } from 'types';

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
