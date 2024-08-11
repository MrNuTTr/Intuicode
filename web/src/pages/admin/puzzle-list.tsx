import { ButtonIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import { Button, Text } from '@radix-ui/themes';

const PuzzleList: React.FC = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant='soft'>
                    <HamburgerMenuIcon />
                    Puzzle List
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Text>
                            Name
                        </Text>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default PuzzleList;
