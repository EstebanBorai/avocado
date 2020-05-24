import React from 'react';
import makeLogItem from './make-log-item';
import styled from 'styled-components';
import { DataItem } from 'components/Console/typings/console';
import LogIcon from './LogIcon';
import {
  faLongArrowAltUp,
  faLongArrowAltDown,
  faMinusCircle,
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

interface LogProps {
  dataItem: DataItem;
}

const logIcon = {
  error: faTimesCircle,
  info: faExclamationCircle,
  warning: faExclamationTriangle,
  request: faLongArrowAltUp,
  response: faLongArrowAltDown,
  close: faMinusCircle,
  open: faCheckCircle
};

const Message = styled.span`
  grid-column: 3 / 3;
`;

function Log({ dataItem }: LogProps): JSX.Element {
  const LogItem = makeLogItem(dataItem.kind);
  const iconDef = logIcon[dataItem.kind];

  return (
    <LogItem>
      { iconDef ? <LogIcon icon={iconDef} /> : undefined }
      <Message>{dataItem.message}</Message>
    </LogItem>
  );
}

export default Log;
