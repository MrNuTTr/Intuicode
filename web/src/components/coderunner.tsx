import React, { useState } from 'react';
import { Button } from '@radix-ui/themes';

interface CodeRunnerProps {
    code: string;
    onResult: (result: any) => void;
}

const CodeRunner: React.FC<CodeRunnerProps> = ({ code, onResult }) => {
    const [isLoading, setIsLoading] = useState(false);

    const runCode = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/coderunner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
            });
            const json = await response.json();
            console.log(json.result);
            onResult(json.result);
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
