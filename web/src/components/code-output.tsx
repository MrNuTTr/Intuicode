import * as React from 'react';
import { Text } from '@radix-ui/themes'

interface CodeOutputProps {
    text: string;
}

// Define the React component
const CodeOutput: React.FC<CodeOutputProps> = ({ text }) => {
    return <Text style={{
        backgroundColor: 'var(--gray-2)',
        color: '#fff',
        border: 'none',
        resize: 'none',
        width: '100%',
        height: '100%',
        fontFamily: 'Monaco, monospace'
    }}>
        {text}
    </Text>;
};

export default CodeOutput;