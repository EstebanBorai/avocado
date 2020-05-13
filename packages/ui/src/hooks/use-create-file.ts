import { useContext, useCallback } from 'react';
import { DownloadFileParams } from 'shared';
import FileContext, { IFileContext } from 'context/file';

const useCreateFile = () => {
  const fileContext = useContext<IFileContext>(FileContext);

  const createFile = useCallback((props: DownloadFileParams) => {
    fileContext.create({
      filename: props?.filename,
      contents: props?.contents
    });
  }, []);

  return createFile;
};

export default useCreateFile;
