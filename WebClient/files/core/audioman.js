__volume = 20;
__soundsvolarray = {};

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
}

function oa_audio_setvolume(volume) {
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].allowNormalVolume) __soundsvolarray[key].setVolume(volume, true, null, 200);
    }
    document.getElementsByClassName("oam_volume_display")[0].innerHTML = "Vol: "+__volume+"%";
    document.getElementsByClassName("oam_volume_display_slider")[0].style.width = __volume+"%";
}

function OaSound(url, start) {
    this.allowNormalVolume = true;
    this.source = url;
    this.customid = "";
    this.sound = soundManager.createSound({
        id: guid(),
        url: url,
        volume: __volume,
        from: start,
        autoPlay: true,
        whileloading: function() { console.log(this.id + ' is loading'); },
        onfinish: function() {}
    });
    __soundsvolarray[this.sound.id] = this;

    this.blockGlobalVolume = function() {
        this.allowNormalVolume = false;
    }

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
        }, 200);
    }

    this.loop = function () {
        this.sound.onfinish = function () {
            this.play({
                onfinish: function () {
                    this.loop();
                }
            });
        }
        this.sound._onfinish = this.sound.onfinish;
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
