import React from 'react';
import styled from 'styled-components';

interface InputProps {
  name: string;
  label: string;
  value: string | number;
  type: 'text' | 'number' | 'email';
  placeholder?: string;
  onChange: (values: any) => void;
}

const Input = styled.input`
  background-color: ${props => props?.theme?.colors?.dark};
  border: 1px solid ${props => props?.theme?.colors?.black};
  border-radius: ${props => props?.theme?.borderRadius};
  box-shadow: ${props => props?.theme?.insetBoxShadow};
  box-sizing: border-box;
  color: ${props => props?.theme?.global?.color};
  font-family: ${props => props?.theme?.fonts?.monospace};
  font-size: 1rem;
  margin: ${props => props?.theme?.interactiveMargin};
  outline: none;
  padding: ${props => props?.theme?.interactivePadding};
  transition: ${props => props?.theme?.transitionDuration};

  &:focus, &:active, &:hover {
    box-shadow: ${props => props?.theme?.insetBoxShadowActive};
    transition: ${props => props?.theme?.transitionDuration};
  }
`;

const Field = (props: InputProps): JSX.Element => (
  <Input
    type={props?.type}
    name={props?.name}
    value={props?.value}
    placeholder={props?.placeholder}
    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
      props?.onChange(ev.target.value);
    }}
  />
);

Field.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default Field;
