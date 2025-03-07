import './App.css';
import 'react-tooltip/dist/react-tooltip.css';
import React, { memo } from 'react';
import { Provider } from 'react-redux';
import OpenAudioAppContainer from './client/OpenAudioAppContainer';
import OpenAudioController from './components/OpenAudioRouter';
import { store } from './state/store';
import NoSleepComponent from './components/activity/browser-activity';
import FadeTo from './components/fadeto/fadeto';
import CriticalErrorWrapper from './components/error/CriticalErrorWrapper';

const MemoizedOpenAudioController = memo(OpenAudioController);

function App() {
  return (
    <Provider store={store}>
      <CriticalErrorWrapper>
        <NoSleepComponent>
          <FadeTo>
            <OpenAudioAppContainer>
              <MemoizedOpenAudioController />
            </OpenAudioAppContainer>
          </FadeTo>
        </NoSleepComponent>
      </CriticalErrorWrapper>
    </Provider>
  );
}

export default App;
