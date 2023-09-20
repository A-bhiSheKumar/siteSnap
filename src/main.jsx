import React from 'react';
import ReactDOM from 'react-dom/client';

// staring fof redux
import { Provider } from 'react-redux';

import App from './App.jsx';
// importing the store
import {store} from './services/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
