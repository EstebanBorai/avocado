import React from 'react';
import Server from '../Server';
import Payload from '../Payload';
import styled from 'styled-components';
import Console from 'components/Console';
import View from 'components/View';

const Section = styled.section``;

const Main = (): JSX.Element => (
  <View>
    <Server />
  </View>
);

export default Main;
