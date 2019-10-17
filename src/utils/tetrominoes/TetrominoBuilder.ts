import BaseTetromino from './BaseTetromino';
import Tetromino_T from './Tetromino_T';
import Tetromino_D from './Tetromino_D';
import Tetromino_S from './Tetromino_S';
import Tetromino_I from './Tetromino_I';
import Tetromino_L from './Tetromino_L';
import { BoardCell } from '../../components/cell/Cell';

export default class TetrominoBuilder {
  private tetromino: BaseTetromino;

  constructor(centerCell: BoardCell) {
    this.tetromino = this.buildNextTetromino(centerCell);
  }

  private buildNextTetromino(centerCell: BoardCell): BaseTetromino {
    const tetrominoes: BaseTetromino[] = [
      new Tetromino_T(centerCell),
      new Tetromino_D(centerCell),
      new Tetromino_S(centerCell),
      new Tetromino_I(centerCell),
      new Tetromino_L(centerCell),
    ];

    return tetrominoes[Math.round(Math.random() * (tetrominoes.length - 1))];
  }

  public getTetromino() {
    return this.tetromino;
  }
}
