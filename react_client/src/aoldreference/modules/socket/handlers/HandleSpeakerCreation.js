import {Vector3} from "../../../helpers/math/Vector3";
import {Speaker} from "../../world/objects/Speaker";

export function handleSpeakerCreation(openAudioMc, data) {
    // speaker in range
    const speaker = data.clientSpeaker;

    // Vector3 representing the center of the speaker
    const loc = new Vector3(
        speaker.location.x,
        speaker.location.y,
        speaker.location.z
    ).add(0.5, 0.5, 0.5);

    // create speaker
    const speakerData = new Speaker(
        speaker.id,
        speaker.source,
        loc,
        speaker.type,
        speaker.maxDistance,
        speaker.startInstant,
        openAudioMc
    );

    // add it to the render queue
    openAudioMc.world.addSpeaker(speaker.id, speakerData);
}