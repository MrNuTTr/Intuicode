import './App.css';
import '@radix-ui/themes/styles.css';
import { Spinner, Theme } from '@radix-ui/themes';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorPage from './pages/editor/EditorPage';
import HomePage from './pages/home/HomePage';
import { Suspense } from 'react';

function App() {

    return (
        <Router>
            <Theme accentColor="brown" grayColor="sand" radius="medium" appearance="dark">
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" Component={HomePage} />
                        <Route path="/editor" Component={EditorPage} />
                    </Routes>
                </Suspense>
            </Theme>
        </Router>
    );
}

export default App;
