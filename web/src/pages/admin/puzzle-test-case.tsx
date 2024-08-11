import { Button, Card, Checkbox, CheckboxCards, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { Cross2Icon, InputIcon, RulerSquareIcon, TrashIcon } from '@radix-ui/react-icons';
import { PuzzleCode, TestCase } from '../../interfaces/Puzzle';
import { useEffect, useState } from 'react';

interface PuzzleTestCaseProps {
    code: PuzzleCode;
    updatePuzzle: (result: PuzzleCode) => void;
}

const PuzzleTestCases: React.FC<PuzzleTestCaseProps> = ({ code, updatePuzzle }) => {
    const [puzzleCode, setPuzzleCode] = useState<PuzzleCode>({ ...code });

    useEffect(() => {
        setPuzzleCode({ ...code });
    }, [code]);

    const handleTimeoutChange = (index: number, value: string) => {
        const newPuzzleCode = { ...puzzleCode };
        newPuzzleCode.testCases[index].timeoutSeconds = Number(value);
        setPuzzleCode(newPuzzleCode);
    }

    const handleHiddenChange = (index: number, value: boolean) => {
        const newPuzzleCode = { ...puzzleCode };
        newPuzzleCode.testCases[index].hidden = value;
        setPuzzleCode(newPuzzleCode);
    }

    const handleDelete = (index: number) => {
        const newPuzzleCode = { ...puzzleCode };
        newPuzzleCode.testCases.splice(index, 1);
        setPuzzleCode(newPuzzleCode);
    }

    const handleAdd = () => {
        const newPuzzleCode = { ...puzzleCode };
        newPuzzleCode.testCases.push({
            timeoutSeconds: 0,
            setupCode: '',
            testCode: '#Do not remove function header\ndef assert_user_code(user_code, variables, stdout):\n',
            hidden: false
        });
        setPuzzleCode(newPuzzleCode);
    }

    const handleSave = () => {
        updatePuzzle(puzzleCode);
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="soft">
                    <RulerSquareIcon />
                    Test Cases
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title align="center">Test Cases</Dialog.Title>

                <Flex gap="3" direction="column">
                    {puzzleCode.testCases.map((testCase, index) => (
                        <Card key={index}>
                            <Flex direction="column" gap="3">
                                <Flex justify="center">
                                    <Text size="5">
                                        Case {index + 1}
                                    </Text>
                                </Flex>
                                <Flex justify="start" align="center" gap="4">
                                    <TextField.Root
                                        type="number"
                                        placeholder="Timeout in seconds"
                                        value={testCase.timeoutSeconds}
                                        onChange={(event) => handleTimeoutChange(index, event.target.value)}
                                        style={{ width: "40px", textAlign: "center", paddingRight: "6px" }}
                                    />
                                    <Text align="center">Timeout (seconds)</Text>
                                </Flex>
                                <Flex direction="row" gap="3">
                                    <Checkbox
                                        checked={testCase.hidden}
                                        onCheckedChange={(value) => typeof value === 'boolean' && handleHiddenChange(index, value)}
                                    />
                                    <Text>
                                        Hidden
                                    </Text>
                                </Flex>
                                <Button 
                                    variant='soft'
                                    onClick={() => handleDelete(index)}>
                                    <TrashIcon />
                                </Button>
                            </Flex>
                        </Card>
                    ))}

                    <Button variant="outline" onClick={handleAdd}>
                        Add Test Case
                    </Button>
                </Flex>
                
                <Dialog.Close>
                    <Flex justify="end" pt="3">
                        <Button variant="soft" onClick={handleSave}>
                            Save
                        </Button>
                    </Flex>
                </Dialog.Close>
                
                <Dialog.Close>
                    <Button variant="ghost" className="closeButton">
                        <Cross2Icon />
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default PuzzleTestCases;
