import { createBoard } from '@wixc3/react-board';
import HomePage from '../../pages/home/HomePage';
import CoduxTheme from '../codux-theme';

const ThemedPage = CoduxTheme(HomePage);

export default createBoard({
    name: 'Home Page',
    Board: () => (
        <div>
            <ThemedPage />
        </div>
    ),
    isSnippet: true,
});