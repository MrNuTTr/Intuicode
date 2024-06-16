import { Header } from '../../components/header';
import { useState, useEffect } from 'react';
import CodeEditor from '../../components/code-editor';
import { Flex, Grid, Skeleton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import Coderunner from '../../components/code-runner';
import CodeOutput from '../../components/code-output';
import { CodeResult } from '../../interfaces/CodeResult';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


function EditorPage() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState('');
    const [codeTimeout, setCodeTimeout] = useState(0);
    const [testCode, setTestCode] = useState('');
    const [output, setOutput] = useState<CodeResult>({ success: true, reason: 'success', helpMessage: '', stdout: '', stderr: '' });
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
                    setCode(startCode[languages[0]].code);
                    setCodeTimeout(startCode[languages[0]].timeoutSeconds);
                    setTestCode(testCode[languages[0]]);
                })
                .catch(error => {
                    console.error('Error fetching puzzle data:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        else {
            setIsLoading(false);
        }
    }, [puzzle]);

    return (
        <div>
            <Header />
            
            <Flex justify={"center"} pt="4" pb="4">
                <Skeleton loading={true}>
                    <Coderunner
                        code={code}
                        testCode={testCode}
                        language={selectedLanguage}
                        timeout={codeTimeout}
                        onClick={(result: CodeResult) => {
                            setOutput(result);
                        }}
                        onResult={(result: CodeResult) => {
                            setOutput(result);
                        }}
                    />
                </Skeleton>
            </Flex>

            <Grid columns="2" gap="3" width="auto" pr="4" pl="4">
                <Skeleton loading={true}>
                    <CodeEditor
                        language={selectedLanguage}
                        code={code}
                        onCodeChange={(newCode: string) => setCode(newCode)}
                    />
                </Skeleton>
                <Skeleton loading={true}>
                    <CodeOutput result={output} />
                </Skeleton>
                
            </Grid>
        </div>
    );
}

export default EditorPage;
