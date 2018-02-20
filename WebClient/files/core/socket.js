packethandlers = {};

function event(event, runnable) {
    packethandlers[event] = runnable;
}

function oa_socket_startup(name, server, token) {
    oaio = io.connect("https://craftmendserver.eu:6969", {
        secure: false
    });

    console.log("[socket] starting...");

    oaio.on('connect', function() {
        console.log("[socket] connected! sending identity");
        var packet = {};
        packet.name = name;
        packet.key = token;
        packet.server = server;
        oa_ui_setskull("Loading...", "606e2ff0-ed77-4842-9d6c-e1d3321c7838");
        oaio.emit("imaplayer", JSON.stringify(packet));
	    initializeExternalServices();
    });

    oaio.on('disconnect', function () {
        oa_ui_setskull("DISCONNECTED", "606e2ff0-ed77-4842-9d6c-e1d3321c7838");
        oa_ui_show_notification("Oh no! :(", lang.socket_did_not_do_its_thing, "warning");
        for (var key in __soundsvolarray) {
            __soundsvolarray[key].stop();
        }
    });

    oaio.on('connect_timeout', function () {
        oa_ui_setskull("TIMED OUT", "606e2ff0-ed77-4842-9d6c-e1d3321c7838");
        oa_ui_show_notification("Oh no! :(", lang.socket_did_not_do_its_thing, "warning");
    });
    
    oaio.on("packet", function (packet) {
        if (packethandlers[packet.packet_command] == null) {
            console.log("[socket] Received unknown packet. ("+packet.packet_command+")");
            return;
        }
        packethandlers[packet.packet_command](packet);
    });
}
