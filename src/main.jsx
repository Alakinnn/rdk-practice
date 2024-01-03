import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

// Import store and provider
import store from './stores/store';
import { Provider } from 'react-redux';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
