import React, { useMemo } from 'react';
import './control.scss';

interface HeaderProps {
  id?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: JSX.Element | JSX.Element[];
}

function Header({
  children, style, className, id, title,
}: HeaderProps): JSX.Element {
  const memoClassName = useMemo((): string => {
    let base = 'control-header';

    if (className) {
      base += ` ${className}`;
    }

    if (title) {
      base += ' with-title';
    }

    return base;
  }, [className, title]);

  return (
    <header id={id} className={memoClassName} style={style}>
      { title && <h3>{title}</h3> }
      { children && (
      <div className="child-wrapper">
        {' '}
        {children}
        {' '}
      </div>
      ) }
    </header>
  );
}

Header.defaultProps = {
  id: null,
  title: null,
  className: null,
  style: null,
};

export default Header;
