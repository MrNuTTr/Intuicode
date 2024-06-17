import { Header } from '../../components/header';
import { useState, useEffect } from 'react';
import CodeEditor from '../../components/code-editor';
import { Button, Card, Flex, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './puzzle-editor-page.css';
import Coderunner from '../../components/code-runner';
import CodeOutput from '../../components/code-output';
import { CodeResult } from '../../interfaces/CodeResult';
import { useLocation } from 'react-router-dom';
import { PuzzleCode, PuzzleModel } from '../../interfaces/Puzzle';
import { Resplit } from 'react-resplit';
import axios from 'axios';
import { RowsIcon, UploadIcon } from '@radix-ui/react-icons';
import PuzzleDetailEdit from './puzzle-detail-edit';


function PuzzleEditorPage() {
    const location = useLocation();
    const languages: string[] = ['python'];
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    
    const [puzzleId, setPuzzleId] = useState<string | null>('');
    const [sandboxCode, setSandboxCode] = useState('');
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
            axios.get(`/api/puzzles/${puzzleId}`)
                .then(response => {
                    const data = response.data;
                    setPuzzle(data);

                    setPuzzleCode(data.code[languages[0]]);
                })
                .catch(error => {
                    console.error('Error fetching puzzle data:', error);
                })
        }
    }, [puzzleId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
            <Header />

            <Flex justify={"center"} gap="2" pt="4" pb="4">
                <PuzzleDetailEdit
                    puzzle={puzzle}
                    onSave={(result: PuzzleModel) => setPuzzle(result)}
                />
                <Coderunner
                    code={sandboxCode}
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
                <Button variant='soft'>
                    <UploadIcon/>
                    Submit Puzzle
                </Button>
            </Flex>

            <Resplit.Root direction="vertical" style={{height: "100%"}}>
                <Resplit.Pane order={0}>
                    <Resplit.Root direction="horizontal" style={{height: "100%"}}>
                        <Resplit.Pane order={0} minSize='200px'>
                            <Card className="Card">
                                <div style={{ textAlign: "center" }}>
                                    <Text>Start Code</Text>
                                </div>
                                <CodeEditor
                                    language={selectedLanguage}
                                    code={puzzleCode.startCode}
                                    onCodeChange={(newCode: string) => puzzleCode.startCode = newCode}
                                />
                            </Card>
                        </Resplit.Pane>
                        <Resplit.Splitter order={1} size="10px" />
                        <Resplit.Pane order={2} minSize='200px'>
                            <Card className="Card">
                                <div style={{ textAlign: "center" }}>
                                    <Text>Sandbox</Text>
                                </div>
                                <CodeEditor
                                    language={selectedLanguage}
                                    code={sandboxCode}
                                    onCodeChange={(newCode: string) => setSandboxCode(newCode)}
                                />
                            </Card>
                        </Resplit.Pane>
                        <Resplit.Splitter order={3} size="10px" />
                        <Resplit.Pane order={4} minSize='200px'>
                            <Card className="Card">
                                <div style={{ textAlign: "center" }}>
                                    <Text>Assert Code</Text>
                                </div>
                                <CodeEditor
                                    language={selectedLanguage}
                                    code={puzzleCode.assertCode}
                                    onCodeChange={(newCode: string) => puzzleCode.assertCode = newCode}
                                />
                            </Card>
                        </Resplit.Pane>
                    </Resplit.Root>
                </Resplit.Pane>
                <Resplit.Splitter order={1} size="10px" />
                <Resplit.Pane order={2}>
                    <Card className="Card">
                        <div style={{ textAlign: "center" }}>
                            <Text>Output</Text>
                        </div>
                        <CodeOutput result={output} />
                    </Card>
                </Resplit.Pane>
            </Resplit.Root>
            
        </div>
    );
}

export default PuzzleEditorPage;