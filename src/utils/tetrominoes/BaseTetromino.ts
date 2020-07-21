import { IBoardCell } from 'types/interfaces/IBoardCell';

export default abstract class BaseTetromino {
  abstract cellStates(centerCell: IBoardCell): IBoardCell[][];
  abstract stateCount: number;

  protected cells: IBoardCell[] = [];
  protected centerCell: IBoardCell;
  protected currentState: number = 0;

  constructor(centerCell: IBoardCell) {
    this.centerCell = centerCell;
  }

  public getCells(): IBoardCell[] {
    return this.cells.map((cell) => ({ ...cell }));
  }

  public getNextStateCells(): IBoardCell[] {
    const nextState = (this.currentState + 1) % this.stateCount;

    return this.cellStates(this.centerCell)[nextState];
  }

  public moveTetromino(xMovement: number, yMovement: number): BaseTetromino {
    this.cells = this.cells.map(({ xPosition, yPosition, ...others }) => ({
      ...others,
      xPosition: xPosition + xMovement,
      yPosition: yPosition + yMovement,
    }));

    this.centerCell = {
      ...this.centerCell,
      xPosition: this.centerCell.xPosition + xMovement,
      yPosition: this.centerCell.yPosition + yMovement,
    };

    return this;
  }

  public nextState() {
    this.currentState = (this.currentState + 1) % this.stateCount;
    this.cells = this.cellStates(this.centerCell)[this.currentState];

    return this;
  }
}
