import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bulma/css/bulma.min.css';
import { AppStateProvider } from './useAppState';

ReactDOM.render(
    <AppStateProvider>
        <App />
    </AppStateProvider>,
    document.getElementById('root')
);
