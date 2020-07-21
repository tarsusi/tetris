import React, { useContext } from 'react';

import { GameSettingsContext } from 'hooks/useGameSettings';
import './settings.scss';

const Settings: React.FC = () => {
  const {
    gameSettings: {
      cellRowCount,
      cellColCount,
      cellRadius,
      boardHeight,
      boardWidth,
      speed,
    },
    updateRowCount,
    updateColCount,
    updateCellRadius,
    updateBoardWidth,
    updateBoardHeight,
    updateAnimationSpeed,
    resetSettings,
  } = useContext(GameSettingsContext);
  return (
    <div className="settings-container">
      <div className="nes-container with-title is-centered">
        <p className="title nes-text is-primary">
          <i className="nes-logo"></i>
        </p>
        <div className="nes-container-body">
          <div className="nes-field">
            <label htmlFor="board-width">Board Width</label>
            <input
              type="number"
              id="board-width"
              value={boardWidth}
              onChange={(e) => {
                updateBoardWidth(Number(e.target.value));
              }}
              className="nes-input"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="board-height">Board Height</label>
            <input
              type="number"
              id="board-height"
              value={boardHeight}
              onChange={(e) => {
                updateBoardHeight(Number(e.target.value));
              }}
              className="nes-input"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="column">Number of row</label>
            <input
              type="number"
              id="column"
              value={cellRowCount}
              onChange={(e) => {
                updateRowCount(Number(e.target.value));
              }}
              className="nes-input"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="row">Number of columns</label>
            <input
              type="number"
              id="row"
              value={cellColCount}
              onChange={(e) => {
                updateColCount(Number(e.target.value));
              }}
              className="nes-input"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="radius">Radius of each cell</label>
            <input
              type="number"
              id="radius"
              value={cellRadius}
              onChange={(e) => {
                updateCellRadius(Number(e.target.value));
              }}
              className="nes-input"
            />
          </div>
          <div className="nes-field">
            <label htmlFor="answer">Animation Speed</label>
            <div className="nes-radio-container">
              <label className="nes-radio-label">
                <input
                  type="radio"
                  className="nes-radio"
                  name="answer"
                  onChange={() => {
                    updateAnimationSpeed('slow');
                  }}
                  checked={speed === 'slow'}
                />
                <span>Slow</span>
              </label>
              <label className="nes-radio-label">
                <input
                  type="radio"
                  className="nes-radio"
                  name="answer"
                  onChange={() => {
                    updateAnimationSpeed('normal');
                  }}
                  checked={speed === 'normal'}
                />
                <span>Normal</span>
              </label>
              <label className="nes-radio-label">
                <input
                  type="radio"
                  className="nes-radio"
                  name="answer"
                  onChange={() => {
                    updateAnimationSpeed('fast');
                  }}
                  checked={speed === 'fast'}
                />
                <span>Fast</span>
              </label>
            </div>
          </div>
          <section>
            <button
              type="button"
              className="nes-btn"
              onClick={() => {
                (document.getElementById(
                  'dialog-default',
                ) as HTMLDialogElement).showModal();
              }}
            >
              Reset
            </button>
            <dialog className="nes-dialog is-centered" id="dialog-default">
              <form method="dialog">
                <p className="title">Are you sure?</p>
                <menu className="dialog-menu">
                  <button className="nes-btn">No</button>
                  <button
                    className="nes-btn is-primary"
                    onClick={resetSettings}
                  >
                    Yes
                  </button>
                </menu>
              </form>
            </dialog>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
