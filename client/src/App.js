import './App.css';
import React from 'react';
import OpenAudioAppContainer from "./client/OpenAudioAppContainer";
import OpenAudioController from "./components/OpenAudioRouter";
import {Provider} from "react-redux";
import {store} from "./state/store";
import NoSleepComponent from "./components/activity/browser-activity";

function App() {
    return (
        <Provider store={store}>
            <NoSleepComponent>
                <OpenAudioAppContainer>
                    <OpenAudioController/>
                </OpenAudioAppContainer>
            </NoSleepComponent>
        </Provider>
    );
}

export default App;
