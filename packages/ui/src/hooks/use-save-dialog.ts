import { useContext, useCallback } from 'react';
import DialogContext, { IDialogContext } from 'context/dialog';
import { OpenSaveDialog } from 'service/dialog.service';

const useSaveDialog = (): OpenSaveDialog => {
  const dialogContext = useContext<IDialogContext>(DialogContext);

  const openSaveDialog = useCallback(dialogContext.openSaveDialog, []);

  return openSaveDialog;
};

export default useSaveDialog;
