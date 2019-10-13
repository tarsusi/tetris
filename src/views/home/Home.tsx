import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <Link className="app-header-link" to="/play">
        Play
      </Link>
      <Link className="app-header-link" to="/settings">
        Settings
      </Link>
    </>
  );
};

export default Home;
