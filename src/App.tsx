import React from "react";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <header className="app-header">
        <Link className="app-header-link" to="/">
          Home
        </Link>
      </header>

      <Route exact path="/" component={Home} />
      <Route path="/play" component={Play} />
      <Route path="/settings" component={Settings} />
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <Link className="app-header-link" to="/play">
        Play
      </Link>
      <Link className="app-header-link" to="/settings">
        Settings
      </Link>
    </div>
  );
};

const Play: React.FC = () => {
  return (
    <div>
      <h2>Play the Game</h2>
    </div>
  );
};

const Settings: React.FC = () => {
  return (
    <div>
      <h2>Settings</h2>
    </div>
  );
};

export default App;
