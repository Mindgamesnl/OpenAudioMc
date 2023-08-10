import { AbstractMicMiddleware } from './AbstractMicMiddleware';
import { PitchShifter } from './PitchShifter';

export class PitchShiftMicMiddleware extends AbstractMicMiddleware {
  constructor(pitchRatio = 0.7, grainSize = 512, overlapRatio = 0.50) {
    super();
    this.pitchRatio = pitchRatio;
    this.grainSize = grainSize;
    this.overlapRatio = overlapRatio;
  }

  unlink() {
    this.pitchShifter.disconnect();
  }

  link(context, from, to) {
    this.pitchShifter = new PitchShifter(
      from,
      context,
      to,
      this.pitchRatio,
      this.grainSize,
      this.overlapRatio,
    );
  }
}
