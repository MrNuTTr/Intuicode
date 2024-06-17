import * as React from 'react';
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';
import * as monaco from 'monaco-editor';
import { CodeResult } from '../interfaces/CodeResult';
import MonacoEditorThemed from './monaco-themed';

interface CodeOutputProps {
    result: CodeResult;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ result }) => {
    let output: string = '';

    if (result.success) {
        output = result.stdout;
    }
    else if (result.reason == 'error') {
        output = result.stderr;
    }
    else if (result.reason == 'assert-failed') {
        if (result.helpMessage != undefined || result.helpMessage != '') {
            output = result.helpMessage;
        }
        else {
            output = "Your code doesn't produce the expected result. Give it another shot!";
        }
    }
    else if (result.reason == 'timeout') {
        output = 'Your code took too long to run so the operation was cancelled by the server.';
    }
    else {
        output = 'There was a problem with the code execution server. Please try again or ask for support.';
    }

    const options: monaco.editor.IStandaloneEditorConstructionOptions = {
        selectOnLineNumbers: true,
        lineNumbers: 'off',
        roundedSelection: false,
        readOnly: true,
        cursorStyle: 'block',
        automaticLayout: true,
        minimap: { enabled: false }
    };

    return (
        <MonacoEditorThemed
            language=''
            value={output}
            options={options}
        />
    );
};

export default CodeOutput;