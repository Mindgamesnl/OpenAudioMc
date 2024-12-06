/* eslint-disable */
/*
 * This is a fork of hark.js, which is licensed under the MIT license.
 * The original source code can be found at https://github.com/latentflip/hark
 */
import WildEmitter from "wildemitter";

function getMaxVolume(analyser, fftBins) {
    let maxVolume = -Infinity;
    analyser.getFloatFrequencyData(fftBins);
    for(let i=4; i < fftBins.length; i++) {
        if (fftBins[i] > maxVolume && fftBins[i] < 0) {
            maxVolume = fftBins[i];
        }
    }
    return maxVolume;
}

let audioContextType = (typeof window !== 'undefined') ?
  (window.AudioContext || window.webkitAudioContext) : null;
let audioContext = null;

export function Hark(stream, options) {
    const harker = new WildEmitter();
    if (!audioContextType) return harker;

    options = options || {};
    const smoothing = options.smoothing || 0.1;
    let interval = options.interval || 50;
    let threshold = options.threshold;
    const play = options.play;
    const history = options.history || 10;
    let running = true;

    audioContext = options.audioContext || audioContext || new audioContextType();

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = smoothing;
    const fftBins = new Float32Array(analyser.frequencyBinCount);

    let sourceNode = options.source;
    if (!sourceNode) {
        if (stream instanceof HTMLAudioElement || stream instanceof HTMLVideoElement) {
            sourceNode = audioContext.createMediaElementSource(stream);
            threshold = threshold || -50;
        } else {
            sourceNode = audioContext.createMediaStreamSource(stream);
            threshold = threshold || -50;
        }
    }

    sourceNode.connect(analyser);
    if (play) analyser.connect(audioContext.destination);

    harker.speaking = false;
    harker.ctx = audioContext;
    harker.source = sourceNode;

    // Check initial volume immediately
    const initialVolume = getMaxVolume(analyser, fftBins);
    harker.speaking = initialVolume > threshold;
    if (harker.speaking) {
        harker.emit('speaking');
    }

    harker.speakingHistory = new Array(history).fill(harker.speaking ? 1 : 0);

    harker.suspend = () => audioContext.suspend();
    harker.resume = () => audioContext.resume();
    harker.getThreshold = () => threshold;
    harker.setThreshold = (t) => { threshold = t; };
    harker.setInterval = (i) => { interval = i; };

    Object.defineProperty(harker, 'state', {
        get: () => audioContext.state
    });

    audioContext.onstatechange = () => {
        harker.emit('state_change', audioContext.state);
    };

    harker.stop = () => {
        running = false;
        harker.emit('volume_change', -100, threshold);
        if (harker.speaking) {
            harker.speaking = false;
            harker.emit('stopped_speaking');
        }
        analyser.disconnect();
        sourceNode.disconnect();
    };

    const looper = () => {
        if (!running) return;

        const currentVolume = getMaxVolume(analyser, fftBins);
        harker.emit('volume_change', currentVolume, threshold);

        const history = harker.speakingHistory
          .slice(-3)
          .reduce((sum, val) => sum + val, 0);

        if (currentVolume > threshold && !harker.speaking && history >= 2) {
            harker.speaking = true;
            harker.emit('speaking');
        } else if (currentVolume < threshold && harker.speaking &&
          harker.speakingHistory.reduce((sum, val) => sum + val, 0) === 0) {
            harker.speaking = false;
            harker.emit('stopped_speaking');
        }

        harker.speakingHistory.shift();
        harker.speakingHistory.push(Number(currentVolume > threshold));

        setTimeout(looper, interval);
    };

    looper();
    return harker;
}
