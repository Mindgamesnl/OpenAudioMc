export class TPSCounter {

    constructor(handler) {
        this.ticks = 0;

        this.task = setInterval(() => {
            handler(this.ticks);
            this.ticks = 0;
        }, 1000);
    }

    tick() {
        this.ticks++;
    }

    stop() {
        clearInterval(this.task);
    }

}
