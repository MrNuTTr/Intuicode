import { createBoard } from '@wixc3/react-board';
import App from '../../App';
import { RUBBER_DUCKY, SCROOGE } from '../../data';

export default createBoard({
    name: 'App',
    Board: () => <App user={SCROOGE} />,
    isSnippet: true,
    environmentProps: {
        windowWidth: 1024,
        windowHeight: 768,
    },
});
