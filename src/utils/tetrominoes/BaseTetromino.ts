import { BoardCell } from '../../components/cell/Cell';

export default class BaseTetromino {
  protected cells: BoardCell[] = [];

  public getCells() {
    return this.cells.map((cell) => ({ ...cell }));
  }

  public moveLeft() {
    this.cells = this.cells.map((cell) => ({
      xPosition: cell.xPosition - 1,
      yPosition: cell.yPosition,
    }));
  }

  public moveRight() {
    this.cells = this.cells.map((cell) => ({
      xPosition: cell.xPosition + 1,
      yPosition: cell.yPosition,
    }));
  }

  public moveDown() {
    this.cells = this.cells.map((cell) => ({
      xPosition: cell.xPosition,
      yPosition: cell.yPosition + 1,
    }));
  }
}
