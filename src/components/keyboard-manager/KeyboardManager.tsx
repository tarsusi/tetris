import React, { Component } from 'react';

import './keyboard-manager.scss';
import { is_touch_device } from 'utils/cellUtil';
import { IKeyboardManagerProps } from 'types/interfaces/IKeyboarManagerProps';
import { IKeyboardManagerState } from 'types/interfaces/IKeyboarManagerState';

class KeyboardManager extends Component<
  IKeyboardManagerProps,
  IKeyboardManagerState
> {
  state = {
    pressedKey: '',
  };

  private middleEl: React.RefObject<HTMLInputElement>;

  constructor(props: IKeyboardManagerProps) {
    super(props);

    this.middleEl = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyDown = ({ key }: KeyboardEvent) => {
    const { pressedKeys } = this.props;

    this.props.onKeysChanged(
      pressedKeys.includes(key) ? pressedKeys : [...pressedKeys, key],
    );
  };

  onKeyUp = ({ key }: KeyboardEvent) => {
    const { pressedKeys } = this.props;

    this.props.onKeysChanged(
      pressedKeys.filter((pressedKey) => pressedKey !== key),
    );
  };

  onClickButton = (event: React.TouchEvent<HTMLElement>) => {
    const middleElBounds = (this.middleEl
      .current as HTMLDivElement).getBoundingClientRect();

    const middleXPos = middleElBounds.left + middleElBounds.width / 2;
    const middleYPos = middleElBounds.top + middleElBounds.height / 2;

    const xPosDifference = event.touches[0].clientX - middleXPos;
    const yPosDifference = event.touches[0].clientY - middleYPos;
    let pressedKey = '';

    if (xPosDifference > 0) {
      pressedKey = 'ArrowRight';

      if (Math.abs(yPosDifference) > xPosDifference && yPosDifference > 0) {
        pressedKey = 'ArrowDown';
      } else if (
        Math.abs(yPosDifference) > xPosDifference &&
        yPosDifference < 0
      ) {
        pressedKey = 'ArrowUp';
      }
    } else if (xPosDifference < 0) {
      pressedKey = 'ArrowLeft';

      if (Math.abs(yPosDifference) > -xPosDifference && yPosDifference > 0) {
        pressedKey = 'ArrowDown';
      } else if (
        Math.abs(yPosDifference) > -xPosDifference &&
        yPosDifference < 0
      ) {
        pressedKey = 'ArrowUp';
      }
    }

    this.setState({ pressedKey }, () => {
      const { pressedKeys } = this.props;

      this.props.onKeysChanged(
        pressedKeys.includes(this.state.pressedKey)
          ? pressedKeys
          : [...pressedKeys, this.state.pressedKey],
      );
    });
  };

  generateClassName = () => {
    const { pressedKey } = this.state;

    switch (pressedKey) {
      case 'ArrowUp':
        return 'joystick-container up';
      case 'ArrowDown':
        return 'joystick-container down';
      case 'ArrowLeft':
        return 'joystick-container left';
      case 'ArrowRight':
        return 'joystick-container right';
      default:
        return 'joystick-container';
    }
  };

  render() {
    const containerClassNames = is_touch_device()
      ? 'manager-container touchable'
      : 'manager-container';

    return (
      <div className={containerClassNames}>
        <div
          className={this.generateClassName()}
          onTouchEnd={() =>
            this.setState({ pressedKey: '' }, () => {
              this.props.onKeysChanged([]);
            })
          }
          onTouchStart={this.onClickButton}
        >
          <div className="arrow-up">▲</div>
          <div className="middle-arrows">
            <div className="arrow-left">◀</div>
            <div className="arrow-middle">
              <div ref={this.middleEl} className="middle-circle"></div>
            </div>
            <div className="arrow-right">▶</div>
          </div>
          <div className="arrow-down">▼</div>
        </div>
      </div>
    );
  }
}

export default KeyboardManager;
