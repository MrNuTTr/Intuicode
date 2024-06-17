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
import { PuzzleCode, PuzzleModel } from '../../interfaces/Puzzle';


function EditorPage() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [code, setCode] = useState('');
    
    const [languages, setLanguages] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    const [puzzleId, setPuzzleId] = useState<string | null>('');
    const [puzzleCode, setPuzzleCode] = useState<PuzzleCode>({
        timeoutSeconds: 0,
        startCode: '',
        assertCode: ''
    })
    const [puzzle, setPuzzle] = useState<PuzzleModel>({
        id: '',
        name: '',
        category: '',
        description: '',
        sequenceNumber: 0,
        code: { puzzleCode },
        hints: [],
        tags: []
    });
    const [output, setOutput] = useState<CodeResult>({
        success: true,
        reason: 'success',
        helpMessage: '',
        stdout: '',
        stderr: ''
    });

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setPuzzleId(query.get('puzzle'));
    }, [location]);

    useEffect(() => {
        if (puzzleId) {
            axios.get(`api/puzzles/${puzzleId}`)
                .then(response => {
                    const data = response.data;
                    setPuzzle(data);

                    const languages = Object.keys(data.code);
                    setLanguages(languages);
                    setSelectedLanguage(languages[0]);

                    setPuzzleCode(data.code[languages[0]]);
                    setCode(data.code[languages[0]].startCode);
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
    }, [puzzleId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Header />
            
            <Flex justify={"center"} pt="4" pb="4">
                <Skeleton loading={true}>
                    <Coderunner
                        code={code}
                        testCode={puzzleCode.assertCode}
                        language={selectedLanguage}
                        timeout={puzzleCode.timeoutSeconds}
                        onClick={(result: CodeResult) => {
                            setOutput(result);
                        }}
                        onResult={(result: CodeResult) => {
                            setOutput(result);
                        }}
                    />
                </Skeleton>
            </Flex>

            <Grid columns="2" gap="3" width="auto" pr="3" pl="3" height="85vh">
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
