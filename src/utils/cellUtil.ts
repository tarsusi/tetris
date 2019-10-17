import { BoardCell } from '../components/cell/Cell';
import BaseTetromino from './tetrominoes/BaseTetromino';
import { CELL_COL_COUNT, CELL_ROW_COUNT } from '../constants/generalConstants';

export const getLeftCell = (cell: BoardCell): BoardCell => {
  return {
    xPosition: cell.xPosition - 1,
    yPosition: cell.yPosition,
  };
};

export const getRightCell = (cell: BoardCell): BoardCell => {
  return {
    xPosition: cell.xPosition + 1,
    yPosition: cell.yPosition,
  };
};

export const getUpperCell = (cell: BoardCell): BoardCell => {
  return {
    xPosition: cell.xPosition,
    yPosition: cell.yPosition - 1,
  };
};

export const getLowerCell = (cell: BoardCell): BoardCell => {
  return {
    xPosition: cell.xPosition,
    yPosition: cell.yPosition + 1,
  };
};

export const moveLeft = (tetromino: BaseTetromino): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.xPosition !== 0)) {
    tetromino.moveLeft();
  }

  return tetromino;
};

export const moveRight = (tetromino: BaseTetromino): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.xPosition < CELL_COL_COUNT - 1)) {
    tetromino.moveRight();
  }

  return tetromino;
};

export const moveDown = (tetromino: BaseTetromino): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.yPosition < CELL_ROW_COUNT - 1)) {
    tetromino.moveDown();
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
