import * as React from 'react';
import './header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const Heading = styled.h1`
  align-items: center;
  display: flex;
  font-family: ${props => props?.theme?.fonts?.body};
  font-size: 2rem;
  grid-column: 1 / 1;
  height: 60px;
  justify-content: center;
  margin: 0;

  span {
    display: inline-block;
    margin-right: .5rem;
  }
`;

function Header(): JSX.Element {
  return (
    <header id="app-header">
      <Heading>
        <span role="img" aria-label="avocado">🥑</span>
        Avocado
      </Heading>
      <div id="links">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/whizzes/avocado">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </header>
  );
}

export default Header;
