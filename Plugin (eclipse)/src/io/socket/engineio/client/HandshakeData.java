package io.socket.engineio.client;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class HandshakeData {

    public String sid;
    public String[] upgrades;
    public long pingInterval;
    public long pingTimeout;

    /*package*/ HandshakeData(String data) throws JSONException {
        this(new JSONObject(data));
    }

    /*package*/ HandshakeData(JSONObject data) throws JSONException {
        JSONArray upgrades = data.getJSONArray("upgrades");
        int length = upgrades.length();
        String[] tempUpgrades = new String[length];
        for (int i = 0; i < length; i ++) {
            tempUpgrades[i] = upgrades.getString(i);
        }

        this.sid = data.getString("sid");
        this.upgrades = tempUpgrades;
        this.pingInterval = data.getLong("pingInterval");
        this.pingTimeout = data.getLong("pingTimeout");
    }
}
