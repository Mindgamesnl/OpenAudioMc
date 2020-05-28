import {Player} from "./objects/Player";
import {Vector3} from "../../helpers/ThreeJS/Vector3";

export class WorldModule {

    constructor(openAudioMc) {
        this.openAudioMc = openAudioMc;
        this.player = new Player(new Vector3(0, 0, 0), 0, 0);
    }

}