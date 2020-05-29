import UrlReader from "../protocol/UrlReader";

export default class ClientTokenSet {

    constructor(publicServerKey, playerUUID, playerName, playerToken) {
        this.publicServerKey = publicServerKey;
        this.uuid = playerUUID;
        this.name = playerName;
        this.token = playerToken;
    }

    fromUrl(url) {
        if (url == null) return null;
        if (url.split('?').length < 2) return null;
        const params = UrlReader.getParametersFromUrl(url.split('?')[1]);

        // if the params does not contain shit, dont return shit either
        // fuck off
        if (params.data == null) return null;

        let query = atob(params.data).split(":");

        // validate all data
        if (query.length !== 4) return null; // must be 4 arguments
        const playerName = query[0];
        const playerUuid = query[1];
        const serverUuid = query[2];
        const playerToken = query[3];

        // validate the given data
        if (!(playerName != null && playerName.length <= 16 && // player name cant be null and must be 16 chars or less
            playerUuid != null && playerUuid.length <= 40 &&   // player uuid cant be null or less than 40 char
            serverUuid != null && serverUuid.length <= 40 &&   // server uuid cant be null or less than 40 char
            playerToken != null && playerToken.length <= 5)) { // player token cant be null or less than 5 char
            return null;
        }

        // all appears to be okay! thats good! give a session
        return new ClientTokenSet(serverUuid, playerUuid, playerName, playerToken);
    }

}
