import { Button, Dialog, DropdownMenu, Flex, SegmentedControl, Text, TextArea, TextField } from '@radix-ui/themes';
import { Cross2Icon, InputIcon, RowsIcon, TrashIcon } from '@radix-ui/react-icons';
import { PuzzleCode, PuzzleModel } from '../../interfaces/Puzzle';
import { useEffect, useState } from 'react';

interface PuzzleDetailEditProps {
    puzzle: PuzzleModel;
    onSave: (result: PuzzleModel) => void;
}

const PuzzleDetailEdit: React.FC<PuzzleDetailEditProps> = ({ puzzle, onSave }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState(0);
    const [description, setDescription] = useState('');
    const [sequenceNumber, setSequenceNumber] = useState(1000);
    const [hints, setHints] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const categories = ['campaign', 'challenge', 'hidden'];
    const difficulties = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const reset = () => {
        setName(puzzle.name);
        setCategory(puzzle.category);
        setDifficulty(puzzle.difficulty);
        setDescription(puzzle.description);
        setSequenceNumber(puzzle.sequenceNumber);
        setHints(puzzle.hints);
        setTags(puzzle.tags);
    }

    const addHint = () => {
        setHints([...hints, '']);
    };

    const addTag = () => {
        setTags([...tags, '']);
    };

    const updateHint = (index: number, value: string) => {
        const newHints = [...hints];
        newHints[index] = value;
        setHints(newHints);
    };

    const updateTag = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const removeHint = (index: number) => {
        setHints(hints.filter((_, i) => i !== index));
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const save = () => {
        puzzle.name = name;
        puzzle.category = category;
        puzzle.difficulty = difficulty;
        puzzle.sequenceNumber = sequenceNumber;
        puzzle.description = description;
        puzzle.hints = hints;
        puzzle.tags = tags.map(tag => tag.toLowerCase());

        onSave(puzzle);
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    variant="soft"
                    onClick={reset}
                >
                    <InputIcon />
                    Details
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title align="center">Puzzle Details</Dialog.Title>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="Puzzle name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Category
                        </Text>
                        <SegmentedControl.Root defaultValue={category}>
                            {categories.map(category => (
                                <SegmentedControl.Item
                                    key={category}
                                    value={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SegmentedControl.Item>
                            ))}
                        </SegmentedControl.Root>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Difficulty
                        </Text>
                        <SegmentedControl.Root defaultValue={String(difficulty)}>
                            {difficulties.map(difficulty => (
                                <SegmentedControl.Item
                                    key={difficulty}
                                    value={String(difficulty)}
                                    onClick={() => setDifficulty(Number(difficulty))}
                                >
                                    {difficulty}
                                </SegmentedControl.Item>
                            ))}
                        </SegmentedControl.Root>
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextArea
                            defaultValue=""
                            placeholder="A short (or long) description of the puzzle."
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Sequence Number
                        </Text>
                        <TextField.Root
                            defaultValue=""
                            placeholder="1000"
                            value={sequenceNumber}
                            onChange={(event) => {
                                const value = Number(event.target.value);
                                if (!isNaN(value)) {
                                    setSequenceNumber(value);
                                }
                            }}
                        />
                    </label>
                    <div>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Hints (in unlock order)
                        </Text>
                        <Flex direction="column" gap="3">
                            {hints.map((hint, index) => (
                                <div key={index} style={{ position: 'relative', width: '100%' }}>
                                    <TextField.Root
                                        value={hint}
                                        onChange={(event) => updateHint(index, event.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                    <Button
                                        variant='ghost'
                                        onClick={() => removeHint(index)}
                                        style={{ position: 'absolute', right: '15px', transform: 'translateY(-102%)' }}>
                                        <TrashIcon />
                                    </Button>
                                </div>
                            ))}
                            <Button variant='outline' onClick={addHint}>Add Hint</Button>
                        </Flex>
                    </div>
                    <div>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Tags
                        </Text>
                        <Flex direction="column" gap="3">
                            {tags.map((tag, index) => (
                                <div key={index} style={{ position: 'relative', width: '100%' }}>
                                    <TextField.Root
                                        value={tag}
                                        onChange={(event) => updateTag(index, event.target.value)}
                                        style={{ width: '100%' }}
                                    />
                                    <Button
                                        variant='ghost'
                                        onClick={() => removeTag(index)}
                                        style={{ position: 'absolute', right: '15px', transform: 'translateY(-102%)' }}>
                                        <TrashIcon />
                                    </Button>
                                </div>
                            ))}
                            <Button variant='outline' onClick={addTag}>Add Tag</Button>
                        </Flex>
                    </div>

                </Flex>
                <Flex justify="end" pt="4">
                    <Dialog.Close>
                        <Button
                            variant="soft"
                            onClick={save}
                        >
                            Save
                        </Button>
                    </Dialog.Close>
                </Flex>

                <Dialog.Close>
                    <Button variant="ghost" className="closeButton">
                        <Cross2Icon />
                    </Button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root >
    );
}

export default PuzzleDetailEdit;