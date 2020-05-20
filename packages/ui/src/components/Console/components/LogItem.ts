import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { Log } from '../typings';

const BaseLog = styled.li`
  background-color: #FFFFFF;
  border-bottom: 1px solid ${props => props?.theme?.colors?.grayDark};
  box-sizing: border-box;
  font-family: ${props => props?.theme?.fonts?.monospace};
  font-size: .9rem;
  padding: .3rem .7rem;
`;

export const InfoLog = styled(BaseLog)`
  background-color: ${props => props?.theme?.colors?.info};
  color: ${props => props?.theme?.colors?.dark};
`;

export const ErrorLog = styled(BaseLog)`
  background-color: ${props => props?.theme?.colors?.danger};
  color: ${props => props?.theme?.colors?.white};
`;

export const WarningLog = styled(BaseLog)`
  background-color: ${props => props?.theme?.colors?.warning};
`;

export function renderLog(data: Log): StyledComponent<'li', DefaultTheme, {}, never> {
  switch (data?.kind) {
    case 'Info':
      return InfoLog;
    case 'Error':
      return ErrorLog;
    case 'Warning':
      return WarningLog;
    default:
      return BaseLog;
  }
}

export default BaseLog;
