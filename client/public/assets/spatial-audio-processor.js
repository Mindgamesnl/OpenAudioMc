/* eslint-disable */

/**
 * Implements a spatial audio processor for creating 3D sound positioning effects.
 * This processor handles distance-based attenuation and stereo panning based on
 * the relative positions of audio source and listener.
 * @extends AudioWorkletProcessor
 */
class SimplifiedSpatialProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this._sourceX = 0;
    this._sourceY = 0;
    this._sourceZ = 0;

    this._listenerX = 0;
    this._listenerY = 0;
    this._listenerZ = 0;

    this._listenerYaw = 0;

    this._maxDistance = 20;
    this._rolloffFactor = 1;
    this._volBooster = 1.5;
    this._minGain = 0.0;

    this._panningStrength = 5;
    this._smoothingFactor = 0.15;
    this._currentPan = 0;

    this._bypassMode = false;
    this._debugCounter = 0;

    this._cachedDistance = 0;
    this._cachedDistanceGain = 1.0;
    this._cachedLeftGain = 0.5;
    this._cachedRightGain = 0.5;

    this._positionsChanged = true;
    this._settingsChanged = true;

    this.port.onmessage = (event) => this._handleMessage(event.data);

    this.port.postMessage({ type: 'debug', message: 'Improved spatial processor initialized' });
  }

  /**
   * Handles incoming messages from the main thread to update processor parameters.
   * @param {Object} data - The message data object
   */
  _handleMessage(data) {
    if (data.type === 'source-position') {
      if (this._sourceX !== data.x || this._sourceY !== data.y || this._sourceZ !== data.z) {
        this._sourceX = data.x;
        this._sourceY = data.y;
        this._sourceZ = data.z;
        this._positionsChanged = true;
      }
    } else if (data.type === 'listener-position') {
      if (this._listenerX !== data.x || this._listenerY !== data.y || this._listenerZ !== data.z) {
        this._listenerX = data.x;
        this._listenerY = data.y;
        this._listenerZ = data.z;
        this._positionsChanged = true;
      }
    } else if (data.type === 'listener-yaw') {
      if (this._listenerYaw !== data.yaw) {
        this._listenerYaw = data.yaw;
        this._positionsChanged = true;
      }
    } else if (data.type === 'audio-settings') {
      let changed = false;

      if (data.maxDistance !== undefined && this._maxDistance !== data.maxDistance) {
        this._maxDistance = data.maxDistance;
        changed = true;
      }

      if (data.rolloffFactor !== undefined && this._rolloffFactor !== data.rolloffFactor) {
        this._rolloffFactor = data.rolloffFactor;
        changed = true;
        this._positionsChanged = true
      }

      if (data.volBooster !== undefined && this._volBooster !== data.volBooster) {
        this._volBooster = data.volBooster;
        changed = true;
      }

      if (data.minGain !== undefined && this._minGain !== data.minGain) {
        this._minGain = data.minGain;
        changed = true;
      }

      if (data.smoothingFactor !== undefined && this._smoothingFactor !== data.smoothingFactor) {
        this._smoothingFactor = data.smoothingFactor;
        changed = true;
      }

      if (data.stereoSeparation !== undefined && this._panningStrength !== data.stereoSeparation) {
        this._panningStrength = data.stereoSeparation;
        changed = true;
        this._positionsChanged = true
      }

      if (data.bypass !== undefined && this._bypassMode !== data.bypass) {
        this._bypassMode = data.bypass;
        changed = true;
      }

      if (changed) {
        this._settingsChanged = true;
      }
    } else if (data.type === 'bypass-mode') {
      this._bypassMode = data.enabled;
      this.port.postMessage({
        type: 'debug',
        message: `Bypass mode ${this._bypassMode ? 'enabled' : 'disabled'}`
      });
    }
  }

  /**
   * Calculates the Euclidean distance between source and listener positions.
   * @returns {number} The calculated distance
   */
  _calculateSimpleDistance() {
    const dx = this._sourceX - this._listenerX;
    const dy = this._sourceY - this._listenerY;
    const dz = this._sourceZ - this._listenerZ;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   * Calculates the gain factor based on distance for audio attenuation.
   * @param {number} distance - The distance between source and listener
   * @returns {number} The calculated gain factor
   */
  _calculateGain(distance) {
    if (distance < 1) {
      return 1.0;
    }

    if (distance >= this._maxDistance) {
      return this._minGain;
    }

    const distanceRatio = distance / this._maxDistance;
    const gain = Math.pow(1 - distanceRatio, this._rolloffFactor);

    return Math.max(this._minGain, Math.min(1.0, gain));
  }

  /**
   * Calculates stereo panning values based on the relative position of source to listener.
   * @returns {Object} Object containing leftGain, rightGain and pan values
   */
  _calculatePanning() {
    const dx = this._sourceX - this._listenerX;
    const dz = this._sourceZ - this._listenerZ;

    const angleToSource = Math.atan2(dx, dz);

    let relativeAngle = angleToSource - this._listenerYaw;

    relativeAngle = -relativeAngle;

    while (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
    while (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;

    let pan = Math.sin(relativeAngle) * this._panningStrength;

    if (Math.abs(relativeAngle) > Math.PI / 2) {
      const behindFactor = 1.2;
      pan *= behindFactor;

      this._cachedDistanceGain *= 0.85;
    }

    const clampedPan = Math.max(-1, Math.min(1, pan));

    this._currentPan = this._currentPan + this._smoothingFactor * (clampedPan - this._currentPan);

    const angle = (this._currentPan + 1) * Math.PI / 4;

    const power = 0.8;
    const leftGain = Math.pow(Math.cos(angle), power);
    const rightGain = Math.pow(Math.sin(angle), power);

    return { leftGain, rightGain, pan: this._currentPan };
  }

  /**
   * Updates audio calculations if positions or settings have changed.
   * @returns {boolean} Whether calculations were updated
   */
  _updateAudioCalculations() {
    if (this._positionsChanged || this._settingsChanged) {
      this._cachedDistance = this._calculateSimpleDistance();
      this._cachedDistanceGain = this._calculateGain(this._cachedDistance);

      const { leftGain, rightGain, pan } = this._calculatePanning();
      this._cachedLeftGain = leftGain;
      this._cachedRightGain = rightGain;

      if (this._debugCounter % 5 === 0) {
        this.port.postMessage({
          type: 'debug',
          message: `Spatial: dist=${this._cachedDistance.toFixed(2)}, gain=${this._cachedDistanceGain.toFixed(2)}, pan=${pan.toFixed(2)}, L=${leftGain.toFixed(2)}, R=${rightGain.toFixed(2)}`
        });
      }
      this._debugCounter++;

      this._positionsChanged = false;
      this._settingsChanged = false;

      return true;
    }

    return false;
  }

  /**
   * Processes audio data by applying spatial effects.
   * @param {Float32Array[][]} inputs - Array of input audio channels
   * @param {Float32Array[][]} outputs - Array of output audio channels
   * @param {Object} parameters - Processing parameters
   * @returns {boolean} Whether to continue processing
   */
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    if (!input || !input.length || !output || !output.length) {
      return true;
    }

    if (this._bypassMode) {
      const inputChannel = input[0];
      if (inputChannel) {
        for (let i = 0; i < output.length; i++) {
          const outputChannel = output[i];
          if (outputChannel) {
            for (let j = 0; j < outputChannel.length; j++) {
              outputChannel[j] = inputChannel[j] * this._volBooster;
            }
          }
        }
      }
      return true;
    }

    this._updateAudioCalculations();

    const inputChannel = input[0];
    const outputLeft = output[0];
    const outputRight = output.length > 1 ? output[1] : output[0];

    if (inputChannel && outputLeft && outputRight) {
      for (let i = 0; i < inputChannel.length; i++) {
        const sample = inputChannel[i] * this._cachedDistanceGain * this._volBooster;
        outputLeft[i] = sample * this._cachedLeftGain;
        outputRight[i] = sample * this._cachedRightGain;
      }
    }

    return true;
  }
}

registerProcessor('simplified-spatial-processor', SimplifiedSpatialProcessor);
