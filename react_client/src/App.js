import './App.css';
import React from 'react';
import {OpenAudioAppContainer} from "./client/OpenAudioAppContainer";
import {PageContainer} from "./components/layout/PageContainer";
import {OpenAudioController} from "./components/OpenAudioRouter";

function App() {
    return (
        <OpenAudioAppContainer>
            <OpenAudioController/>
        </OpenAudioAppContainer>
    );
}

export default App;
