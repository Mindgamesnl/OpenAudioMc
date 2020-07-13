export function setPageOverlay(text) {
    if (text == null) {
        document.getElementById("loading-overlay").style.display = "none";
    } else {
        document.getElementById("loading-overlay").style.display = "block";
        document.getElementById("loading-text").innerHTML = text;
    }
}