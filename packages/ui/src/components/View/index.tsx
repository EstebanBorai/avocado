import React from 'react';
import './view.scss';

interface ViewProps {
  children: JSX.Element | JSX.Element[];
}

const View = ({ children }: ViewProps): JSX.Element => (
  <section className="app-view">
    {children}
  </section>
);

export default View;
