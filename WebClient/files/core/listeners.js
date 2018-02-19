event("SET_BACKGROUND", function (data) {
    oa_ui_setbg(data.packet_value);
});

event("PLAY", function (data) {
    console.log(data);
    new OaSound(data.packet_value).start();
});

event("PLAY_SPECIAL", function (data) {
    var url = data.packet_value.split("--==--")[0];
    var json = JSON.parse(data.packet_value.split("--==--")[1]);

    var sound = new OaSound(url);

    if (json.start != null) {
        sound.setStartPosition(json.start);
    }

    if (json.volume != null) {
        console.log("volume")
        sound.setStartVolume(json.volume);
    }

    if (json.loop != null && json.loop) {
        sound.setLooping();
        console.log("loop")
    }

    if (json.id != null) {
        sound.customid = json.id;
    }

    sound.start();
});

event("SETVOLUME", function(data) {
    oa_volume_set(data.packet_value);
});

event("SETUUID", function (data) {
    oa_ui_setskull("Connected", data.packet_value);
});

event("HUE", function (data) {
    hue.setRgb(data.packet_value, null)
});

event("SET_SPEAKER_VOLUME", function (data) {
    var data = JSON.parse(data.packet_value);
    var volume = (data.volume / 100) * __volume;
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].customid == "speaker_" + data.id) {
            __soundsvolarray[key].setVolume(volume, true, function() {}, 700);
        }
    }
});

event("STOP", function (data) {
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].allowNormalVolume && !__soundsvolarray[key].customid.startsWith("region_")) __soundsvolarray[key].stop();
    }
});

event("STOP_SPECIAL", function (data) {
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].allowNormalVolume && __soundsvolarray[key].customid.toLowerCase() == data.packet_value.toLowerCase()) __soundsvolarray[key].stop();
    }
});
