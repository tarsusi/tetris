import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getRightCell, getLowerCell } from '../cellUtil';

export default class Tetromino_S extends Tetromino {
  constructor(centerCell: BoardCell) {
    super();

    this.cells = [
      centerCell,
      getRightCell(centerCell),
      getRightCell(getLowerCell(centerCell)),
      getRightCell(getRightCell(getLowerCell(centerCell))),
    ];
  }
}
