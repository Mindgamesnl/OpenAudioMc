import {oalog} from "../log";
import {makeid} from "./random";

window.randomLoadCallbacks = new Map();

export function LoadLibrary(source, givenCallback) {
    oalog("Loading on the fly library " + source)
    fetch(source).then((request) => {
        request.text().then(code => {
            let id = makeid(10)
            window.randomLoadCallbacks.set(id, () => {
                givenCallback()
                window.randomLoadCallbacks.delete(id)
            });

            let template = ';window.randomLoadCallbacks.get("' + id + '")()'

            window.eval.call(window,code+template);
        })
    });
}
