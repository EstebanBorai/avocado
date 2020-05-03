import * as React from 'react';
import './request-menu.scss';

function FloatMenu(): JSX.Element {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  return (
    <div id="request-menu" className={isOpen ? 'active' : null}>
      {
        isOpen &&
        <ol id="options">
          <li>🔌</li>
        </ol>
      }
      <button id="call" type="button" onClick={handleOpen}>🥑</button>
    </div>
  )
}

export default FloatMenu;
