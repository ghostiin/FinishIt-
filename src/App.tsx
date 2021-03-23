import React from 'react';
import { TodosProvider } from './Context/todos';
import { UserProvider } from './Context/user';
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
                <UserProvider>
                    <TodosProvider>
                        <Switch>
                            <Route exact path='/' component={ Home } />
                            <Route exact path='/review' component={ Review } />
                            {/* <Route exact path='/:action' component={ Home } /> */ }
                        </Switch>
                    </TodosProvider>
                </UserProvider>
            </Router>
        </>
    )

    return App;
}
