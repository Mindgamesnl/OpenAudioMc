__soundsvolarray = {};
var ambiancePlaying = false;
var ambianceAudible = false;
__oa_ambiance_sound = null;

soundManager.fadeTo = function(id, dur, toVol, callback){
    dur      = dur || 1000;
    toVol    = toVol || 0;
    callback = typeof callback == 'function' ? callback : function(s){};
    var s    = soundManager.getSoundById(id),
        k    = s.volume,
        t    = dur/Math.abs(k - toVol),
        i    = setInterval(function(){
            k = k > toVol ? k - 1 : k + 1;
            s.setVolume(k);
            if(k == toVol){
                callback(s);
                clearInterval(i);
                i = null;
            }
        }, t);
};

function getSoundsAmount() {
    var i = 0;
    for (var key in __soundsvolarray) i++;

    return i;
}

setInterval(function() {
    if (__oa_ambiance_sound != null) {
        if (getSoundsAmount() <= 1) {
            if (!ambiancePlaying) {
                var tempsound = new OaSound(__oa_ambiance_sound);
                tempsound.setLooping();
                ambiancePlaying = true;
                ambianceAudible = true;
                tempsound.customid = "openaudio_ambiance";
                tempsound.start();
            } else {
                if (!ambianceAudible) {
                    for (var key in __soundsvolarray) {
                        if (__soundsvolarray[key].customid == "openaudio_ambiance") {
                            __soundsvolarray[key].setVolume(__volume, true, function () {}, 500);
                            __soundsvolarray[key].muted = false;
                            ambianceAudible = true;
                        }
                    }
                }
            }
        } else if (getSoundsAmount() != 1 && ambiancePlaying && ambianceAudible) {
            for (var key in __soundsvolarray) {
                if (__soundsvolarray[key].customid == "openaudio_ambiance") {
                    __soundsvolarray[key].setVolume(0, true, function () {}, 500);
                    __soundsvolarray[key].muted = true;
                    ambianceAudible = false;
                }
            }
        }
    }
}, 200);

function oa_audio_setvolume(volume) {
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].allowNormalVolume && !__soundsvolarray[key].muted) __soundsvolarray[key].setVolume(volume, true, null, 200);
    }
    localStorage.volume = volume;
    document.getElementsByClassName("oam_volume_display")[0].innerHTML = "Vol: "+volume+"%";
    document.getElementsByClassName("oam_volume_display_slider")[0].style.width = volume+"%";
}

function OaSound(url, start, loop) {
    this.allowNormalVolume = true;
    this.source = url;
    this.customid = "";
    this.muted = false;
    this.startvolume = __volume;
    this.options = {
        id: guid(),
        url: url,
        volume: 0,
        autoPlay: true,
        whileloading: function() { console.log("[OpenAudioMc-AudioManager] " + this.id + ' is loading'); },
        onfinish: function() {}
    };

    __soundsvolarray[this.options.id] = this;

    this.blockGlobalVolume = function() {
        this.allowNormalVolume = false;
    }

    this.setLooping = function () {
        this.options.loops = 900;
    };

    this.setStartVolume = function(v) {
        this.startvolume = v;
    }

    this.setStartPosition = function (t) {
        this.options.from = t;
    };

    this.setVolume = function(volume, fade, callback, delay) {
        if (fade) {
            soundManager.fadeTo(this.sound.id, delay, volume, callback);
            return;
        }
        this.sound.setVolume(volume);
    }

    this.stop = function () {
        this.setVolume(0, true, function (s) {
            s.stop();
            delete __soundsvolarray[s.id];
            //if (this.l)
        }, 200);
    }

    this.start = function () {
        this.sound = soundManager.createSound(this.options);
        this.setVolume(this.startvolume, true, function() {}, 500)
    }
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}