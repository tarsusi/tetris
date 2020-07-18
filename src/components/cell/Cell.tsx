import React from 'react';
import './cell.scss';
import { useGameSettings } from '../../hooks/useGameSettings';

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
  const {
    gameSettings: { cellWidth, cellHeight, cellRadius },
  } = useGameSettings();
  return (
    <rect
      className="game-cell"
      width={cellWidth}
      height={cellHeight}
      x={xPosition * cellWidth}
      y={yPosition * cellHeight}
      rx={cellRadius}
      ry={cellRadius}
      fill={color}
    ></rect>
  );
};
