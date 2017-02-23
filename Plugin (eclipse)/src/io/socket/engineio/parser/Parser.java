package io.socket.engineio.parser;


import io.socket.utf8.UTF8;
import io.socket.utf8.UTF8Exception;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Parser {

    private static final int MAX_INT_CHAR_LENGTH = String.valueOf(Integer.MAX_VALUE).length();

    public static final int PROTOCOL = 3;

    private static final Map<String, Integer> packets = new HashMap<String, Integer>() {{
        put(Packet.OPEN, 0);
        put(Packet.CLOSE, 1);
        put(Packet.PING, 2);
        put(Packet.PONG, 3);
        put(Packet.MESSAGE, 4);
        put(Packet.UPGRADE, 5);
        put(Packet.NOOP, 6);
    }};

    private static final Map<Integer, String> packetslist = new HashMap<Integer, String>();
    static {
        for (Map.Entry<String, Integer> entry : packets.entrySet()) {
            packetslist.put(entry.getValue(), entry.getKey());
        }
    }

    private static Packet<String> err = new Packet<String>(Packet.ERROR, "parser error");


    private Parser() {}

    public static void encodePacket(Packet packet, EncodeCallback callback) throws UTF8Exception {
        encodePacket(packet, false, callback);
    }

    public static void encodePacket(Packet packet, boolean utf8encode, EncodeCallback callback) throws UTF8Exception {
        if (packet.data instanceof byte[]) {
            @SuppressWarnings("unchecked")
            Packet<byte[]> packetToEncode = packet;
            @SuppressWarnings("unchecked")
            EncodeCallback<byte[]> callbackToEncode = callback;
            encodeByteArray(packetToEncode, callbackToEncode);
            return;
        }

        String encoded = String.valueOf(packets.get(packet.type));

        if (null != packet.data) {
            encoded += utf8encode ? UTF8.encode(String.valueOf(packet.data)) : String.valueOf(packet.data);
        }

        @SuppressWarnings("unchecked")
        EncodeCallback<String> tempCallback = callback;
        tempCallback.call(encoded);
    }

    private static void encodeByteArray(Packet<byte[]> packet, EncodeCallback<byte[]> callback) {
        byte[] data = packet.data;
        byte[] resultArray = new byte[1 + data.length];
        resultArray[0] = packets.get(packet.type).byteValue();
        System.arraycopy(data, 0, resultArray, 1, data.length);
        callback.call(resultArray);
    }

    public static Packet<String> decodePacket(String data) {
        return decodePacket(data, false);
    }

    public static Packet<String> decodePacket(String data, boolean utf8decode) {
        int type;
        try {
            type = Character.getNumericValue(data.charAt(0));
        } catch (IndexOutOfBoundsException e) {
            type = -1;
        }

        if (utf8decode) {
            try {
                data = UTF8.decode(data);
            } catch (UTF8Exception e) {
                return err;
            }
        }

        if (type < 0 || type >= packetslist.size()) {
            return err;
        }

        if (data.length() > 1) {
            return new Packet<String>(packetslist.get(type), data.substring(1));
        } else {
            return new Packet<String>(packetslist.get(type));
        }
    }

    public static Packet<byte[]> decodePacket(byte[] data) {
        int type = data[0];
        byte[] intArray = new byte[data.length - 1];
        System.arraycopy(data, 1, intArray, 0, intArray.length);
        return new Packet<byte[]>(packetslist.get(type), intArray);
    }

    public static void encodePayload(Packet[] packets, EncodeCallback<byte[]> callback) throws UTF8Exception {
        if (packets.length == 0) {
            callback.call(new byte[0]);
            return;
        }

        final ArrayList<byte[]> results = new ArrayList<byte[]>(packets.length);

        for (Packet packet : packets) {
            encodePacket(packet, true, new EncodeCallback() {
                @Override
                public void call(Object packet) {
                    if (packet instanceof String) {
                        String encodingLength = String.valueOf(((String) packet).length());
                        byte[] sizeBuffer = new byte[encodingLength.length() + 2];

                        sizeBuffer[0] = (byte)0; // is a string
                        for (int i = 0; i < encodingLength.length(); i ++) {
                            sizeBuffer[i + 1] = (byte)Character.getNumericValue(encodingLength.charAt(i));
                        }
                        sizeBuffer[sizeBuffer.length - 1] = (byte)255;
                        results.add(Buffer.concat(new byte[][] {sizeBuffer, stringToByteArray((String)packet)}));
                        return;
                    }

                    String encodingLength = String.valueOf(((byte[])packet).length);
                    byte[] sizeBuffer = new byte[encodingLength.length() + 2];
                    sizeBuffer[0] = (byte)1; // is binary
                    for (int i = 0; i < encodingLength.length(); i ++) {
                        sizeBuffer[i + 1] = (byte)Character.getNumericValue(encodingLength.charAt(i));
                    }
                    sizeBuffer[sizeBuffer.length - 1] = (byte)255;
                    results.add(Buffer.concat(new byte[][] {sizeBuffer, (byte[])packet}));
                }
            });
        }

        callback.call(Buffer.concat(results.toArray(new byte[results.size()][])));
    }

    public static void decodePayload(String data, DecodePayloadCallback<String> callback) {
        if (data == null || data.length() == 0) {
            callback.call(err, 0, 1);
            return;
        }

        StringBuilder length = new StringBuilder();
        for (int i = 0, l = data.length(); i < l; i++) {
            char chr = data.charAt(i);

            if (':' != chr) {
                length.append(chr);
            } else {
                int n;
                try {
                    n = Integer.parseInt(length.toString());
                } catch (NumberFormatException e) {
                    callback.call(err, 0, 1);
                    return;
                }

                String msg;
                try {
                    msg = data.substring(i + 1, i + 1 + n);
                } catch (IndexOutOfBoundsException e) {
                    callback.call(err, 0, 1);
                    return;
                }

                if (msg.length() != 0) {
                    Packet<String> packet = decodePacket(msg, true);
                    if (err.type.equals(packet.type) && err.data.equals(packet.data)) {
                        callback.call(err, 0, 1);
                        return;
                    }

                    boolean ret = callback.call(packet, i + n, l);
                    if (!ret) return;
                }

                i += n;
                length = new StringBuilder();
            }
        }

        if (length.length() > 0) {
            callback.call(err, 0, 1);
        }
    }

    public static void decodePayload(byte[] data, DecodePayloadCallback callback) {
        ByteBuffer bufferTail = ByteBuffer.wrap(data);
        List<Object> buffers = new ArrayList<Object>();

        while (bufferTail.capacity() > 0) {
            StringBuilder strLen = new StringBuilder();
            boolean isString = (bufferTail.get(0) & 0xFF) == 0;
            boolean numberTooLong = false;
            for (int i = 1; ; i++) {
                int b = bufferTail.get(i) & 0xFF;
                if (b == 255) break;
                // supports only integer
                if (strLen.length() > MAX_INT_CHAR_LENGTH) {
                    numberTooLong = true;
                    break;
                }
                strLen.append(b);
            }
            if (numberTooLong) {
                @SuppressWarnings("unchecked")
                DecodePayloadCallback<String> tempCallback = callback;
                tempCallback.call(err, 0, 1);
                return;
            }
            bufferTail.position(strLen.length() + 1);
            bufferTail = bufferTail.slice();

            int msgLength = Integer.parseInt(strLen.toString());

            bufferTail.position(1);
            bufferTail.limit(msgLength + 1);
            byte[] msg = new byte[bufferTail.remaining()];
            bufferTail.get(msg);
            if (isString) {
                buffers.add(byteArrayToString(msg));
            } else {
                buffers.add(msg);
            }
            bufferTail.clear();
            bufferTail.position(msgLength + 1);
            bufferTail = bufferTail.slice();
        }

        int total = buffers.size();
        for (int i = 0; i < total; i++) {
            Object buffer = buffers.get(i);
            if (buffer instanceof String) {
                @SuppressWarnings("unchecked")
                DecodePayloadCallback<String> tempCallback = callback;
                tempCallback.call(decodePacket((String)buffer, true), i, total);
            } else if (buffer instanceof byte[]) {
                @SuppressWarnings("unchecked")
                DecodePayloadCallback<byte[]> tempCallback = callback;
                tempCallback.call(decodePacket((byte[])buffer), i, total);
            }
        }
    }

    private static String byteArrayToString(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.appendCodePoint(b & 0xFF);
        }
        return builder.toString();
    }

    private static byte[] stringToByteArray(String string) {
        int len = string.length();
        byte[] bytes = new byte[len];
        for (int i = 0; i < len; i++) {
            bytes[i] = (byte)Character.codePointAt(string, i);
        }
        return bytes;
    }

    public static interface EncodeCallback<T> {

        public void call(T data);
    }


    public static interface DecodePayloadCallback<T> {

        public boolean call(Packet<T> packet, int index, int total);
    }
}


class Buffer {

    private Buffer() {}

    public static byte[] concat(byte[][] list) {
        int length = 0;
        for (byte[] buf : list) {
            length += buf.length;
        }
        return concat(list, length);
    }

    public static byte[] concat(byte[][] list, int length) {
        if (list.length == 0) {
            return new byte[0];
        } else if (list.length == 1) {
            return list[0];
        }

        ByteBuffer buffer = ByteBuffer.allocate(length);
        for (byte[] buf : list) {
            buffer.put(buf);
        }

        return buffer.array();
    }
}
