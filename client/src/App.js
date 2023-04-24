import './App.css';
import React from 'react';
import OpenAudioAppContainer from "./client/OpenAudioAppContainer";
import OpenAudioController from "./components/OpenAudioRouter";
import {Provider} from "react-redux";
import {store} from "./state/store";

function App() {
    return (
        <Provider store={store}>
            <OpenAudioAppContainer>
                <OpenAudioController/>
            </OpenAudioAppContainer>
        </Provider>
    );
}

export default App;
