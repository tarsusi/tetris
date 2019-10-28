import React, { useState, useLayoutEffect, useRef } from 'react';

import { Cell, BoardCell } from '../cell/Cell';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CELL_COL_COUNT,
  CELL_ROW_COUNT,
} from '../../constants/generalConstants';
import BaseTetromino from '../../utils/tetrominoes/BaseTetromino';

import './game-board.scss';

interface GameBoardProps {
  cells?: BoardCell[];
  showGrid?: boolean;
  tetromino?: BaseTetromino;
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

const GameBoard: React.FC<GameBoardProps> = ({
  cells,
  showGrid,
  tetromino,
}) => {
  let svgRef: any = useRef(null);
  const [[width, height], setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = () => {
      const aspectRatio = 4 / 3;
      const pageMargin = 24;
      const wH = window.innerHeight;
      const gameBoardHeight = wH - 160;

      let newWidth = gameBoardHeight / aspectRatio;
      let newHeight = gameBoardHeight;
      if (newWidth > window.innerWidth - pageMargin * 2) {
        newWidth = window.innerWidth - pageMargin * 2;
        newHeight = newWidth * aspectRatio;
      }

      if (svgRef && svgRef.current) {
        setSize([newWidth, newHeight]);
      } else {
        setSize([0, 0]);
      }
    };

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, [svgRef]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
      id="game-board"
    >
      {showGrid && <g id="separators">{generateSeparators()}</g>}
      <g id="objects">
        {tetromino && renderCells(tetromino.getCells())}
        {renderCells(cells)}
      </g>
    </svg>
  );
};

export default GameBoard;
