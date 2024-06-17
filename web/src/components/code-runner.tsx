import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import axios from 'axios';
import { CodeResult } from '../interfaces/CodeResult';
import { PlayIcon } from '@radix-ui/react-icons';

interface CodeRunnerProps {
    code: string;
    testCode: string;
    language: string;
    timeout: number;
    onClick: (result: CodeResult) => void;
    onResult: (result: CodeResult) => void;
}

const CodeRunner: React.FC<CodeRunnerProps> = ({ code, testCode, language, timeout, onClick, onResult }) => {
    const [isLoading, setIsLoading] = useState(false);
    let errorResult: CodeResult = {
        success: false,
        reason: 'error',
        helpMessage: '',
        stdout: '',
        stderr: 'There was a problem with the code execution server. Please try again or ask for support.'
    }
    let blankResult: CodeResult = { success: true, reason: 'success', helpMessage: '', stdout: '', stderr: '' }

    const runCode = () => {
        onClick(blankResult);
        setIsLoading(true);
        axios.post('/api/runcode', {
            "language": language, "timeout_seconds": timeout, "userCode": code, "testCode": testCode
        })
            .then(response => {
                onResult(response.data);
            })
            .catch(error => {
                onResult(errorResult);
                console.error('Error: ', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Button onClick={runCode} disabled={isLoading}>
            {isLoading ? 'Running...' : [<PlayIcon/>, 'Run Code'] }
        </Button>
    );
};

export default CodeRunner;
