import Tetromino from './BaseTetromino';
import { BoardCell } from '../../components/cell/Cell';
import { getNeighborCell } from '../cellUtil';

export default class Tetromino_J extends Tetromino {
  cellStates = (centerCell: BoardCell) => [
    [
      centerCell,
      getNeighborCell(centerCell, 0, -1),
      getNeighborCell(centerCell, 0, 1),
      getNeighborCell(centerCell, -1, 1),
    ],
    [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, 1, 1),
      getNeighborCell(centerCell, -1, 0),
    ],
    [
      centerCell,
      getNeighborCell(centerCell, 0, -1),
      getNeighborCell(centerCell, 1, -1),
      getNeighborCell(centerCell, 0, 1),
    ],
    [
      centerCell,
      getNeighborCell(centerCell, 1, 0),
      getNeighborCell(centerCell, -1, 0),
      getNeighborCell(centerCell, -1, -1),
    ],
  ];

  stateCount = 4;

  constructor(centerCell: BoardCell) {
    super(centerCell);

    this.cells = this.cellStates(this.centerCell)[this.currentState];
  }
}
