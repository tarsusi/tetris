import BaseTetromino from 'utils/tetrominoes/BaseTetromino';
import { IBoardCell } from 'types/interfaces/IBoardCell';

export interface IGameBoardProps {
  cells?: IBoardCell[];
  showGrid?: boolean;
  tetromino?: BaseTetromino;
}
