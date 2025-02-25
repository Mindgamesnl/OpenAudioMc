/* eslint-disable */
import { getGlobalState } from '../../../state/store';
import {SpatialAudioEvents} from "../../../views/client/pages/settings/SettingsPage";

// Singleton to manage the global listener state
export class SpatialAudioListener {
  static instance = null;

  static getInstance(audioContext) {
    if (!SpatialAudioListener.instance) {
      SpatialAudioListener.instance = new SpatialAudioListener(audioContext);
    }
    return SpatialAudioListener.instance;
  }

  constructor(audioContext) {
    this.audioContext = audioContext;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.yaw = 0; // Direct yaw value - no quaternion needed

    // Track all active nodes
    this.activeNodes = new Set();
  }

  // Update listener position directly with xyz and yaw
  updatePosition(x, y, z, yaw) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.yaw = yaw;

    // Update all active nodes
    this.updateAllNodes();
  }

  updateAllNodes() {
    // Send new listener position and yaw to all active nodes
    this.activeNodes.forEach(node => {
      node.updateListenerPosition(this.x, this.y, this.z, this.yaw);
    });
  }

  registerNode(node) {
    this.activeNodes.add(node);
    // Immediately update the new node with current listener position
    node.updateListenerPosition(this.x, this.y, this.z, this.yaw);
  }

  unregisterNode(node) {
    this.activeNodes.delete(node);
  }
}

// Main Spatial Renderer
export class CustomSpatialRenderer {
  constructor(audioContext, maxDistance = 0) {
    this.audioContext = audioContext;
    this.listener = SpatialAudioListener.getInstance(audioContext);

    // Source position
    this.x = 0;
    this.y = 0;
    this.z = 0;

    // Create gain node for volume control
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 1.0;

    // Create the worklet node
    this._createWorkletNode();

    // Apply settings
    this.setMaxDistance(maxDistance);
    this.applySettingsFromGlobalState();

    // Register with the listener
    this.listener.registerNode(this);
  }

  async _createWorkletNode() {
    try {
      // Create the worklet node
      this.workletNode = new AudioWorkletNode(
        this.audioContext,
        'simplified-spatial-processor',
        {
          outputChannelCount: [2] // Ensure stereo output
        }
      );

      // Connect the worklet to gain node
      this.workletNode.connect(this.gainNode);

      // Set up debug message handler
      this.workletNode.port.onmessage = (event) => {
        if (event.data.type === 'debug') {
          console.log('Worklet:', event.data.message);
        }
      };

      // Send initial settings
      this.workletNode.port.postMessage({
        type: 'audio-settings',
        rolloffFactor: this.rolloffFactor,
        maxDistance: this.maxDistance,
        volBooster: 1.5,
        minGain: 0.1
      });
    } catch (error) {
      console.error('Failed to create worklet node:', error);
      this._createFallbackNodes();
    }
  }

  _createFallbackNodes() {
    console.warn('Using fallback stereo panner');
    this.fallbackPanner = this.audioContext.createStereoPanner();
    this.fallbackPanner.connect(this.gainNode);
  }

  applySettingsFromGlobalState() {
    const globalState = getGlobalState();
    const message = {
      type: 'audio-settings',
      bypass: globalState.settings.spatialBypass,
      rolloffFactor: globalState.settings.spatialRolloffFactor,
      stereoSeparation: globalState.settings.spatialStereoSeparation,
      maxDistance: this.maxDistance,
    };

    if (this.workletNode) {
      this.workletNode.port.postMessage(message);
    }
  }

  setMaxDistance(maxDistance) {
    if (maxDistance === 0) {
      const globalState = getGlobalState();
      this.maxDistance = globalState.voiceState.radius;
    } else {
      this.maxDistance = maxDistance;
    }

    // Update worklet
    if (this.workletNode) {
      this.workletNode.port.postMessage({
        type: 'audio-settings',
        maxDistance: this.maxDistance
      });
    }
  }

  // Connect an audio source to this renderer
  connect(source) {
    if (this.workletNode) {
      source.connect(this.workletNode);
    } else if (this.fallbackPanner) {
      source.connect(this.fallbackPanner);
    }
  }

  // Connect output to a destination
  connectOutput(destination) {
    this.gainNode.connect(destination);
  }

