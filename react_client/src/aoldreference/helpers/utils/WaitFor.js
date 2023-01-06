import {oalog} from "../log";

export function WaitFor(timeout, runnable) {
    return new Promise((acc, reject) => {
        var remainingTimeout = timeout;
        var task = setInterval(() => {
            oalog("Waiting...")
            remainingTimeout--;
            if (remainingTimeout == 0) {
                clearInterval(task);
                oalog("Wait for timed out!")
                reject("Timed out")
                return
            }

            if (runnable()) {
                oalog("Wait for finished!")
                clearInterval(task);
                acc();
            }
        }, 1000)
    })
}