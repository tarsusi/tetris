import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getNeighborCell } from '../cellUtil';

export default class Tetromino_L extends Tetromino {
  constructor(centerCell: BoardCell) {
    super();

    this.cells = [
      centerCell,
      getNeighborCell(centerCell, 0, 1),
      getNeighborCell(centerCell, 0, 2),
      getNeighborCell(centerCell, 1, 2),
    ];
  }
}
