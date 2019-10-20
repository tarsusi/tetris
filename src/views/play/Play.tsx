import React, { Component } from 'react';

import GameBoard from '../../components/game-board/GameBoard';
import ControllerManager from '../../components/controller-manager/ControllerManager';
import { BoardCell } from '../../components/cell/Cell';

import { GAME_ANIMATION_RATE } from '../../constants/generalConstants';

import BaseTetromino from '../../utils/tetrominoes/BaseTetromino';
import {
  moveDown,
  moveLeft,
  moveRight,
  checkCollision,
  getNeighborCells,
  clearFullRows,
  generateTetromino,
} from '../../utils/cellUtil';

import './play.scss';

interface Props {}
interface State {
  cells: BoardCell[];
  isGameOver: boolean;
  isGameStart: boolean;
  pressedKeys: String[];
  tetromino?: BaseTetromino;
}

class Play extends Component<Props, State> {
  state: State = {
    cells: [],
    isGameOver: false,
    isGameStart: false,
    pressedKeys: [],
    tetromino: undefined,
  };

  lastTime: number = 0;
  animationFrame: number = -1;

  componentDidMount() {
    if (this.state.isGameStart) {
      this.gameLoop(-1);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
  }

  gameLoop = (time: number) => {
    if (!this.lastTime || time - this.lastTime >= GAME_ANIMATION_RATE) {
      this.setState(
        ({ tetromino, cells, isGameStart }) => {
          if (!isGameStart) {
            return null;
          } else {
            let newTetromino = tetromino;
            let gameOver = false;

            if (!newTetromino) {
              newTetromino = generateTetromino();
            }

            if (
              checkCollision(
                getNeighborCells(newTetromino.getCells(), 0, 1),
                cells,
              )
            ) {
              cells = [...cells, ...newTetromino.getCells()];

              newTetromino = generateTetromino();

              if (
                checkCollision(
                  getNeighborCells(newTetromino.getCells(), 0, 0),
                  cells,
                )
              ) {
                newTetromino = undefined;
                gameOver = true;
              }
            } else {
              newTetromino = moveDown(newTetromino);
            }

            return {
              cells: clearFullRows(cells),
              isGameOver: gameOver,
              tetromino: newTetromino,
              pressedKeys: [],
            };
          }
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
    this.setState(
      ({ tetromino }) => {
        if (tetromino) {
          return {
            tetromino: this.computeNewPosition(tetromino, keys),
            pressedKeys: keys,
          };
        }

        return {
          pressedKeys: keys,
        };
      },
      () => {
        if (keys.includes('p') || keys.includes('p')) {
          this.toggleGameStart();
        }
      },
    );
  };

  computeNewPosition = (
    tetromino: BaseTetromino,
    pressedKeys: String[],
  ): BaseTetromino => {
    let newTetromino: BaseTetromino | null = tetromino;

    if (newTetromino) {
      if (
        pressedKeys.includes('ArrowRight') &&
        !checkCollision(
          getNeighborCells(newTetromino.getCells(), 1, 0),
          this.state.cells,
        )
      ) {
        newTetromino = moveRight(tetromino);
      }

      if (
        pressedKeys.includes('ArrowLeft') &&
        !checkCollision(
          getNeighborCells(newTetromino.getCells(), -1, 0),
          this.state.cells,
        )
      ) {
        newTetromino = moveLeft(newTetromino);
      }

      if (
        pressedKeys.includes('ArrowDown') &&
        !checkCollision(
          getNeighborCells(newTetromino.getCells(), 0, 1),
          this.state.cells,
        )
      ) {
        newTetromino = moveDown(newTetromino);
      }

      if (
        pressedKeys.includes('ArrowUp') &&
        !checkCollision(newTetromino.getNextStateCells(), this.state.cells)
      ) {
        newTetromino = tetromino.nextState();
      }
    }

    return newTetromino;
  };

  toggleGameStart = () => {
    this.setState(
      ({ isGameStart }) => ({ isGameStart: !isGameStart }),
      () => {
        if (this.state.isGameStart) {
          this.gameLoop(-1);
        }
      },
    );
  };

  restartGame = () => {
    this.setState(
      {
        cells: [],
        isGameOver: false,
        isGameStart: true,
        pressedKeys: [],
        tetromino: undefined,
      },
      () => {
        this.gameLoop(-1);
      },
    );
  };

  render() {
    const {
      cells,
      pressedKeys,
      tetromino,
      isGameStart,
      isGameOver,
    } = this.state;

    return (
      <div className="play-container">
        {(isGameOver && (
          <div className="game-over-container">
            <div className="game-over-title">Game Over</div>
            <div className="game-over-restart" onClick={this.restartGame}>
              Restart
            </div>
          </div>
        )) || (
          <>
            <div className="start-stop-button-container">
              <div className="start-stop-button-title">
                {!isGameStart ? 'Game Start' : 'Game Pause'}
              </div>
              <div className="start-stop-button" onClick={this.toggleGameStart}>
                <div
                  className={'inner ' + (isGameStart ? 'start' : 'pause')}
                ></div>
              </div>
            </div>
            <ControllerManager
              pressedKeys={pressedKeys}
              onKeysChanged={this.onKeysChanged}
            ></ControllerManager>
            <GameBoard tetromino={tetromino} cells={[...cells]}></GameBoard>
          </>
        )}
      </div>
    );
  }
}

export default Play;
