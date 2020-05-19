import React from 'react';
import List from './List';
import { renderLog } from './LogItem';
import { Log } from '../typings';

interface LogProps {
  data: Log;
}

function LogItem({ data }: LogProps): JSX.Element {
  const Item = renderLog(data);
  return (
    <Item>
      <span>{data?.text}</span>
    </Item>
  );
}

export default LogItem;
