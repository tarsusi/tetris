import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getNeighborCell } from '../cellUtil';

export default class Tetromino_I extends Tetromino {
  private states?: [BoardCell, BoardCell, BoardCell, BoardCell][];

  constructor(centerCell: BoardCell) {
    super();

    this.cells = [
      centerCell,
      getNeighborCell(centerCell, 0, 1),
      getNeighborCell(centerCell, 0, 2),
      getNeighborCell(centerCell, 0, 3),
    ];
  }
}
