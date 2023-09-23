import './oa.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { reportVital } from './client/util/vitalreporter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />,
);

window.onerror = function handle(errorMessage, fileName, lineNumber, columnNumber, error) {
  // eslint-disable-next-line no-console
  console.error('An error occurred: ', errorMessage, ' in file: ', fileName, ' at line: ', lineNumber, ' column: ', columnNumber, ' stack: ', error && error.stack);
  const message = `An error occurred: ${errorMessage} in file: ${fileName} at line: ${lineNumber} column: ${columnNumber} stack: ${error && error.stack}`;
  reportVital(`error:${message}`);
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
