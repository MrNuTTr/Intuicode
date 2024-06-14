import { Header } from '../../components/header';
import { useState, useEffect } from 'react';
import CodeEditor from '../../components/editor';
import '@radix-ui/themes/styles.css';
import Coderunner from '../../components/code-runner';
import CodeOutput from '../../components/code-output';
import { CodeResult } from '../../interfaces/CodeResult';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function EditorPage() {
    const location = useLocation();
    const [code, setCode] = useState('');
    const [testCode, setTestCode] = useState('');
    const [output, setOutput] = useState<CodeResult>({ success: true, stdout: '', stderr: '' });
    const [puzzle, setPuzzle] = useState<string | null>(null);
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setPuzzle(query.get('puzzle'));
    }, [location]);

    useEffect(() => {
        if (puzzle) {
            axios.get(`api/puzzles/${puzzle}`)
                .then(response => {
                    const startCode = response.data.startCode;
                    const testCode = response.data.testCode;
                    const languages = Object.keys(startCode);
                    setLanguages(languages);
                    setSelectedLanguage(languages[0]);
                    setCode(startCode[languages[0]]);
                    setTestCode(testCode[languages[0]]);
                })
                .catch(error => {
                    console.error('Error fetching puzzle data:', error);
                });
        }
    }, [puzzle]);

    return (
        <div>
            <Header />

            <div className="text-center pt-4">
                <Coderunner
                    code={code}
                    testCode={testCode}
                    language={selectedLanguage}
                    onResult={(result: CodeResult) => {
                        setOutput(result);
                    }}
                />
            </div>

            <main className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-2 w-screen p-5">
                <CodeEditor
                    language={selectedLanguage}
                    code={code}
                    onCodeChange={(newCode: string) => setCode(newCode)}
                />
                <CodeOutput result={output} />
            </main>
        </div>
    );
}

export default EditorPage;
