import {Vector3} from "./Vector3";
import {oalog} from "../log";
import {SETTING_STATES} from "../../modules/settings/SettingsManager";

export const MAGIC_SCHEDULE_VALUES = {
    VC_LOCATION_UPDATES: 3 * 45,
    SELF_LOCATION_UPDATES: 2 * 45
}

export class Interpolator {

    constructor(startLocation = new Vector3(0, 0, 0), pitch = 0, yaw = 0) {
        this.hasData = false;
        this.location = startLocation;
        this.target = startLocation;
        this.isRunning = false;
        this.currentTask = -1;
        this.pitch = pitch;
        this.yaw = yaw;
        this.onMove = () => {}
    }

    interpolate(nextTarget, pitch, yaw, duration) {
        if (!SETTING_STATES.interpolation) {
            this.location = nextTarget;
            this.pitch = pitch;
            this.yaw = yaw;
            this.onMove(this.location, this.pitch, this.yaw);
        }

        if (!this.hasData) {
            this.location = nextTarget;
            this.pitch = pitch;
            this.yaw = yaw;
            this.hasData = true;
            this.onMove(this.location, this.pitch, this.yaw);
            return
        }

        // do we already have a task? yes? well, skip it
        if (this.isRunning) {
            clearInterval(this.currentTask);
            this.isRunning = false;
            this.location = this.target;
        }

        this.isRunning = true;
        this.target = nextTarget;
        const steps = duration / 3;
        const loop = duration / steps;

        let vStepSize = this.target.clone().sub(this.location).divide(steps);
        let pStepSize = (this.pitch - pitch) / steps;
        let yStepSize = (this.yaw - yaw) / steps;

        let step = 1;

        let h = () => {
            step++;
            if (step >= steps || !this.isRunning) {
                clearInterval(this.currentTask);
                this.isRunning = false;
                this.location = this.target;
                this.pitch = pitch;
                this.yaw = yaw;
                this.onMove(this.location, this.pitch, this.yaw);
                return
            }
            this.location.sub(vStepSize);
            this.pitch -= pStepSize;
            this.yaw -= yStepSize;
            this.onMove(this.location, this.pitch, this.yaw);
        }

        h();

        this.currentTask = setInterval(h, loop)
    }

}