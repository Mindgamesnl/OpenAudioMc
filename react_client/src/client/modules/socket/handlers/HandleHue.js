export function handleHuePayload(openAudioMc, data) {
    function convertRange(value, r1, r2) {
        return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
    }
    const targetLights = data.lights;
    const targetColor = data.hueColor;
    const rgbaColor = "rgba(" + targetColor.r + "," + targetColor.g + "," + targetColor.b + "," + convertRange(targetColor.bir, [0, 255], [0, 1]) + ")";
    if (openAudioMc.getHueModule().isLinked) {
        openAudioMc.getHueModule().setLight(targetLights, rgbaColor);
    }
}