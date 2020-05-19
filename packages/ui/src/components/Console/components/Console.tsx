import React from 'react';
import List from './List';
import { renderMessage } from './Message';
import { Message } from '../typings';

interface ConsoleProps {
  messages: Message[];
}

function Console({ messages }: ConsoleProps): JSX.Element {
  return (
    <List>
      {
        messages?.map((message: Message): JSX.Element => {
          const Item = renderMessage(message);

          return <Item>{message?.text}</Item>;
        })
      }
    </List>
  );
}

export default Console;
