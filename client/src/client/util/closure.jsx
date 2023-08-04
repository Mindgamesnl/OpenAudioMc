import {getGlobalState} from "../../state/store";

export function closeSessionTab() {

    // is there a current session?
    let chance = 50;

    if (getGlobalState() && getGlobalState().isPremium) {
        chance = 20;
    }

    // convert to a percentage
    chance = chance / 100;

    // where do we want to go? 25% chance of going to the homepage
    let random = Math.random();
    if (random < chance) {
        window.location.href = "https://openaudiomc.net";
        return;
    }

    // get the current url, but without the query string and hash
    let url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    // redirect to the url
    window.location.href = url;
}