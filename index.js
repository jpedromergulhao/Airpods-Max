import React from 'react';
import ReactDOM from 'react-dom/client';
import BagList from './BagList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <BagList/>
  </React.StrictMode>
);

reportWebVitals();
