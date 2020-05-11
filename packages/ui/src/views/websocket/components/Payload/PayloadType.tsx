import React from 'react';
import './payload.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

function PayloadType(): JSX.Element {
  return (
    <div id="ws-payload-type">
      <FontAwesomeIcon  icon={faEdit} />
      &nbsp;
      <span id="label">
        Plain Text
      </span>
    </div>
  );
}


export default PayloadType;
