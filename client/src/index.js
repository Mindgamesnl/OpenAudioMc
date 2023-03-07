import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {reportVital} from "./client/util/vitalreporter";
import meta from "./metadata.json";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

export const VERSION = {
    revision: meta.buildRevision,
    major: meta.buildMajor,
    minor: meta.buildMinor,
    tag: meta.buildTag,
    date: meta.buildDate,
    build: meta.build,
};

window.onerror = function(errorMessage, fileName, lineNumber, columnNumber, error) {
    console.error("An error occurred: ", errorMessage, " in file: ", fileName, " at line: ", lineNumber, " column: ", columnNumber, " stack: ", error && error.stack);
    let message = "An error occurred: " + errorMessage + " in file: " + fileName + " at line: " + lineNumber + " column: " + columnNumber + " stack: " + (error && error.stack);

    reportVital('error:' + message)
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
