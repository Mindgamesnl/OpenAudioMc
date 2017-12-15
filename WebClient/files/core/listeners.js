event("SET_BACKGROUND", function (data) {
    oa_ui_setbg(data.packet_value);
});

event("PLAY", function (data) {
    new OaSound(data.packet_value).play();
});

event("PLAY_SPECIAL", function (data) {
    var url = data.packet_value.split("--==--")[0];
    var json = JSON.parse(data.packet_value.split("--==--")[1]);

    var sound = new OaSound(url);

    if (json.start != null) {
        console.log("start")
        sound.setStartPosition(json.start);
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

event("STOP", function (data) {
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].allowNormalVolume) __soundsvolarray[key].stop();
    }
});

event("STOP_SPECIAL", function (data) {
    for (var key in __soundsvolarray) {
        if (__soundsvolarray[key].allowNormalVolume && __soundsvolarray[key].customid.toLowerCase() == data.packet_value.toLowerCase()) __soundsvolarray[key].stop();
    }
});