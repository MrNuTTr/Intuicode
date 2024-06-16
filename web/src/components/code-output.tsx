import * as React from 'react';
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { CodeResult } from '../interfaces/CodeResult';

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


    let theme = 'vs'
    if (document.body.classList.contains('dark')) {
        theme = 'vs-dark'
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
        <div>
            <MonacoEditor
                height='84vh'
                language=''
                theme={theme}
                value={output}
                options={options}
            />
        </div>
    );
};

export default CodeOutput;