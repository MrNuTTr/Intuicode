import React from 'react';
import { Button } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

const ModalCloseButton: React.FC = () => {
    return (
        <Button
            variant="ghost"
            style={{ position: 'absolute', top: '1vh', right: '1.5vh' }}
        >
            <Cross2Icon />
        </Button>
    );
};

export default ModalCloseButton;
