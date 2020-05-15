import React, { useRef, createContext } from 'react';
import { DownloadFileParams } from 'shared';
import FileService, { IFileService } from 'service/file.service';

export interface IFileContext {
  create: (props: DownloadFileParams) => void;
}

export interface FileContextProps {
  children: JSX.Element | JSX.Element[];
}

const FileContext = createContext<IFileContext>(null);

export function FileContextProvider(props: FileContextProps): JSX.Element {
  const { current: fileService } = useRef<IFileService>(new FileService());

  const value: IFileContext = {
    create: fileService.create,
  };

  return (
    <FileContext.Provider value={value}>
      {props.children}
    </FileContext.Provider>
  );
}

FileContext.displayName = 'FileContext';

export default FileContext;
