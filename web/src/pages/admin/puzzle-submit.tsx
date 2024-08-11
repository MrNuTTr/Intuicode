import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PuzzleModel } from '../../interfaces/Puzzle';
import { useState } from 'react';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { UploadIcon } from '@radix-ui/react-icons';

interface PuzzleSubmitButtonProps {
    puzzle: PuzzleModel;
}

const PuzzleSubmitButton: React.FC<PuzzleSubmitButtonProps> = ({ puzzle }) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        let url = `/api/puzzles/${puzzle.id}`; 
        let method = 'put'; 

        if (puzzle.id === '' || puzzle.id === undefined) {
            url = '/api/puzzles';
            method = 'post';
        }

        try {
            const response = await axios({ method, url, data: puzzle });
            const newPuzzle: PuzzleModel = response.data;
            
            if (method === 'post') {
                navigate(`/admin/puzzleeditor?puzzle=${newPuzzle.id}`);
            }

            setShowSaved(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                setShowDialog(true);
            } else {
                setError('An error occurred');
                setShowDialog(true);
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            <Button variant="soft" onClick={handleSubmit} loading={isLoading}>
                <UploadIcon />
                Submit
            </Button>
            {showDialog && (
                <AlertDialog.Root open={showDialog}>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Error</AlertDialog.Title>
                        <AlertDialog.Description>
                            {error}
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button
                                    variant="soft"
                                    color="gray"
                                    onClick={() => setShowDialog(false)}>
                                    Close
                                </Button>
                            </AlertDialog.Cancel>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            )}
            {showSaved && (
                <AlertDialog.Root open={showSaved}>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Saved!</AlertDialog.Title>
                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button
                                    variant="soft"
                                    color="gray"
                                    onClick={() => setShowSaved(false)}>
                                    Close
                                </Button>
                            </AlertDialog.Cancel>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>
            )}
        </>
    );
}

export default PuzzleSubmitButton;