import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import OpenAudioAppContainer from './client/OpenAudioAppContainer';
import OpenAudioController from './components/OpenAudioRouter';
import { store } from './state/store';
import NoSleepComponent from './components/activity/browser-activity';
import FadeTo from './components/fadeto/fadeto';

function App() {
  return (
    <Provider store={store}>
      <NoSleepComponent>
        <FadeTo>
          <OpenAudioAppContainer>
            <OpenAudioController />
          </OpenAudioAppContainer>
        </FadeTo>
      </NoSleepComponent>
    </Provider>
  );
}

export default App;
