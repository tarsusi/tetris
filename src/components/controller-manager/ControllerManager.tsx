import React, { Component } from 'react';

interface Props {
  onKeysChanged(keys: String[]): void;
  pressedKeys: String[];
}

interface State {}

class ControllerManager extends Component<Props, State> {
  state = {};

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

  render() {
    return <></>;
  }
}

export default ControllerManager;
