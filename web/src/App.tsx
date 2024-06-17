import './App.css';
import '@radix-ui/themes/styles.css';
import { Spinner, Theme } from '@radix-ui/themes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/editor/EditorPage';
import HomePage from './pages/home/HomePage';
import { Suspense, useState } from 'react';
import PuzzleEditorPage from './pages/admin/PuzzleEditorPage';

function App() {
    //document.body.classList.remove('dark');
    document.body.classList.add('dark');

    let dark = 'light';
    if (document.body.classList.contains('dark')) {
        dark = 'dark';
    }

    return (
        <Router>
            <Theme
                accentColor="brown"
                grayColor="sand"
                radius="medium"
                appearance={dark as 'light' | 'dark'}>
                    <Routes>
                        <Route path="/" Component={HomePage} />
                        <Route path="/editor" Component={EditorPage} />
                        <Route path="/admin/puzzleEditor" Component={PuzzleEditorPage} />
                    </Routes>
            </Theme>
        </Router>
    );
}

export default App;
