export class PitchShifter {
  constructor(input, context, output, pitchRatio = 0.7, grainSize = 512, overlapRatio = 0.50) {
    let pitchShifterProcessor;

    if (context.createScriptProcessor) {
      pitchShifterProcessor = context.createScriptProcessor(grainSize, 1, 1);
    } else if (context.createJavaScriptNode) {
      pitchShifterProcessor = context.createJavaScriptNode(grainSize, 1, 1);
    }

    pitchShifterProcessor.buffer = new Float32Array(grainSize * 2);
    pitchShifterProcessor.grainWindow = this.hannWindow(grainSize);
    pitchShifterProcessor.onaudioprocess = (event) => {
      const inputData = event.inputBuffer.getChannelData(0);
      const outputData = event.outputBuffer.getChannelData(0);

      for (let i = 0; i < inputData.length; i++) {
        // Apply the window to the input buffer
        inputData[i] *= pitchShifterProcessor.grainWindow[i];

        // Shift half of the buffer
        pitchShifterProcessor.buffer[i] = pitchShifterProcessor.buffer[i + grainSize];

        // Empty the buffer tail
        pitchShifterProcessor.buffer[i + grainSize] = 0.0;
      }

      // Calculate the pitch shifted grain re-sampling and looping the input
      const grainData = new Float32Array(grainSize * 2);
      for (let i = 0, j = 0.0;
        i < grainSize;
        i++, j += pitchRatio) {
        const index = Math.floor(j) % grainSize;
        const a = inputData[index];
        const b = inputData[(index + 1) % grainSize];
        grainData[i] += this.linearInterpolation(a, b, j % 1.0) * pitchShifterProcessor.grainWindow[i];
      }

      // Copy the grain multiple times overlapping it
      for (let i = 0; i < grainSize; i += Math.round(grainSize * (1 - overlapRatio))) {
        for (let j = 0; j <= grainSize; j++) {
          pitchShifterProcessor.buffer[i + j] += grainData[j];
        }
      }

      // Output the first half of the buffer
      for (let i = 0; i < grainSize; i++) {
        outputData[i] = pitchShifterProcessor.buffer[i];
      }
    };

    this.input = input;
    input.connect(pitchShifterProcessor);
    this.pitchShifterProcessor = pitchShifterProcessor;
    this.wrapperNode = context.createMediaStreamDestination();
    pitchShifterProcessor.connect(output);
  }

  disconnect() {
    this.input.disconnect();
    this.pitchShifterProcessor.disconnect();
    this.wrapperNode.disconnect();
  }

  linearInterpolation(a, b, t) {
    return a + (b - a) * t;
  }

  hannWindow(length) {
    const window = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)));
    }
    return window;
  }
}
