import * as React from 'react';
import './control.scss';

interface ControlProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: JSX.Element | JSX.Element[];
}

const Control = ({
  children, style, className, id,
}: ControlProps): JSX.Element => (
  <section id={id} className={className ? `control ${className}` : 'control'} style={style}>
    {children}
  </section>
);

Control.defaultProps = {
  id: null,
  className: null,
  style: null,
};

export default Control;
