import { BoardCell } from '../components/cell/Cell';
import BaseTetromino from './tetrominoes/BaseTetromino';
import TetrominoBuilder from './tetrominoes/TetrominoBuilder';
import { SpeedSetting } from '../hooks/useGameSettings';
import { NORMAL_GAME_SPEED } from '../constants/generalConstants';

export const generateTetromino = (cellColCount: number): BaseTetromino => {
  const builder = new TetrominoBuilder({
    xPosition: Math.floor(cellColCount / 2),
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

export const moveRight = (
  tetromino: BaseTetromino,
  cellColCount: number,
): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.xPosition < cellColCount - 1)) {
    tetromino.moveTetromino(1, 0);
  }

  return tetromino;
};

export const moveDown = (
  tetromino: BaseTetromino,
  cellRowCount: number,
): BaseTetromino => {
  const cells = tetromino.getCells();

  if (cells.every((cell) => cell.yPosition < cellRowCount - 1)) {
    tetromino.moveTetromino(0, 1);
  }

  return tetromino;
};

export const checkCollision = (
  upcomingCells: BoardCell[],
  cells: BoardCell[],
  cellRowCount: number,
  cellColCount: number,
): boolean => {
  const anyCollision: boolean = upcomingCells.some((upcomingCell) =>
    cellsIncludes(cells, upcomingCell),
  );

  const isAtBottomEdge: boolean = upcomingCells.some(
    (upcomingCell) => upcomingCell.yPosition === cellRowCount,
  );

  const isExceedRightSide: boolean = upcomingCells.some(
    (upcomingCell) => upcomingCell.xPosition >= cellColCount,
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

export const clearFullRows = (
  cells: BoardCell[],
  cellRowCount: number,
  cellColCount: number,
): BoardCell[] => {
  const colCounts = Array(cellRowCount).fill(0);

  for (let cell of cells) {
    colCounts[cell.yPosition]++;
  }

  for (let row = 0; row < cellRowCount; row++) {
    if (colCounts[row] === cellColCount) {
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
  var mq = function (query: string) {
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

export const toGameSpeed = (speed: SpeedSetting) => {
  if (speed === 'slow') {
    return NORMAL_GAME_SPEED * 2;
  } else if (speed === 'normal') {
    return NORMAL_GAME_SPEED;
  }

  return NORMAL_GAME_SPEED / 2;
};
