import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { Message } from '../typings';

const BaseMessage = styled.li`
  background-color: #FFFFFF;
  border-bottom: 1px solid ${props => props?.theme?.colors?.grayDark};
  box-sizing: border-box;
  font-family: ${props => props?.theme?.fonts?.monospace};
  font-size: .9rem;
  padding: .3rem .7rem;
`;

export const InfoMessage = styled(BaseMessage)`
  backfground-color: ${props => props?.theme?.colors?.info};
  color: ${props => props?.theme?.colors?.white};
`;

export const ErrorMessage = styled(BaseMessage)`
  backfground-color: ${props => props?.theme?.colors?.danger};
  color: ${props => props?.theme?.colors?.white};
`;

export const WarningMessage = styled(BaseMessage)`
  backfground-color: ${props => props?.theme?.colors?.warning};
  color: ${props => props?.theme?.colors?.dark};
`;

export function renderMessage(data: Message): StyledComponent<'li', DefaultTheme, {}, never> {
  switch (data?.kind) {
    case 'Info':
      return InfoMessage;
    case 'Error':
      return ErrorMessage;
    case 'Warning':
      return WarningMessage;
    default:
      return BaseMessage;
  }
}

export default BaseMessage;
