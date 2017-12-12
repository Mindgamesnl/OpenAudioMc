$( document ).ready(function() {
    oaio = io.connect("http://192.168.2.19:6969", {
        secure: false
    });

    console.log("[socket] starting...");


    oaio.on('connect', function() {
        console.log("[socket] connected! sending identity");
        var packet = {};
        packet.name = "Mindgamesnl";
        packet.key = "abcd";
        packet.server = "Zintuigen";
        oa_ui_setskull(packet.name);
        oaio.emit("imaplayer", JSON.stringify(packet));
    });


    oaio.on('disconnect', function () {
        oa_ui_setskull("whoops");
        oa_ui_show_notification("Oh no! :(", lang.socket_did_not_do_its_thing, "warning");
    });

    oaio.on('connect_timeout', function () {
        oa_ui_setskull("whoops");
        oa_ui_show_notification("Oh no! :(", lang.socket_did_not_do_its_thing, "warning");
    });
});