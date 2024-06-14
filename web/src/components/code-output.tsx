import * as React from 'react';
import { CodeResult } from '../interfaces/CodeResult';
import { Text } from '@radix-ui/themes'

interface CodeOutputProps {
    result: CodeResult;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ result }) => {
    return (
        <div style={{
            backgroundColor: 'var(--gray-2)',
            border: 'none',
            resize: 'none',
            width: '100%',
            height: '100%',
            fontFamily: 'Monaco, monospace'
        }}>
            <Text style={{ color: '#fff' }}>{result.stdout}</Text>
            {!result.success && <Text style={{ color: 'red' }}>{'\n\n' + result.stderr}</Text>}
        </div>
    );
};

export default CodeOutput;