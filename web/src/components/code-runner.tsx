import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import axios from 'axios';
import { CodeResult } from '../interfaces/CodeResult';

interface CodeRunnerProps {
    code: string;
    testCode: string;
    language: string;
    onResult: (result: CodeResult) => void;
}

const CodeRunner: React.FC<CodeRunnerProps> = ({ code, testCode, language, onResult }) => {
    const [isLoading, setIsLoading] = useState(false);

    const runCode = () => {
        setIsLoading(true);
        axios.post('/api/runcode', {
            "language": language, "userCode": code, "testCode": testCode
        })
            .then(response => {
                onResult(response.data);
            })
            .catch(error => {
                console.error('Error: ', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Button onClick={runCode} disabled={isLoading}>
            {isLoading ? 'Running...' : 'Run Code'}
        </Button>
    );
};

export default CodeRunner;
