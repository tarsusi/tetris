import React, { Component } from 'react';

import GameBoard from '../../components/game-board/GameBoard';
import ControllerManager from '../../components/controller-manager/ControllerManager';
import { BoardCell } from '../../components/cell/Cell';

import {
  CELL_COL_COUNT,
  GAME_ANIMATION_RATE,
} from '../../constants/generalConstants';

import TetrominoBuilder from '../../utils/tetrominoes/TetrominoBuilder';
import BaseTetromino from '../../utils/tetrominoes/BaseTetromino';
import {
  moveDown,
  moveLeft,
  moveRight,
  checkCollision,
} from '../../utils/cellUtil';

interface Props {}
interface State {
  cells: BoardCell[];
  tetromino?: BaseTetromino;
  pressedKeys: String[];
}

class Play extends Component<Props, State> {
  state = {
    lastTime: 0,
    animationFrame: 0,
    cells: [],
    tetromino: undefined,
    pressedKeys: [],
  };

  lastTime: number = 0;
  animationFrame: number = -1;

  componentDidMount() {
    this.gameLoop(-1);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
  }

  gameLoop = (time: number) => {
    if (!this.lastTime || time - this.lastTime >= GAME_ANIMATION_RATE) {
      this.setState(
        ({ tetromino, cells }) => {
          const builder = new TetrominoBuilder({
            xPosition: Math.floor(CELL_COL_COUNT / 2),
            yPosition: 0,
          });

          let newTetromino = tetromino;

          if (!newTetromino) {
            newTetromino = builder.getTetromino();
          }

          if (checkCollision(newTetromino, cells)) {
            cells = [...cells, ...newTetromino.getCells()];

            const builder = new TetrominoBuilder({
              xPosition: Math.floor(CELL_COL_COUNT / 2),
              yPosition: 0,
            });

            newTetromino = builder.getTetromino();
          } else {
            newTetromino = moveDown(newTetromino);
          }

          return {
            cells,
            tetromino: newTetromino,
            pressedKeys: [],
          };
        },
        () => {
          this.lastTime = time;
          this.animationFrame = window.requestAnimationFrame(this.gameLoop);
        },
      );
    } else {
      this.animationFrame = window.requestAnimationFrame(this.gameLoop);
    }
  };

  onKeysChanged = (keys: String[]) => {
    // TODO: you also need to check collision here
    this.setState(({ tetromino }) => {
      if (tetromino) {
        return {
          tetromino: this.computeNewPosition(tetromino, keys),
          pressedKeys: keys,
        };
      }

      return {
        pressedKeys: keys,
      };
    });
  };

  computeNewPosition = (
    tetromino: BaseTetromino,
    pressedKeys: String[],
  ): BaseTetromino => {
    let newTetromino: BaseTetromino | null = tetromino;
    if (tetromino) {
      if (pressedKeys.includes('ArrowRight')) {
        newTetromino = moveRight(tetromino);
      }

      if (pressedKeys.includes('ArrowLeft')) {
        newTetromino = moveLeft(newTetromino);
      }

      if (pressedKeys.includes('ArrowDown')) {
        newTetromino = moveDown(newTetromino);
      }

      if (pressedKeys.includes('ArrowUp')) {
        newTetromino = tetromino.nextState();
      }
    }

    return newTetromino;
  };

  render() {
    const { cells, pressedKeys, tetromino } = this.state;

    return (
      <div>
        <ControllerManager
          pressedKeys={pressedKeys}
          onKeysChanged={this.onKeysChanged}
        ></ControllerManager>
        <GameBoard tetromino={tetromino} cells={[...cells]}></GameBoard>
      </div>
    );
  }
}

export default Play;
