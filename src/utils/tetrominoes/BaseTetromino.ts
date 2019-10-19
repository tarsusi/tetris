import { BoardCell } from '../../components/cell/Cell';

export default abstract class BaseTetromino {
  protected cells: BoardCell[] = [];

  public getCells() {
    return this.cells.map((cell) => ({ ...cell }));
  }

  public moveTetromino(xMovement: number, yMovement: number): BaseTetromino {
    this.cells = this.cells.map(({ xPosition, yPosition, ...others }) => ({
      ...others,
      xPosition: xPosition + xMovement,
      yPosition: yPosition + yMovement,
    }));

    return this;
  }
}
