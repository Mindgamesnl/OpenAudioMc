import {Player} from "./objects/Player";
import {Vector3} from "../../helpers/math/Vector3";
import {SpeakerRenderFrame} from "./objects/SpeakerRenderFrame";
import {SpeakerPlayer} from "./objects/SpeakerPlayer";
import {SPEAKER_2D} from "./constants/SpeakerType";

export class WorldModule {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.speakers = new Map();
        this.audioMap = new Map();
        this.player = new Player(this, new Vector3(0, 0, 0), 0, 0);
    }

    getSpeakerById(id) {
        return this.speakers.get(id);
    }

    addSpeaker(id, speakerData) {
        this.speakers.set(id, speakerData);
        speakerData.initialize();
        this.renderAudio2D();
    }

    removeSpeaker(id) {
        let speaker = this.getSpeakerById(id);
        if (speaker != null) speaker.onRemove();
        this.speakers.delete(id);

        // remove render nodes
        this.audioMap.forEach((speakerPlayer, id) => {
            speakerPlayer.removeSpeakerLocation(id);
        });

        this.renderAudio2D();
    }

    getMediaForSource(source, startInstant) {
        const loaded = this.audioMap.get(source);
        if (loaded != null) return loaded;

        // dont create if we dont know about the fuckery
        if (startInstant == null) {
            return null;
        }

        const created = new SpeakerPlayer(this.openAudioMc, source, startInstant);
        this.audioMap.set(source, created);
        return created;
    }

    removeMediaFromSource(source) {
        const found = this.getMediaForSource(source);
        if (found == null) return;

        found.remove();
        this.audioMap.delete(source);
    }

    onLocationUpdate() {
        this.speakers.forEach((speaker, id) => {
            speaker.onPlayerLocationUpdate(this, this.player);
        });
        this.renderAudio2D();
    }

    isMediaUsed(source) {
        for (let value of this.speakers.values()) {
            if (value.source == source) return true;
        }
        return false;
    }

    renderAudio2D() {
        let frames = [];

        // render all speakers and their frame
        this.speakers.forEach((speaker, id) => {
            const distance = speaker.getDistance(this, this.player);
            frames.push(new SpeakerRenderFrame(speaker.source, distance, speaker));
        });

        let closestForSources = new Map();
        for (let frame of frames) {
            let alternative = closestForSources.get(frame.source);
            // set if none
            if (alternative == null) {
                if (frame.speaker.type == SPEAKER_2D) {
                    if (frame.distance <= frame.speaker.maxDistance) closestForSources.set(frame.source, frame);
                } else {
                    if (frame.distance <= frame.speaker.maxDistance) closestForSources.set(frame.source, [frame]);
                }
                continue;
            }

            // replace if closer
            if (Array.isArray(alternative)) {
                alternative.push(frame);
                closestForSources.set(frame.source, alternative);
            } else {
                if (alternative.distance > frame.distance) {
                    if (frame.distance <= frame.speaker.maxDistance) closestForSources.set(frame.source, frame);
                }
            }
        }

        // update closest
        closestForSources.forEach((result, id) => {
            let doFor;
            if (!Array.isArray(result)) {
                doFor = [result];
            } else {
                doFor = result;
            }

            for (let element of doFor) {
                const media = this.getMediaForSource(element.source, element.speaker.startInstant);
                media.updateLocation(element.speaker, this, this.player)
            }
        });

        // check for media that's unused by every speaker
        this.audioMap.forEach((audio, source) => {
            if (!this.isMediaUsed(source)) {
                this.removeMediaFromSource(source);
            }
        })
    }

}