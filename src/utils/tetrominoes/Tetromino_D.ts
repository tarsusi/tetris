import { IBoardCell } from 'types/interfaces/IBoardCell';

import Tetromino from './BaseTetromino';
import { getNeighborCell } from 'utils/cellUtil';

export default class Tetromino_D extends Tetromino {
  cellStates = (centerCell: IBoardCell) => [
    [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, 0, 1),
      getNeighborCell(centerCell, 1, 1),
    ],
  ];

  stateCount = 1;

  constructor(centerCell: IBoardCell) {
    super(centerCell);

    this.cells = this.cellStates(this.centerCell)[this.currentState];
  }
}
