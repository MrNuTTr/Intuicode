import { useState, useEffect } from 'react';
import CodeEditor from '../../components/code-editor';
import { Card, Flex, Grid, Select, Text } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './puzzle-editor-page.css';
import Coderunner from '../../components/code-runner';
import CodeOutput from '../../components/code-output';
import { CodeResult } from '../../interfaces/CodeResult';
import { useLocation } from 'react-router-dom';
import { PuzzleCode, PuzzleModel, TestCase } from '../../interfaces/Puzzle';
import { Resplit } from 'react-resplit';
import axios from 'axios';
import PuzzleDetailEdit from './puzzle-detail-edit';
import PuzzleDeleteButton from './puzzle-delete';
import PuzzleSubmitButton from './puzzle-submit';
import PuzzleList from './puzzle-list';
import PuzzleTestCases from './puzzle-test-case';


function PuzzleEditorPage() {
    const location = useLocation();
    const languages: string[] = ['python'];
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const [selectedTestCase, setSelectedTestCase] = useState(0);
    
    const [puzzleId, setPuzzleId] = useState<string | null>('');
    const [sandboxCode, setSandboxCode] = useState('');
    const [testCase, setTestCase] = useState<TestCase>({
        timeoutSeconds: 0,
        setupCode: '',
        testCode: '',
        hidden: true
    });
    const [puzzleCode, setPuzzleCode] = useState<PuzzleCode>({
        startCode: '',
        testCases: []
    });
    const [puzzle, setPuzzle] = useState<PuzzleModel>({
        id: '',
        name: '',
        category: '',
        difficulty: 0,
        description: '',
        sequenceNumber: 0,
        code: { },
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

    const setStartCode = (newCode: string) => {
        let newPuzzleCode = { ...puzzleCode };
        newPuzzleCode.startCode = newCode;
        setPuzzleCode(newPuzzleCode);
    }

    const setTestCode = (newCode: string) => {
        let newTestCase = { ...testCase };
        newTestCase.testCode = newCode;
        setTestCase(newTestCase);
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setPuzzleId(query.get('puzzle'));
    }, [location]);

    useEffect(() => {
        let newPuzzle = { ...puzzle };
        newPuzzle.code[selectedLanguage] = puzzleCode;
        setPuzzle(newPuzzle);
    }, [puzzleCode])

    useEffect(() => {
        let newPuzzleCode = { ...puzzleCode };
        newPuzzleCode.testCases[selectedTestCase] = testCase;
        setPuzzleCode(newPuzzleCode);
    }, [testCase])

    useEffect(() => {
        let newTestCase = puzzleCode.testCases[selectedTestCase];
        setTestCase(newTestCase);
    }, [selectedTestCase])

    useEffect(() => {
        if (puzzleId) {
            axios.get(`/api/puzzles/${puzzleId}`)
                .then(response => {
                    const data = response.data;
                    setTestCase(data.code[languages[0]].testCases[0]);
                    setPuzzleCode(data.code[languages[0]]);
                    setPuzzle(data);
                })
                .catch(error => {
                    console.error('Error fetching puzzle data:', error);
                })
        }
    }, [puzzleId]);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh"}}>
            <Grid columns="3" width="100%" pt="4" pb="4" pr="4" pl="4">
                <Flex justify="start" gap="3" align="center">
                    <PuzzleList></PuzzleList>
                    <PuzzleDetailEdit
                        puzzle={puzzle}
                        onSave={(result: PuzzleModel) => setPuzzle(result)}
                    />
                    <Select.Root value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value)}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Languages</Select.Label>
                                {languages.map((language, index) => (
                                    <Select.Item
                                        key={index}
                                        value={language}
                                    >
                                        {language.charAt(0).toUpperCase() + language.slice(1)}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </Flex>
                <Flex justify="center">
                    <Coderunner
                        code={sandboxCode}
                        testCode={puzzleCode.testCases}
                        language={selectedLanguage}
                        onClick={(result: CodeResult) => {
                            setOutput(result);
                        }}
                        onResult={(result: CodeResult) => {
                            setOutput(result);
                        }}
                    />
                </Flex>
                <Flex justify="end" gap="3">
                    <Select.Root value={String(selectedTestCase)} onValueChange={(value) => setSelectedTestCase(Number(value))}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Edit Test Case</Select.Label>
                                {puzzleCode.testCases.map((testCase, index) => (
                                    <Select.Item
                                        key={index}
                                        value={String(index)}
                                    >
                                        Case {index + 1}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                    <PuzzleTestCases
                        code={puzzleCode}
                        updatePuzzle={(result: PuzzleCode) => {
                            setPuzzleCode(result)
                        }}
                    />
                    <PuzzleDeleteButton
                        puzzle={puzzle}
                    />
                    <PuzzleSubmitButton
                        puzzle={puzzle}
                    />
                </Flex>
            </Grid>

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
                                    onCodeChange={(newCode: string) => setStartCode(newCode)}
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
                                    <Text>Test Code</Text>
                                </div>
                                <CodeEditor
                                    language={selectedLanguage}
                                    code={testCase.testCode}
                                    onCodeChange={(newCode: string) => setTestCode(newCode)}
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