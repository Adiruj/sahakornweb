import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {HashRouter , BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

const store = createStore(reducer);

const app = (
    <Provider store={store}>
        <HashRouter basename={config.basename}>
            <Switch>
                <App />
            </Switch>
            
        </HashRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
