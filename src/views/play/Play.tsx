import React, { Component } from 'react';

import GameBoard from '../../components/game-board/GameBoard';
import ControllerManager from '../../components/controller-manager/ControllerManager';
import { BoardCell } from '../../components/cell/Cell';

import {
  CELL_ROW_COUNT,
  CELL_COL_COUNT,
  GAME_ANIMATION_RATE,
} from '../../constants/generalConstants';

const cells: BoardCell[] = [];

interface Props {}
interface State {
  cells: BoardCell[];
  lastTime: number;
  animationFrame: number;
  playableCell: BoardCell;
  pressedKeys: String[];
}

class Play extends Component<Props, State> {
  state = {
    playableCell: {
      xPosition: 7,
      yPosition: -1,
    },
    lastTime: 0,
    animationFrame: 0,
    cells: [],
    pressedKeys: [],
  };

  componentDidMount() {
    this.gameLoop(-1);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.state.animationFrame);
  }

  gameLoop = (time: number) => {
    this.setState(({ playableCell, lastTime, ...others }) => {
      if (!lastTime || time - lastTime >= GAME_ANIMATION_RATE) {
        return {
          lastTime: time,
          animationFrame: window.requestAnimationFrame(this.gameLoop),
          playableCell:
            playableCell.yPosition < CELL_ROW_COUNT - 1
              ? {
                  xPosition: playableCell.xPosition,
                  yPosition: playableCell.yPosition + 1,
                }
              : { ...playableCell },
          pressedKeys: [],
        };
      }

      return {
        ...others,
        playableCell,
        lastTime,
        animationFrame: window.requestAnimationFrame(this.gameLoop),
      };
    });
  };

  onKeysChanged = (keys: String[]) => {
    this.setState(({ playableCell }) => ({
      playableCell: this.computeNewPosition(playableCell, keys),
      pressedKeys: keys,
    }));
  };

  computeNewPosition = (playableCell: BoardCell, pressedKeys: String[]) => {
    const xPosition =
      playableCell.xPosition +
      (pressedKeys.includes('ArrowRight') ? 1 : 0) -
      (pressedKeys.includes('ArrowLeft') ? 1 : 0);

    return playableCell.yPosition < CELL_ROW_COUNT - 1
      ? {
          xPosition: Math.min(Math.max(0, xPosition), CELL_COL_COUNT - 1),
          yPosition:
            playableCell.yPosition +
            (pressedKeys.includes('ArrowDown') ? 1 : 0),
        }
      : { ...playableCell };
  };

  render() {
    const { playableCell, pressedKeys } = this.state;

    return (
      <div>
        <ControllerManager
          pressedKeys={pressedKeys}
          onKeysChanged={this.onKeysChanged}
        ></ControllerManager>
        <GameBoard cells={[playableCell, ...cells]}></GameBoard>
      </div>
    );
  }
}

export default Play;
