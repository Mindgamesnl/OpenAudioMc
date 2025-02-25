/* eslint-disable */

/**
 * Implements a spatial audio processor for creating 3D sound positioning effects.
 * This processor handles distance-based attenuation and stereo panning based on
 * the relative positions of audio source and listener, with a cardioid pickup pattern.
 * @extends AudioWorkletProcessor
 */
class CardioidSpatialProcessor extends AudioWorkletProcessor {
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

    // Cardioid pattern specific parameters - gentler for voice chat
    this._cardioidFactor = 0.25; // Lower value for a more subtle cardioid shape
    this._frontGainBoost = 1.0; // Front direction gain multiplier (unchanged)
    this._rearAttenuation = 0.7; // Higher value (0.7) for less aggressive rear attenuation

    this._bypassMode = false;
    this._debugCounter = 0;

    this._cachedDistance = 0;
    this._cachedDistanceGain = 1.0;
    this._cachedDirectionalGain = 1.0; // For cardioid pattern
    this._cachedLeftGain = 0.5;
    this._cachedRightGain = 0.5;

    this._positionsChanged = true;
    this._settingsChanged = true;

    this.port.onmessage = (event) => this._handleMessage(event.data);

    this.port.postMessage({ type: 'debug', message: 'Cardioid spatial processor initialized' });
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

      // Add cardioid pattern specific settings
      if (data.cardioidFactor !== undefined && this._cardioidFactor !== data.cardioidFactor) {
        this._cardioidFactor = data.cardioidFactor;
        changed = true;
        this._positionsChanged = true;
      }

      if (data.frontGainBoost !== undefined && this._frontGainBoost !== data.frontGainBoost) {
        this._frontGainBoost = data.frontGainBoost;
        changed = true;
        this._positionsChanged = true;
      }

      if (data.rearAttenuation !== undefined && this._rearAttenuation !== data.rearAttenuation) {
        this._rearAttenuation = data.rearAttenuation;
        changed = true;
        this._positionsChanged = true;
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
   * Calculates the directional gain factor based on a gentle cardioid pattern for voice chat.
   * @param {number} relativeAngle - The angle between listener forward vector and source position
   * @returns {number} The calculated directional gain factor
   */
  _calculateCardioidGain(relativeAngle) {
    // Normalize the angle to be between 0-180 degrees (0-PI radians)
    const absAngle = Math.abs(relativeAngle);

    // Modified approach for gentle cardioid effect:
    // 1. Start with a basic cardioid formula
    // 2. But make it less aggressive by blending with a constant value
    const basicCardioid = 0.5 * (1 + Math.cos(absAngle));

    // Apply a gentler curve by blending with a baseline
    // This ensures people behind you are still clearly audible
    const baselineLevel = 0.8; // High baseline ensures minimum attenuation
    let blendedGain = baselineLevel + (1 - baselineLevel) * basicCardioid;

    // Apply a very gentle cardioid shaping factor
    let gain = Math.pow(blendedGain, this._cardioidFactor);

    // Apply subtle front boost and rear attenuation
    if (absAngle < Math.PI / 2) {
      // Front half (0-90 degrees)
      gain = gain * this._frontGainBoost;
    } else {
      // Rear half (90-180 degrees)
      gain = gain * this._rearAttenuation;
    }

    return Math.max(this._minGain, Math.min(1.0, gain));
  }

  /**
   * Calculates stereo panning values based on the relative position of source to listener.
   * @returns {Object} Object containing leftGain, rightGain, pan and directionalGain values
   */
  _calculatePanning() {
    const dx = this._sourceX - this._listenerX;
    const dz = this._sourceZ - this._listenerZ;

    const angleToSource = Math.atan2(dx, dz);

    let relativeAngle = angleToSource - this._listenerYaw;

    relativeAngle = -relativeAngle;

    while (relativeAngle > Math.PI) relativeAngle -= 2 * Math.PI;
    while (relativeAngle < -Math.PI) relativeAngle += 2 * Math.PI;

    // Calculate cardioid pattern gain based on the relative angle
    const directionalGain = this._calculateCardioidGain(relativeAngle);

    // Dead zone for small angles - force center panning when looking almost directly at source
    const deadZoneAngle = 0.12;
    if (Math.abs(relativeAngle) < deadZoneAngle) {
      relativeAngle = 0;
    }

    let pan = Math.sin(relativeAngle) * this._panningStrength;

    if (Math.abs(relativeAngle) > Math.PI / 2) {
      const behindFactor = 1.2;
      pan *= behindFactor;
    }

    const clampedPan = Math.max(-1, Math.min(1, pan));

    this._currentPan = this._currentPan + this._smoothingFactor * (clampedPan - this._currentPan);

    // Equal power panning corrected implementation
    const panValue = this._currentPan * 0.5;
    let leftGain, rightGain;

    // Wider tolerance for considering something as centered
    if (Math.abs(panValue) < 0.05) {
      // Special case for center to ensure perfect balance
      leftGain = rightGain = 0.5;
    } else {
      // Use equal power panning formula
      leftGain = Math.cos((panValue + 0.5) * Math.PI / 2);
      rightGain = Math.sin((panValue + 0.5) * Math.PI / 2);

      // Normalize to ensure total power is consistent
      const totalGain = leftGain + rightGain;
      leftGain /= totalGain;
      rightGain /= totalGain;
    }

    return { leftGain, rightGain, pan: this._currentPan, directionalGain };
  }

  /**
   * Updates audio calculations if positions or settings have changed.
   * @returns {boolean} Whether calculations were updated
   */
  _updateAudioCalculations() {
    if (this._positionsChanged || this._settingsChanged) {
      this._cachedDistance = this._calculateSimpleDistance();
      this._cachedDistanceGain = this._calculateGain(this._cachedDistance);

      const { leftGain, rightGain, pan, directionalGain } = this._calculatePanning();
      this._cachedLeftGain = leftGain;
      this._cachedRightGain = rightGain;
      this._cachedDirectionalGain = directionalGain;

      if (this._debugCounter % 5 === 0) {
        this.port.postMessage({
          type: 'debug',
          message: `Cardioid Spatial: dist=${this._cachedDistance.toFixed(2)}, gain=${this._cachedDistanceGain.toFixed(2)}, dirGain=${directionalGain.toFixed(2)}, pan=${pan.toFixed(2)}, L=${leftGain.toFixed(2)}, R=${rightGain.toFixed(2)}`
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
      // Apply both distance attenuation and directional (cardioid) gain
      for (let i = 0; i < inputChannel.length; i++) {
        const sample = inputChannel[i] * this._cachedDistanceGain * this._cachedDirectionalGain * this._volBooster;
        outputLeft[i] = sample * this._cachedLeftGain;
        outputRight[i] = sample * this._cachedRightGain;
      }
    }

    return true;
  }
}
registerProcessor('simplified-spatial-processor', CardioidSpatialProcessor);
