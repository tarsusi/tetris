import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getLowerCell } from '../cellUtil';

export default class Tetromino_I extends Tetromino {
  constructor(centerCell: BoardCell) {
    super();

    this.cells = [
      centerCell,
      getLowerCell(centerCell),
      getLowerCell(getLowerCell(centerCell)),
      getLowerCell(getLowerCell(getLowerCell(centerCell))),
    ];
  }
}
