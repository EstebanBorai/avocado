import React from 'react';
import List from './List';
import Log from './Log';

interface ConsoleProps {
  messages: Message[];
}

function Console({ messages }: ConsoleProps): JSX.Element {
  return (
    <List>
      {
        messages?.map((message: Message): JSX.Element => <Log data={message} />)
      }
    </List>
  );
}

export default Console;
