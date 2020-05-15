import React, { useRef, createContext } from 'react';
import DialogService, { IDialogService, OpenSaveDialog } from 'service/dialog.service';

export interface IDialogContext {
  openSaveDialog: OpenSaveDialog;
}

export interface DialogContextProps {
  children: JSX.Element | JSX.Element[];
}

const DialogContext = createContext<IDialogContext>(null);

export function DialogContextProvider(props: DialogContextProps): JSX.Element {
  const { current: osService } = useRef<IDialogService>(new DialogService());

  const value: IDialogContext = {
    openSaveDialog: osService.saveDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {props.children}
    </DialogContext.Provider>
  );
}

DialogContext.displayName = 'DialogContext';

export default DialogContext;
