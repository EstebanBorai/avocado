import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  grid-column: 2 / 2;
  width: 100%;

  button {
    padding: 0;
  }
`;

const ActionButtonBase= styled.button`
  border: none;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.monospace};
  outline: none;
`;

const Button = styled(ActionButtonBase)`
  background-color: ${props => props.theme.colors.primary};
  color: #FFF;
  width: 100px;
`;

const SelectButton = styled(ActionButtonBase)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  width: 50px;
`;

interface ActionSelectProps {
  isConnected: boolean;
  onConnect: () => void;
  onSend: () => void;
}

function ActionSelect({ onConnect, onSend, isConnected }: ActionSelectProps): JSX.Element {
  const handleClick = () => {
    if (isConnected) {
      onSend();
    } else {
      onConnect();
    }
  }

  return (
    <Container>
      <Button onClick={handleClick} >
        { isConnected ? 'Send' : 'Connect' }
      </Button>
      <SelectButton>
        <FontAwesomeIcon icon={faPlus} />
      </SelectButton>
    </Container>
  );
}

export default ActionSelect;
