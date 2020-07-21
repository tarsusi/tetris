import React, { useContext } from 'react';
import './cell.scss';
import { GameSettingsContext } from 'hooks/useGameSettings';
import { ICellProps } from 'types/interfaces/ICellProps';

export const Cell: React.FC<ICellProps> = ({
  xPosition,
  yPosition,
  color = 'red',
}) => {
  const {
    gameSettings: { cellWidth, cellHeight, cellRadius },
  } = useContext(GameSettingsContext);
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
