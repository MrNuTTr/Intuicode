import './HomePage.css';
import { Header } from '../../components/header';
import { useState } from 'react';
import type { User } from '../../types';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import LoginButton from '../../components/login-button';

function HomePage() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    return (
        <div>
            <h1 className="title-text">Intuicode</h1>
            <h2 className="under-text">Learn to code, intuitively.</h2>
            <div className="title-button">
                <Button>Start coding</Button>
            </div>
            <LoginButton></LoginButton>
        </div>
    );
}

export default HomePage;
