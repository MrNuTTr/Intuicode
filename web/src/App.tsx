import './App.css';
import { Header } from './components/header';
import { Images } from './components/images';
import { ProductInfo } from './components/product-info';
import { useState } from 'react';
import type { User } from './types';
import CodeEditor from './components/editor';
import '@radix-ui/themes/styles.css';
import { Theme, Button } from '@radix-ui/themes';
import Coderunner from './components/coderunner';
import CodeOutput from './components/code-output';

function App({ user }: { user: User }) {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    return (
        <Theme accentColor="brown" grayColor="sand" radius="medium" appearance="dark">
            <div>
                <Header user={user} />

                <div className="text-center pt-4">
                    <Coderunner
                        code={code}
                        onResult={(result: string) => setOutput(result)}
                    />
                </div>

                <main className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-2 w-screen p-5">
                    <CodeEditor language="python" code={code} />
                    <CodeOutput text={output} />
                </main>
            </div>
        </Theme>
    );
}

export default App;
