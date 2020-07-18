import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="nes-container with-title is-centered">
        <p className="title nes-text is-primary">Welcome Tetris Game!</p>
        <div className="nes-container-body">
          <Link className="app-header-link" to="/play">
            Play
          </Link>
          <Link className="app-header-link" to="/settings">
            Settings
          </Link>
        </div>
      </div>
      <div
        className="github-link nes-pointer"
        onClick={() =>
          window.open('https://github.com/tarsusi/tetris', '_blank')
        }
      >
        <i className="nes-octocat animate"></i>
      </div>
    </div>
  );
};

export default Home;
