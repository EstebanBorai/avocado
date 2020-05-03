import * as React from 'react';
import './control.scss';

interface ControlProps {
  title: string;
  className?: string;
  style?: React.CSSProperties;
  children: JSX.Element | JSX.Element[];
}

const Control = ({ title, children, style, className }: ControlProps): JSX.Element => (
  <article className={className ? `control ${className}` : 'control'} style={style}>
    <h3>{title}</h3>
    <div>{children}</div>
  </article>
);

Control.defaultProps = {
  className: null,
  style: null
}

export default Control;
