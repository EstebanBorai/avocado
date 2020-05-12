import React, { useMemo } from 'react';
import { useUuid } from 'hooks';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-terminal';

export type EditorMode = 'text' | 'json';

interface TextEditorProps {
  mode: EditorMode;
  value: string;
  onChange: (value: string, event?: Event) => void;
}

function TextEditor({ mode, value, onChange }: TextEditorProps): JSX.Element {
  const uniqueId = useUuid();

  const currentMode = useMemo((): string => mode, [mode]);

  return (
    <AceEditor
      name={uniqueId}
      mode={currentMode}
      theme="terminal"
      value={value}
      style={{ height: '300px' }}
      onChange={onChange}
      editorProps={{ $blockScrolling: true }}
    />
  );
}

export default TextEditor;
