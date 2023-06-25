import './App.css';
import React from 'react';
import OpenAudioAppContainer from "./client/OpenAudioAppContainer";
import OpenAudioController from "./components/OpenAudioRouter";
import {Provider} from "react-redux";
import {store} from "./state/store";
import NoSleep from 'nosleep.js';

function App() {
    return (
        <Provider store={store}>
            <OpenAudioAppContainer>
                <OpenAudioController/>
            </OpenAudioAppContainer>
        </Provider>
    );
}

// todo. remove this
export const noSleep = new NoSleep();

function enableNoSleep() {
    document.removeEventListener('click', enableNoSleep, false);
    noSleep.enable();
}

// on click or mobile tap, keep screen on
document.addEventListener('touchstart',enableNoSleep, false);

document.addEventListener('click', enableNoSleep, false);

export default App;
