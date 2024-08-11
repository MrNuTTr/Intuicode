import * as React from 'react';
import { useEffect, useRef } from 'react';
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';

interface ResizableMonacoEditorProps {
    value: string;
    language: string;
    options?: monaco.editor.IStandaloneEditorConstructionOptions;
    onChange?: (newValue: string) => void;
}

const MonacoEditorThemed: React.FC<ResizableMonacoEditorProps> = ({
    value,
    language,
    options = {},
    onChange = () => { }
}) => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    let theme = 'vs';
    if (document.body.classList.contains('dark')) {
        theme = 'vs-dark';
    }

    return (
        <div style={{ width: '100%', height: '95%' }}>
            <MonacoEditor
                language={language}
                theme={theme}
                value={value}
                options={options}
                onChange={onChange}
                editorDidMount={(editor, monaco) => {
                    editorRef.current = editor;
                }}
            />
        </div>
    );
};

export default MonacoEditorThemed;
