import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface LogIconProps {
  icon: IconProp;
}

const IconWrapper = styled.figure`
  grid-column: 1 / 1;
  margin: 0;
  width: 25px;
`;

const LogIcon = ({ icon }: LogIconProps): JSX.Element => (
  <IconWrapper>
    <FontAwesomeIcon icon={icon} />
  </IconWrapper>
);

export default LogIcon;
