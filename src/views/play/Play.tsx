import React, { Component } from 'react';

import GameBoard from 'components/game-board/GameBoard';
import KeyboardManager from 'components/keyboard-manager/KeyboardManager';

import BaseTetromino from 'utils/tetrominoes/BaseTetromino';
import {
  moveDown,
  moveLeft,
  moveRight,
  checkCollision,
  getNeighborCells,
  clearFullRows,
  generateTetromino,
  toGameSpeed,
} from 'utils/cellUtil';

import './play.scss';
import { SpeedSetting } from 'types';
import { IPlayProps } from 'types/interfaces/IPlayProps';
import { IPlayState } from 'types/interfaces/IPlayState';

class Play extends Component<IPlayProps, IPlayState> {
  state: IPlayState = {
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
      this.gameLoop(-1, this.props.speed);
    }
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrame);
  }

  gameLoop = (time: number, speed: SpeedSetting) => {
    if (!this.lastTime || time - this.lastTime >= toGameSpeed(speed)) {
      this.setState(
        ({ tetromino, cells, isGameStart }) => {
          if (!isGameStart) {
            return null;
          } else {
            let newTetromino = tetromino;
            let gameOver = false;

            if (!newTetromino) {
              newTetromino = generateTetromino(this.props.cellColCount);
            }

            if (
              checkCollision(
                getNeighborCells(newTetromino.getCells(), 0, 1),
                cells,
                this.props.cellRowCount,
                this.props.cellColCount,
              )
            ) {
              cells = [...cells, ...newTetromino.getCells()];

              newTetromino = generateTetromino(this.props.cellColCount);

              if (
                checkCollision(
                  getNeighborCells(newTetromino.getCells(), 0, 0),
                  cells,
                  this.props.cellRowCount,
                  this.props.cellColCount,
                )
              ) {
                newTetromino = undefined;
                gameOver = true;
              }
            } else {
              newTetromino = moveDown(newTetromino, this.props.cellRowCount);
            }

            return {
              cells: clearFullRows(
                cells,
                this.props.cellRowCount,
                this.props.cellColCount,
              ),
              isGameOver: gameOver,
              tetromino: newTetromino,
              pressedKeys: [],
            };
          }
        },
        () => {
          this.lastTime = time;
          this.animationFrame = window.requestAnimationFrame((time) =>
            this.gameLoop(time, this.props.speed),
          );
        },
      );
    } else {
      this.animationFrame = window.requestAnimationFrame((time) =>
        this.gameLoop(time, this.props.speed),
      );
    }
  };

  onKeysChanged = (keys: String[], speed: SpeedSetting) => {
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
          this.toggleGameStart(speed);
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
          this.props.cellRowCount,
          this.props.cellColCount,
        )
      ) {
        newTetromino = moveRight(tetromino, this.props.cellColCount);
      }

      if (
        pressedKeys.includes('ArrowLeft') &&
        !checkCollision(
          getNeighborCells(newTetromino.getCells(), -1, 0),
          this.state.cells,
          this.props.cellRowCount,
          this.props.cellColCount,
        )
      ) {
        newTetromino = moveLeft(newTetromino);
      }

      if (
        pressedKeys.includes('ArrowDown') &&
        !checkCollision(
          getNeighborCells(newTetromino.getCells(), 0, 1),
          this.state.cells,
          this.props.cellRowCount,
          this.props.cellColCount,
        )
      ) {
        newTetromino = moveDown(newTetromino, this.props.cellRowCount);
      }

      if (
        pressedKeys.includes('ArrowUp') &&
        !checkCollision(
          newTetromino.getNextStateCells(),
          this.state.cells,
          this.props.cellRowCount,
          this.props.cellColCount,
        )
      ) {
        newTetromino = tetromino.nextState();
      }
    }

    return newTetromino;
  };

  toggleGameStart = (speed: SpeedSetting) => {
    this.setState(
      ({ isGameStart }) => ({ isGameStart: !isGameStart }),
      () => {
        if (this.state.isGameStart) {
          this.gameLoop(-1, speed);
        }
      },
    );
  };

  restartGame = (speed: SpeedSetting) => {
    this.setState(
      {
        cells: [],
        isGameOver: false,
        isGameStart: true,
        pressedKeys: [],
        tetromino: undefined,
      },
      () => {
        this.gameLoop(-1, speed);
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
            <div
              className="game-over-restart"
              onClick={() => this.restartGame(this.props.speed)}
            >
              Restart
            </div>
          </div>
        )) || (
          <>
            <div className="start-stop-button-container">
              <div className="start-stop-button-title">
                {!isGameStart ? 'Game Start' : 'Game Pause'}
              </div>
              <div
                className="start-stop-button"
                onClick={() => this.toggleGameStart(this.props.speed)}
              >
                <div
                  className={'inner ' + (isGameStart ? 'start' : 'pause')}
                ></div>
              </div>
            </div>
            <KeyboardManager
              pressedKeys={pressedKeys}
              onKeysChanged={(key) => this.onKeysChanged(key, this.props.speed)}
            ></KeyboardManager>
            <GameBoard tetromino={tetromino} cells={[...cells]}></GameBoard>
          </>
        )}
      </div>
    );
  }
}

export default Play;
