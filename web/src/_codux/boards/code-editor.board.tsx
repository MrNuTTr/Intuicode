import { createBoard } from '@wixc3/react-board';
import EditorPage from '../../pages/editor/EditorPage';
import CoduxTheme from '../codux-theme';

const ThemedEditorPage = CoduxTheme(EditorPage);

export default createBoard({
    name: 'Code Editor',
    Board: () => (
        <div>
            <ThemedEditorPage />
        </div>
    ),
    isSnippet: true,
});