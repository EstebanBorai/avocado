import React from 'react';
import styled from 'styled-components';

interface ViewProps {
  children: JSX.Element | JSX.Element[];
}

const Container = styled.section`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 60px auto;
  height: calc(100vh - 60px);
  overflow: hidden;
  width: 100vw;
  padding: .5rem;
`;

const View = ({ children }: ViewProps): JSX.Element => (
  <Container>
    {children}
  </Container>
);

export default View;
