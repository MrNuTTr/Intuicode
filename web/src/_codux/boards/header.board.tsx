import { createBoard } from '@wixc3/react-board';
import { Header } from '../../components/header';
import { RUBBER_DUCKY, SCROOGE } from '../../data';

export default createBoard({
    name: 'Header',
    Board: () => (
        <div>
            <Header
                user={SCROOGE}
            />
        </div>
    ),
    environmentProps: {
        canvasWidth: 800,
    },
    isSnippet: true,
});
