import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';
import axios from 'axios';

interface CodeRunnerProps {
    code: string;
    onResult: (result: any) => void;
}

const CodeRunner: React.FC<CodeRunnerProps> = ({ code, onResult }) => {
    const [isLoading, setIsLoading] = useState(false);

    const runCode = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/runcode', { code });
            console.log(response.data.result);
            onResult(response.data.result);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={runCode} disabled={isLoading}>
            {isLoading ? 'Running...' : 'Run Code'}
        </Button>
    );
};

export default CodeRunner;
