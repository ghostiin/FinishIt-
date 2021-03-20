import React from 'react';
import { TodosProvider } from './Context';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import './global.scss';
import Home from './Home';
import Review from './Review';

export default () => {

    const App = (
        <>
            <Router>
                <TodosProvider>
                    <Switch>
                        <Route exact path='/' component={ Home } />
                        <Route exact path='/review' component={ Review } />
                    </Switch>
                </TodosProvider>
            </Router>
        </>
    )

    return App;
}