  // Set position directly with x, y, z coordinates
  setPosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    if (this.workletNode) {
      this.workletNode.port.postMessage({
        type: 'source-position',
        x, y, z
      });
    } else if (this.fallbackPanner) {
      this._updateFallbackPan();
    }
  }

  // Method to handle Position class objects for backwards compatibility
  applyPositionFromObject(positionObj) {
    this.setPosition(
      positionObj.position.x,
      positionObj.position.y,
      positionObj.position.z
    );
  }

  // Update listener position (called by SpatialAudioListener)
  updateListenerPosition(x, y, z, yaw) {
    if (this.workletNode) {
      this.workletNode.port.postMessage({
        type: 'listener-position',
        x, y, z
      });

      this.workletNode.port.postMessage({
        type: 'listener-yaw',
        yaw
      });
    } else if (this.fallbackPanner) {
      this._updateFallbackPan();
    }
  }

  _updateFallbackPan() {
    if (this.fallbackPanner) {
      // Simple stereo panning based on angle
      const dx = this.x - this.listener.x;
      const dz = this.z - this.listener.z;

      // Calculate angle to source (in world space)
      const angleToSource = Math.atan2(dx, dz);

      // Calculate relative angle based on listener's yaw
      const relativeAngle = angleToSource - this.listener.yaw;

      // Normalize to range [-PI, PI]
      let normalizedAngle = relativeAngle;
      while (normalizedAngle > Math.PI) normalizedAngle -= 2 * Math.PI;
      while (normalizedAngle < -Math.PI) normalizedAngle += 2 * Math.PI;

      // Convert to pan value between -1 (left) and 1 (right)
      const pan = normalizedAngle / (Math.PI / 2);

      // Clamp between -1 and 1
      const clampedPan = Math.max(-1, Math.min(1, pan));

      this.fallbackPanner.pan.value = clampedPan;

      // Also apply distance-based attenuation
      const distanceSquared = dx * dx + dz * dz;
      const distance = Math.sqrt(distanceSquared);

      let gain = 1.0;
      if (distance >= this.maxDistance) {
        gain = 0.1; // min gain
      } else if (distance > 1) {
        gain = 1 / (1 + this.rolloffFactor * (distance - 1) / (this.maxDistance - 1));
        gain = Math.max(0.1, Math.min(1.0, gain));
      }

      this.gainNode.gain.value = gain;
    }
  }

  // Set volume (0-100)
  setVolume(volume, boost = 1.5) {
    const normalizedVolume = (volume / 100) * boost;
    this.gainNode.gain.value = normalizedVolume;
  }

  // Toggle bypass mode for testing
  setBypassMode(enabled) {
    if (this.workletNode) {
      this.workletNode.port.postMessage({
        type: 'bypass-mode',
        enabled: enabled
      });
    }
  }

  // Clean up resources
  disconnect() {
    // Unregister from listener
    this.listener.unregisterNode(this);

    // Disconnect all nodes
    if (this.workletNode) {
      this.workletNode.disconnect();
    }

    if (this.fallbackPanner) {
      this.fallbackPanner.disconnect();
    }

    this.gainNode.disconnect();
  }
}

// Function to track spatial renderers (similar to the previous panner tracking)
const spatialRendererTrackers = {};

export function trackSpatialRenderer(renderer) {
  const id = makeid(5);
  spatialRendererTrackers[id] = renderer;
  return id;
}

export function untrackSpatialRenderer(id) {
  if (id && spatialRendererTrackers[id]) {
    delete spatialRendererTrackers[id];
  }
}

// Helper function (from your existing code)
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Apply settings to a spatial renderer
export function applySpatialRendererSettings(renderer, maxDistance = 0) {
  renderer.setMaxDistance(maxDistance);
  renderer.applySettingsFromGlobalState();
  const id = trackSpatialRenderer(renderer);
  return id;
}

export function onGlobalStateSettingsUpdate() {
  Object.values(spatialRendererTrackers).forEach(renderer => {
    renderer.applySettingsFromGlobalState();
  });
}

// add a listener to reapply settings on global state change
SpatialAudioEvents.addListener(() => {
  onGlobalStateSettingsUpdate()
})
