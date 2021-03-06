import Tetromino from './BaseTetromino';
import { IBoardCell } from 'types/interfaces/IBoardCell';
import { getNeighborCell } from 'utils/cellUtil';

export default class Tetromino_I extends Tetromino {
  cellStates = (centerCell: IBoardCell) => [
    [
      centerCell,
      getNeighborCell(centerCell, 0, -1),
      getNeighborCell(centerCell, 0, 1),
      getNeighborCell(centerCell, 0, 2),
    ],
    [
      getNeighborCell(centerCell, -1, 0),
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, 2, 0),
    ],
  ];

  stateCount = 2;

  constructor(centerCell: IBoardCell) {
    super(centerCell);

    this.cells = this.cellStates(this.centerCell)[this.currentState];
  }
}
