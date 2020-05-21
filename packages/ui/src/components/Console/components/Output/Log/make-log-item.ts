import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { DataItemKind } from 'components/Console/typings/console';

const Item = styled.li`
  border-bottom: 1px solid ${props => props.theme.colors.gray};
  display: grid;
  grid-template-columns: 25px 25px auto;
  padding: ${props => props.theme.interactivePadding};
`;

const ErrorItem = styled(Item)`
  background-color: ${props => props.theme.colors.danger};
  color: ${props => props.theme.colors.black};
`;

const InfoItem = styled(Item)`
  background-color: ${props => props.theme.colors.info};
  color: ${props => props.theme.colors.white};
`;

const WarningItem = styled(Item)`
  background-color: ${props => props.theme.colors.warning};
  color: ${props => props.theme.colors.dark};
`;

const RequestItem = styled(Item)`
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
`;

const ResponseItem = styled(Item)`
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
`;

const ConnectionOpened = styled(Item)`
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.white};
`;

function makeLogItem(kind: DataItemKind): StyledComponent<"li", DefaultTheme, {}, never> {
  switch (kind) {
    case DataItemKind.Error:
      return ErrorItem;
    case DataItemKind.Info:
      return InfoItem;
    case DataItemKind.Warning:
      return WarningItem;
    case DataItemKind.Request:
      return RequestItem;
    case DataItemKind.Response:
      return ResponseItem;
    case DataItemKind.ConnectionOpened:
      return ConnectionOpened;
    case DataItemKind.ConnectionClosed:
      return ErrorItem;
    default:
      return Item;
  }
}

export default makeLogItem;