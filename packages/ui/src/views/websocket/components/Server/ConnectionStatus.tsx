import React from 'react';
import './server.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import useIsConnected from '../../hooks/use-is-connected';

const ConnectionStatus = (): JSX.Element => {
  const isConnected = useIsConnected();

  return (
    <div id="ws-connection">
      <span id="label" className={isConnected ? 'conn' : 'disc'}>
        {
          isConnected
            ? <FontAwesomeIcon icon={faCircle} />
            : <FontAwesomeIcon icon={faTimesCircle} />
        }
        &nbsp;
        {
          isConnected ? 'Connected' : 'Disconnected'
        }
      </span>
    </div>
  );
};


export default ConnectionStatus;
