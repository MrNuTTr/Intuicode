import { AlertDialog, Button, Dialog, DropdownMenu, Flex, SegmentedControl, Text, TextArea, TextField } from '@radix-ui/themes';
import { Cross2Icon, RowsIcon, TrashIcon } from '@radix-ui/react-icons';
import { PuzzleCode, PuzzleModel } from '../../interfaces/Puzzle';
import { useEffect, useState } from 'react';

interface PuzzleDeleteButtonProps {
    puzzle: PuzzleModel;
}

const PuzzleDeleteButton: React.FC<PuzzleDeleteButtonProps> = ({ puzzle }) => {


    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button variant="soft">
                    <TrashIcon />
                    Delete
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Delete Puzzle</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure? This cannot be undone.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red">
                            Delete
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default PuzzleDeleteButton;