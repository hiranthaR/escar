import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App';
import Index from './components/Index'
import * as serviceWorker from './serviceWorker';

require('dotenv').config();

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Index} />
            </Switch>
        </App>
    </BrowserRouter>
    , document.getElementById('root'));

serviceWorker.unregister();