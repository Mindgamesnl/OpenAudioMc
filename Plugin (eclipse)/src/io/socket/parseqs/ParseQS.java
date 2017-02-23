package io.socket.parseqs;


import io.socket.global.Global;

import java.util.HashMap;
import java.util.Map;

public class ParseQS {

    private ParseQS() {}

    public static String encode(Map<String, String> obj) {
        StringBuilder str = new StringBuilder();
        for (Map.Entry<String, String> entry : obj.entrySet()) {
            if (str.length() > 0) str.append("&");
            str.append(Global.encodeURIComponent(entry.getKey())).append("=")
                    .append(Global.encodeURIComponent(entry.getValue()));
        }
        return str.toString();
    }

    public static Map<String, String> decode(String qs) {
        Map<String, String> qry = new HashMap<String, String>();
        String[] pairs = qs.split("&");
        for (String _pair : pairs) {
            String[] pair = _pair.split("=");
            qry.put(Global.decodeURIComponent(pair[0]),
                    pair.length > 1 ? Global.decodeURIComponent(pair[1]) : "");
        }
        return qry;
    }
}
