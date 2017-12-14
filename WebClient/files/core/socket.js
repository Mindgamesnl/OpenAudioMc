packethandlers = {};

function event(event, runnable) {
    packethandlers[event] = runnable;
}

function oa_socket_startup(name, server, token) {
    oaio = io.connect("http://192.168.2.19:6969", {
        secure: false
    });

    console.log("[socket] starting...");

    oaio.on('connect', function() {
        console.log("[socket] connected! sending identity");
        var packet = {};
        packet.name = name;
        packet.key = token;
        packet.server = server;
        oa_ui_setskull(packet.name);
        oaio.emit("imaplayer", JSON.stringify(packet));
    });

    oaio.on('disconnect', function () {
        oa_ui_setskull("Whoops");
        oa_ui_show_notification("Oh no! :(", lang.socket_did_not_do_its_thing, "warning");
    });

    oaio.on('connect_timeout', function () {
        oa_ui_setskull("Whoops");
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