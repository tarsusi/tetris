import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Link className="app-header-link" to="/play">
        Play
      </Link>
      <Link className="app-header-link" to="/settings">
        Settings
      </Link>
    </div>
  );
};

export default Home;
