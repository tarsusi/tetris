import Tetromino from './BaseTetromino';
import { IBoardCell } from 'types/interfaces/IBoardCell';
import { getNeighborCell } from 'utils/cellUtil';

export default class Tetromino_T extends Tetromino {
  cellStates = (centerCell: IBoardCell) => [
    [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, -1, 0),
      getNeighborCell(centerCell, 0, 1),
    ],
    [
      centerCell,
      getNeighborCell(centerCell, 0, -1),
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, 0, 1),
    ],
    [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, -1, 0),
      getNeighborCell(centerCell, 0, -1),
    ],
    [
      centerCell,
      getNeighborCell(centerCell, 0, -1),
      getNeighborCell(centerCell, -1, 0),
      getNeighborCell(centerCell, 0, 1),
    ],
  ];

  stateCount = 4;

  constructor(centerCell: IBoardCell) {
    super(centerCell);

    this.cells = this.cellStates(this.centerCell)[this.currentState];
  }
}
