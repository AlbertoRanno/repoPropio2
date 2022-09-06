import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/master.css';
import Web from './components/Web';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Web />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
