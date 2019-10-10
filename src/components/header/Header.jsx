import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => (
  <header className="app-header">
    <Link className="app-header-link" to="/">
      Home
    </Link>
  </header>
);

export default Header;
