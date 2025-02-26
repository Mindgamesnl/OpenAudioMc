import {
  applySpatialRendererSettings, CustomSpatialRenderer,
  untrackSpatialRenderer,
} from '../../rendering/CustomSpatialRenderer';

export class SpeakerRenderNode {
  constructor(speaker, world, player, media, source, channel) {
    // audio pipeline
    // Sound object > Spatial Renderer > Gain Node > Audio Device
    this.speaker = speaker;
    this.media = media;
    this.spatialRendererId = null;
    this.player = player;
    this.spatialRenderer = null;

    media.whenInitialized(() => {
      channel.fadeChannel(100, 100);

      // Create a new spatial renderer instead of a panner node
      this.spatialRenderer = new CustomSpatialRenderer(player.audioCtx, speaker.maxDistance);

      // Apply settings and track the renderer
      this.spatialRendererId = applySpatialRendererSettings(this.spatialRenderer, speaker.maxDistance);

      // Connect the media source to the spatial renderer
      media.attachCustomRenderer(player, this.spatialRenderer);

      // Set the position from the speaker's location
      const { location } = speaker;

      // Apply position to the spatial renderer
      this.spatialRenderer.setPosition(location.x, location.y, location.z);

      // Connect the spatial renderer's output to the audio destination
      this.spatialRenderer.connectOutput(player.audioCtx.destination);
    });
  }

  preDelete() {
    untrackSpatialRenderer(this.spatialRendererId);
    if (this.spatialRenderer) {
      this.spatialRenderer.disconnect();
    }
  }
}
