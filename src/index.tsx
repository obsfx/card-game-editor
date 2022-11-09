import React from 'react';
import ReactDOM from 'react-dom/client';

import 'normalize.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
