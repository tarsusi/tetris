import { BoardCell } from '../components/cell/Cell';
import BaseTetromino from './tetrominoes/BaseTetromino';
import { CELL_COL_COUNT, CELL_ROW_COUNT } from '../constants/generalConstants';
import TetrominoBuilder from './tetrominoes/TetrominoBuilder';

export const generateTetromino = (): BaseTetromino => {
  const builder = new TetrominoBuilder({
    xPosition: Math.floor(CELL_COL_COUNT / 2),
    yPosition: 0,
  });

  return builder.getTetromino();
};

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

export const getNeighborCells = (
  cells: BoardCell[],
  xMovement: number,
  yMovement: number,
): BoardCell[] => {
  return cells.map(
    ({ xPosition, yPosition, ...others }): BoardCell => ({
      ...others,
      xPosition: xPosition + xMovement,
      yPosition: yPosition + yMovement,
    }),
  );
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
  upcomingCells: BoardCell[],
  cells: BoardCell[],
): boolean => {
  const anyCollision: boolean = upcomingCells.some((upcomingCell) =>
    cellsIncludes(cells, upcomingCell),
  );

  const isAtBottomEdge: boolean = upcomingCells.some(
    (upcomingCell) => upcomingCell.yPosition === CELL_ROW_COUNT,
  );

  const isExceedRightSide: boolean = upcomingCells.some(
    (upcomingCell) => upcomingCell.xPosition >= CELL_COL_COUNT,
  );

  const isExceedLeftSide: boolean = upcomingCells.some(
    (upcomingCell) => upcomingCell.xPosition < 0,
  );

  return (
    anyCollision || isAtBottomEdge || isExceedRightSide || isExceedLeftSide
  );
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

export const clearFullRows = (cells: BoardCell[]): BoardCell[] => {
  const colCounts = Array(CELL_ROW_COUNT).fill(0);

  for (let cell of cells) {
    colCounts[cell.yPosition]++;
  }

  for (let row = 0; row < CELL_ROW_COUNT; row++) {
    if (colCounts[row] === CELL_COL_COUNT) {
      cells = cells
        .filter((cell) => cell.yPosition !== row)
        .map(
          ({ yPosition, ...others }): BoardCell => ({
            ...others,
            yPosition: yPosition < row ? yPosition + 1 : yPosition,
          }),
        );
    }
  }

  return cells;
};

export const is_touch_device = () => {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query: string) {
    return window.matchMedia(query).matches;
  };

  if ('ontouchstart' in window) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
};
