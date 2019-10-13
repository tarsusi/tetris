import React from 'react';
import './game-board.scss';
import { Cell, BoardCell } from '../cell/Cell';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CELL_COL_COUNT,
  CELL_ROW_COUNT,
} from '../../constants/generalConstants';

interface GameBoardProps {
  cells?: BoardCell[];
}

const generateSeparators = () => {
  const separators = [];

  for (
    let index = 0;
    index < BOARD_WIDTH;
    index += BOARD_WIDTH / CELL_COL_COUNT
  ) {
    separators.push(
      <line
        key={`vertical-separator-${index}`}
        className="separator"
        x1={index}
        y1={0}
        x2={index}
        y2={BOARD_HEIGHT}
      ></line>,
    );
  }

  for (
    let index = 0;
    index < BOARD_HEIGHT;
    index += BOARD_HEIGHT / CELL_ROW_COUNT
  ) {
    separators.push(
      <line
        key={`horizontal-separator-${index}`}
        className="separator"
        x1={0}
        y1={index}
        x2={BOARD_WIDTH}
        y2={index}
      ></line>,
    );
  }

  return separators;
};

const renderCells = (cells?: BoardCell[]) => {
  return (
    cells &&
    cells.map(({ xPosition, yPosition, color }) => (
      <Cell
        key={`board-cell-${xPosition}-${yPosition}`}
        xPosition={xPosition}
        yPosition={yPosition}
        color={color}
      ></Cell>
    ))
  );
};

const GameBoard: React.FC<GameBoardProps> = ({ cells }) => {
  return (
    <svg id="game-board" height={BOARD_HEIGHT} width={BOARD_WIDTH}>
      <g id="separators">{generateSeparators()}</g>
      <g id="objects">{renderCells(cells)}</g>
    </svg>
  );
};

export default GameBoard;
