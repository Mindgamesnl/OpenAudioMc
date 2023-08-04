import {Player} from "./objects/Player";
import {SpeakerRenderFrame} from "./objects/SpeakerRenderFrame";
import {SpeakerPlayer} from "./objects/SpeakerPlayer";
import {SPEAKER_2D} from "./constants/SpeakerType";
import {Vector3} from "../../util/math/Vector3";

export const WorldModule = new class IWorldModule {

    constructor() {
        this.speakers = new Map();
        this.audioMap = new Map();
        this.player = null;
    }

    initPlayer() {
        this.player = new Player(this, new Vector3(0, 0, 0), 0, 0);
    }

    getSpeakerById(id) {
        return this.speakers.get(id);
    }

    addSpeaker(id, speakerData) {
        this.speakers.set(id, speakerData);
        this.renderAudio2D();
    }

    removeSpeaker(id) {
        //eslint-disable-next-line no-unused-vars
        for (let [_, player] of this.audioMap) {
            player.removeSpeakerLocation(id);
        }

        this.speakers.delete(id);
        // wait a bit before running cleanup
        setTimeout(() => {
            this.renderAudio2D();
        }, 600)
    }

    getSpeakerLocations() {
        let locations = [];
        this.speakers.forEach((speaker, id) => {
            locations.push(speaker.location);
        })
        return locations;
    }

    async getMediaForSource(source, startInstant, doLoop = true, doPickup = true) {
        const loaded = this.audioMap.get(source);
        if (loaded != null) return loaded;

        // dont create if we dont know about the fuckery
        if (startInstant == null) {
            return null;
        }

        const created = new SpeakerPlayer(source, startInstant, doLoop, doPickup);
        this.audioMap.set(source, created);
        await created.initialize();
        return created;
    }

    async removeMediaFromSource(source) {
        const found = await this.getMediaForSource(source);
        if (found == null) {
            console.log("Couldn't stop world media for " + source + " because it didn't exist")
            return;
        }

        found.remove();

        console.log("Cleared world media " + source)
        this.audioMap.delete(source);
    }

    onLocationUpdate() {
        this.renderAudio2D();
    }

    isMediaUsed(source) {
        for (let value of this.speakers.values()) {
            if (value.source === source) return true;
        }
        return false;
    }

    async renderAudio2D() {
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
                if (frame.speaker.type === SPEAKER_2D) {
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
        //eslint-disable-next-line no-unused-vars
        for (let [id, result] of closestForSources) {
            let doFor;
            if (!Array.isArray(result)) {
                doFor = [result];
            } else {
                doFor = result;
            }

            for (let element of doFor) {
                const media = await this.getMediaForSource(element.source, element.speaker.startInstant, element.speaker.doLoop, element.speaker.doPickup);
                media.updateLocation(element.speaker, this, this.player)
            }
        }

        // check for media that's unused by every speaker
        for (let [source] of this.audioMap) {
            if (!this.isMediaUsed(source)) {
                await this.removeMediaFromSource(source);
            }
        }
    }

}()