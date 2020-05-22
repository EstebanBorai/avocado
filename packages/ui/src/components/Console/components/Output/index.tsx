import React, { useState, useEffect, useCallback, useRef } from 'react';
import cuid from 'cuid';
import styled from 'styled-components';
import { DataItem, ConsoleStream } from 'components/Console/typings/console';
import Log from './Log';

const Stream = styled.ol`
  font-family: ${props => props.theme.fonts.monospace};
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

interface OutputProps {
  stream: ConsoleStream;
  isConnected: boolean;
}

interface TrackableDataItem extends DataItem {
  id: string;
}

function Output({ stream }: OutputProps): JSX.Element {
  const { current: streamItems } = useRef(new Set<TrackableDataItem>());
  const [dataItems, setDataItems] = useState<TrackableDataItem[]>([]);

  useEffect(() => {
    const streamSubs = stream.subscribe((value) => {
      streamItems.add({ ...value, id: cuid() });
      setDataItems(Array.from(streamItems));
    });

    return () => {
      streamSubs.unsubscribe();
    };
  }, []);

  return (
    <Stream>
      {
        dataItems?.map(({ id, kind, message, data, dataType, rawData }: TrackableDataItem) => (
          <Log
            key={id}
            dataItem={{
              kind,
              message,
              data,
              dataType,
              rawData
            }}
          />
        ))
      }
    </Stream>
  );
}

export default Output;
