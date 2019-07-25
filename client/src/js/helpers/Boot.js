export class Boot {

    constructor() {
        console.log('%c Made with love. Take note! this is a bundled version of OpenAudioMc. To get the full source code, please visit https://github.com/Mindgamesnl/OpenAudioMc', [
            'background: linear-gradient(#D33106, #571402)'
            , 'border: 1px solid #3E0E02'
            , 'color: white'
            , 'display: block'
            , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
            , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
            , 'line-height: 40px'
            , 'text-align: center'
            , 'font-weight: bold'
        ].join(';'));

        this.log("Enabling the web client for " + window.navigator.userAgent);
        this.log("Build: April 03 (hue, media and UI update)");
    }

    boot() {
        //set volume
        let presetVolume = Cookies.get("volume");
        if (presetVolume != null) {
            this.mediaManager.changeVolume(presetVolume);
        }
    }

}
