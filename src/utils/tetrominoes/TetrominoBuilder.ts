import BaseTetromino from './BaseTetromino';
import Tetromino_T from './Tetromino_T';
import Tetromino_D from './Tetromino_D';
import Tetromino_S from './Tetromino_S';
import Tetromino_Z from './Tetromino_Z';
import Tetromino_I from './Tetromino_I';
import Tetromino_L from './Tetromino_L';
import Tetromino_J from './Tetromino_J';

import { IBoardCell } from 'types/interfaces/IBoardCell';

import { TETROMINO_COLOR_PALLETTE } from 'constants/generalConstants';

export default class TetrominoBuilder {
  private tetromino: BaseTetromino;

  constructor(centerCell: IBoardCell) {
    this.tetromino = this.buildNextTetromino({
      ...centerCell,
      color:
        TETROMINO_COLOR_PALLETTE[
          Math.round(Math.random() * (TETROMINO_COLOR_PALLETTE.length - 1))
        ],
    });
  }

  private buildNextTetromino(centerCell: IBoardCell): BaseTetromino {
    const tetrominoes: BaseTetromino[] = [
      new Tetromino_T(centerCell),
      new Tetromino_D(centerCell),
      new Tetromino_S(centerCell),
      new Tetromino_Z(centerCell),
      new Tetromino_I(centerCell),
      new Tetromino_L(centerCell),
      new Tetromino_J(centerCell),
    ];

    // TODO: create with also randomized state
    return tetrominoes[Math.round(Math.random() * (tetrominoes.length - 1))];
  }

  public getTetromino() {
    return this.tetromino;
  }
}
