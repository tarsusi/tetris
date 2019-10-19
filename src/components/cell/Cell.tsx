import React from 'react';
import {
  CELL_WIDTH,
  CELL_HEIGHT,
  CELL_RADIUS,
} from '../../constants/generalConstants';
import './cell.scss';

export interface BoardCell {
  xPosition: number;
  yPosition: number;
  isMoving?: boolean;
  color?: string;
}

export interface CellProps extends BoardCell {}

export const Cell: React.FC<CellProps> = ({
  xPosition,
  yPosition,
  color = 'red',
}) => {
  return (
    <rect
      className="game-cell"
      width={CELL_WIDTH}
      height={CELL_HEIGHT}
      x={xPosition * CELL_WIDTH}
      y={yPosition * CELL_HEIGHT}
      rx={CELL_RADIUS}
      ry={CELL_RADIUS}
      fill={color}
    ></rect>
  );
};
