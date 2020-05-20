import React from 'react';
import styled from 'styled-components';

interface ViewProps {
  children: JSX.Element | JSX.Element[];
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

const View = ({ children }: ViewProps): JSX.Element => (
  <Container>
    {children}
  </Container>
);

export default View;
