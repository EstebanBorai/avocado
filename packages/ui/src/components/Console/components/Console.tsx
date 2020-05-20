import React from 'react';
import List from './List';
import Log from './Log';
import { Log as LogData } from '../typings';

interface ConsoleProps {
  messages: LogData[];
}

function Console({ messages }: ConsoleProps): JSX.Element {
  return (
    <List>
      { messages?.map((message: LogData): JSX.Element => <Log data={message} />) }
    </List>
  );
}

export default Console;
