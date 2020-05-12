import React, { useMemo } from 'react';
import './button.scss';

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
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button(props: ButtonProps): JSX.Element {
  const className = useMemo(() => {
    let name = 'btn';

    name += ` ${props.intent}`;

    return name;
  }, [props.intent]);

  return (
    <button
      type="button"
      id={props.id}
      className={className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

Button.defaultProps = {
  type: 'submit',
  intent: 'primary',
  disabled: false,
};

export default Button;
