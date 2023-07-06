export function closeSessionTab() {

    // where do we want to go? 25% chance of going to the homepage
    let random = Math.random();
    if (random < 0.25) {
        window.location.href = "https://openaudiomc.net";
        return;
    }

    // get the current url, but without the query string and hash
    let url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    // redirect to the url
    window.location.href = url;
}