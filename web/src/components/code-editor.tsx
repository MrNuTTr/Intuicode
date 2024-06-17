import React from 'react';
import MonacoEditorThemed from './monaco-themed';
import { monaco } from 'react-monaco-editor';

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

    onChange(newValue: string) {
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
            minimap: { enabled: false },
            scrollbar: { horizontal: "auto" }
        };

        return (
            <MonacoEditorThemed
                language={language}
                value={code}
                options={options}
                onChange={this.onChange}
            />
        );
    }
}

export default CodeEditor;