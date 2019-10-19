import { BoardCell } from '../components/cell/Cell';
import BaseTetromino from './tetrominoes/BaseTetromino';
import { CELL_COL_COUNT, CELL_ROW_COUNT } from '../constants/generalConstants';

export const getNeighborCell = (
  { xPosition, yPosition, ...others }: BoardCell,
  xMovement: number,
  yMovement: number,
): BoardCell => {
  return {
    ...others,
    xPosition: xPosition + xMovement,
    yPosition: yPosition + yMovement,
  };
};

export const moveLeft = (tetromino: BaseTetromino): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.xPosition !== 0)) {
    tetromino.moveTetromino(-1, 0);
  }

  return tetromino;
};

export const moveRight = (tetromino: BaseTetromino): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.xPosition < CELL_COL_COUNT - 1)) {
    tetromino.moveTetromino(1, 0);
  }

  return tetromino;
};

export const moveDown = (tetromino: BaseTetromino): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.yPosition < CELL_ROW_COUNT - 1)) {
    tetromino.moveTetromino(0, 1);
  }

  return tetromino;
};

export const checkCollision = (
  tetromino: BaseTetromino,
  cells: BoardCell[],
): boolean => {
  const upcomingCells: BoardCell[] = tetromino.getCells().map((cell) => ({
    xPosition: cell.xPosition,
    yPosition: cell.yPosition + 1,
  }));

  const anyCollision: boolean = upcomingCells.some((upcomingCell) =>
    cellsIncludes(cells, upcomingCell),
  );

  const isAtBottomEdge: boolean = upcomingCells.some(
    (upcomingCell) => upcomingCell.yPosition === CELL_ROW_COUNT,
  );

  return anyCollision || isAtBottomEdge;
};

export const cellsIncludes = (
  cells: BoardCell[],
  otherCell: BoardCell,
): boolean => {
  return cells.some(
    (cell) =>
      cell.xPosition === otherCell.xPosition &&
      cell.yPosition === otherCell.yPosition,
  );
};
