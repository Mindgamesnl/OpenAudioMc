import { premadeAudioStream } from '../../../../views/login/platforms/bedrock/BedrockAuthFlow';
import { debugLog } from '../../debugging/DebugService';
import { getGlobalState } from '../../../../state/store';

export class WrappedUserMedia {
  constructor() {
    // eslint-disable-next-line no-console
    this.successCallback = (stream) => { console.error('Media success:', stream); };
    // eslint-disable-next-line no-console
    this.errorCallback = (error) => console.error('Media error:', error);
  }

  async getUserMedia(preferredDeviceId = null) {
    try {
      // Check existing stream
      if (premadeAudioStream) {
        const tracks = premadeAudioStream.getAudioTracks();
        const isHealthy = tracks.length > 0 && tracks.some((track) => track.enabled);

        if (isHealthy) {
          this.successCallback(premadeAudioStream);
          debugLog('Using premade audio stream');
          return premadeAudioStream;
        }
      }

      const constraints = {
        audio: {
          noiseSuppression: getGlobalState().settings.voiceEchoCancellation,
          echoCancellation: getGlobalState().settings.voiceEchoCancellation,
          autoGainControl: true,
          channelCount: 1,
          ...(preferredDeviceId ? { deviceId: { exact: preferredDeviceId } } : {}),
        },
      };

      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.successCallback(stream);
        return stream;
      }

      const getUserMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.msGetUserMedia;

      if (getUserMedia) {
        return new Promise((resolve, reject) => {
          getUserMedia.call(
            navigator,
            constraints,
            (stream) => {
              this.successCallback(stream);
              resolve(stream);
            },
            (error) => {
              this.errorCallback(error);
              reject(error);
            },
          );
        });
      }

      throw new Error('getUserMedia not supported');
    } catch (error) {
      this.errorCallback(error);
      throw error;
    }
  }
}
