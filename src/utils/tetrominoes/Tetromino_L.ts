import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getRightCell, getLowerCell } from '../cellUtil';

export default class Tetromino_L extends Tetromino {
  constructor(centerCell: BoardCell) {
    super();

    this.cells = [
      centerCell,
      getLowerCell(centerCell),
      getLowerCell(getLowerCell(centerCell)),
      getRightCell(getLowerCell(getLowerCell(centerCell))),
    ];
  }
}
