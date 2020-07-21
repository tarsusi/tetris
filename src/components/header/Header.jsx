import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => (
  <header className="app-header">
    <Link className="app-header-link" to="/">
      Homepage
    </Link>
  </header>
);

export default Header;
