import React, { useState, useLayoutEffect, useRef, useContext } from 'react';

import { Cell, BoardCell } from 'components/cell/Cell';
import BaseTetromino from 'utils/tetrominoes/BaseTetromino';
import './game-board.scss';
import { GameSettingsContext } from 'hooks/useGameSettings';

interface GameBoardProps {
  cells?: BoardCell[];
  showGrid?: boolean;
  tetromino?: BaseTetromino;
}

const generateSeparators = (
  boardWidth: number,
  boardHeight: number,
  cellColCount: number,
  cellRowCount: number,
) => {
  const separators = [];

  for (let index = 0; index < boardWidth; index += boardWidth / cellColCount) {
    separators.push(
      <line
        key={`vertical-separator-${index}`}
        className="separator"
        x1={index}
        y1={0}
        x2={index}
        y2={boardHeight}
      ></line>,
    );
  }

  for (
    let index = 0;
    index < boardHeight;
    index += boardHeight / cellRowCount
  ) {
    separators.push(
      <line
        key={`horizontal-separator-${index}`}
        className="separator"
        x1={0}
        y1={index}
        x2={boardWidth}
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
  const { gameSettings } = useContext(GameSettingsContext);
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
      viewBox={`0 0 ${gameSettings.boardWidth} ${gameSettings.boardHeight}`}
      id="game-board"
    >
      {showGrid && (
        <g id="separators">
          {generateSeparators(
            gameSettings.boardWidth,
            gameSettings.boardHeight,
            gameSettings.cellColCount,
            gameSettings.cellRowCount,
          )}
        </g>
      )}
      <g id="objects">
        {tetromino && renderCells(tetromino.getCells())}
        {renderCells(cells)}
      </g>
    </svg>
  );
};

export default GameBoard;
