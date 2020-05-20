import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type ButtonIntent = 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  id?: string;
  text: string;
  intent?: ButtonIntent;
  icon?: IconProp;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BaseButton = styled.button`
  background-color: ${props => props?.theme?.colors?.primary};
  border: none;
  border-radius: ${props => props?.theme?.borderRadius};
  box-sizing: border-box;
  color: ${props => props?.theme?.colors?.white};
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  margin: ${props => props?.theme?.interactiveMargin};
  outline: none;
  padding: ${props => props?.theme?.interactivePadding};
  transition: ${props => props?.theme?.transitionDuration};

  &:focus, &:active, &:hover {
    transition: ${props => props?.theme?.transitionDuration};
  }
`;

function Button(props: ButtonProps): JSX.Element {
  const className = useMemo(() => {
    let name = 'btn';

    if (props.intent) {
      name += ` ${props.intent}`;
    }

    if (props.icon) {
      name += ' with-icon';
    }

    return name;
    // @ts-ignore
  }, [props.intent, props.icon]);

  return (
    <BaseButton
      type="button"
      id={props.id}
      className={className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {
        props.icon
          ? (
            <figure className="icon-wrapper">
              <FontAwesomeIcon icon={props.icon} />
            </figure>
          )
          : null
      }
      {props.text}
    </BaseButton>
  );
}

Button.defaultProps = {
  type: 'submit',
  intent: null,
  disabled: false,
};

export default Button;
