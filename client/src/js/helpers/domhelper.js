export function CallAfterDomUpdate(fn) {
    var intermediate = function () {
        window.requestAnimationFrame(fn)
    }
    window.requestAnimationFrame(intermediate)
}
