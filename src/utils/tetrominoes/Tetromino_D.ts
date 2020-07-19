import { BoardCell } from 'components/cell/Cell';

import Tetromino from './BaseTetromino';
import { getNeighborCell } from 'utils/cellUtil';

export default class Tetromino_D extends Tetromino {
  cellStates = (centerCell: BoardCell) => [
    [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, 0, 1),
      getNeighborCell(centerCell, 1, 1),
    ],
  ];

  stateCount = 1;

  constructor(centerCell: BoardCell) {
    super(centerCell);

    this.cells = this.cellStates(this.centerCell)[this.currentState];
  }
}
