import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app/app';
import RamService from './services/ram-service';
import { RamServiceProvider } from './components/ram-service-context/ram-service-context';

import store from './store';

const ramService = new RamService();
ReactDOM.render(
    <Provider store={store}>
        <RamServiceProvider value={ramService}>
            <Router>
                <App />
            </Router>
        </RamServiceProvider>
    </Provider>,
    document.getElementById('root')
);