class SocketModule {

    constructor(main, host) {
        if (main.utils.getParameter().data == null) {
            main.debugPrint("data is empty");
            return;
        }

        let query = atob(main.utils.getParameter().data).split(":");
        main.debugPrint("Username: " + query[0]);
        main.debugPrint("Player uuid: " + query[1]);
        main.debugPrint("Server uuid: " + query[2]);
        main.debugPrint("Token: " + query[3]);

        this.username = query[0];
        this.playerUuid = query[1];
        this.severUuid = query[2];
        this.token = query[3];

        this.authHeader = "" +
            "type=client&" +
            "n=" + this.username + "&" +
            "player=" + this.playerUuid + "&" +
            "s=" + this.severUuid + "&" +
            "p=" + this.token;

        main.debugPrint(this.authHeader);

        const that = this;
        this.socket = io(host, {query: that.authHeader, autoConnect:false});

        this.socket.on("connect", function () {
            main.debugPrint("connected");
        });

        this.socket.on("disconnect", function () {
            main.debugPrint("closed");
        });

        this.socket.connect();
    }

}