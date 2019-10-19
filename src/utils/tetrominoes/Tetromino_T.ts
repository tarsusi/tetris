import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getNeighborCell } from '../cellUtil';

export default class Tetromino_T extends Tetromino {
  constructor(centerCell: BoardCell) {
    super();

    this.cells = [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, -1, 0),
      getNeighborCell(centerCell, 0, 1),
    ];
  }
}
