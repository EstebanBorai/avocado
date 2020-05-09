import * as React from 'react';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function Header(): JSX.Element {
  return (
    <header id="app-header">
      <h1>
        🥑&nbsp;Avocado
        <small>Make requests</small>
      </h1>
      <div id="links">
        <a /* onClick={() => openInBrowser('https://github.com/whizzes/avocado')} */>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </header>
  );
}

export default Header;
