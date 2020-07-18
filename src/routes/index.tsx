import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../components/header/Header';
import Home from '../views/home/Home';
import Play from '../views/play/Play';
import Settings from '../views/settings/Settings';
import { GameSettingsContext } from '../hooks/useGameSettings';

const Routes: React.FC = () => {
  const {
    gameSettings: { speed, cellRowCount, cellColCount },
  } = useContext(GameSettingsContext);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <div className="view-container">
        <Route exact path="/" component={Home} />
        <Route
          path="/play"
          component={() => (
            <Play
              speed={speed}
              cellColCount={cellColCount}
              cellRowCount={cellRowCount}
            />
          )}
        />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  );
};

export default Routes;
