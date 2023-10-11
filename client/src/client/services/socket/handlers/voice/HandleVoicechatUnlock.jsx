import { toast } from 'react-toastify';
import { getGlobalState, setGlobalState } from '../../../../../state/store';
import { VoiceModule } from '../../../voice/VoiceModule';

export function HandleVoiceUnlock(data) {
  // check if voice is even enabled
  if (RTCPeerConnection == null) {
    toast.error('Your browser doesn\'t  support WebRTC, or it could be that a plugin or manual setting disabled it. OpenAudioMc promises only to use WebRTC for its intended purposes (serve media). Please check your browser settings and plugins, and then try again once you enabled it.', {
      position: 'bottom-right',
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    return;
  }

  setGlobalState({
    voiceState: {
      enabled: true,
      streamServer: data.streamServer,
      streamKey: data.streamKey,
      radius: data.radius,
      serverHasModeration: data.hasModeration,
    },
  });

  // is it set to auto join?
  if (getGlobalState().voiceState.autoJoinVoiceChat) {
    // is the user in context yet?
    startVcWhenReady();
  }
}

let taskId = null;

function startVcWhenReady() {
  // cancel previous task if it exists
  if (taskId != null) {
    clearInterval(taskId);
  }

  // check every 150ms if the user is in context
  taskId = setInterval(() => {
    if (getGlobalState().currentUser != null) {
      // cancel task
      clearInterval(taskId);
      // start vc
      VoiceModule.startVoiceChat();
    }
  });
}
