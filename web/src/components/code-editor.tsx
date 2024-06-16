import React from 'react';
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';

interface EditorProps {
    code: string;
    language: string;
    onCodeChange: (newCode: string) => void;
}

class CodeEditor extends React.Component<EditorProps> {
    constructor(props: EditorProps) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    editorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
        editor.focus();
    }

    onChange(newValue: string, e: monaco.editor.IModelContentChangedEvent) {
        this.props.onCodeChange(newValue);
    }

    render() {
        const { code, language } = this.props;
        const options: monaco.editor.IStandaloneEditorConstructionOptions = {
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line' as 'line',
            automaticLayout: true,
            minimap: { enabled: false }
        };

        return (
            <MonacoEditor
                height='84vh'
                language='python'
                theme='vs-dark'
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
            />
        );
    }
}

export default CodeEditor;