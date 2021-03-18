import React from 'react';
import { TodosProvider } from './Context';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import './global.scss';
import Home from './Home';

export default () => {

    const App = (
        <>
            <Router>
                <TodosProvider>
                    <Route exact path='/' component={ Home } />
                </TodosProvider>
            </Router>
        </>
    )

    return App;
}
