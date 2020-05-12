import * as React from 'react';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Header(): JSX.Element {
  return (
    <header id="app-header">
      <h1>
        <span role="img" aria-label="avocado">🥑</span>
        &nbsp;Avocado
        <small>Make requests</small>
      </h1>
      <div id="links">
        <FontAwesomeIcon icon={faGithub} />
      </div>
    </header>
  );
}

export default Header;
