import React from 'react';
import GameBoard from '../../components/game-board/GameBoard';
import { BoardCell } from '../../components/cell/Cell';

const cells: BoardCell[] = [
  {
    xPosition: 7,
    yPosition: 1,
  },
];

const Play: React.FC = () => {
  return (
    <div>
      <GameBoard cells={cells}></GameBoard>
    </div>
  );
};

export default Play;
