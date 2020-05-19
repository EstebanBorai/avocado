import React from 'react';
import Server from '../Server';
import Payload from '../Payload';
import styled from 'styled-components';
import Console from 'components/Console';

const Section = styled.section`
  box-sizing: border-box;
  display: grid;
  gap: .5rem;
  grid-template-columns: minmax(300px, 50%) minmax(300px, 50%);
  grid-template-rows: minmax(300px, 50%) minmax(300px, 50%);
`;

const Request = styled.div`
  grid-column: 1 / 1;
  grid-row: 1 / 2;
`;

const Main = (): JSX.Element => (
  <Section>
    <Request>
      <Server />
      <Payload />
    </Request>
    <Console messages={[
      {
        kind: 'Error',
        text: 'An error ocurred',
        data: {
          stack: 'The stack trace',
          trace: [
            1,
            2,
            3,
            4
          ]
        }
      },
      {
        kind: 'Info',
        text: 'Info about something cool',
        data: {
          foo: {
            bar: 'baz'
          }
        }
      },
      {
        kind: 'Warning',
        text: 'Be careful!',
        data: 'Something may happen with the request packages!'
      },
      {
        text: 'This is an UFO!',
        data: 'an ufo!'
      }
    ]} />
  </Section>
);

export default Main;
