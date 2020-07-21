import { IBoardCell } from './IBoardCell';
import BaseTetromino from 'utils/tetrominoes/BaseTetromino';

export interface IPlayState {
  cells: IBoardCell[];
  isGameOver: boolean;
  isGameStart: boolean;
  pressedKeys: String[];
  tetromino?: BaseTetromino;
}
