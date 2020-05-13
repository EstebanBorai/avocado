import React, { useMemo } from 'react';
import './button.scss';
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
    <button
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
    </button>
  );
}

Button.defaultProps = {
  type: 'submit',
  intent: null,
  disabled: false,
};

export default Button;
