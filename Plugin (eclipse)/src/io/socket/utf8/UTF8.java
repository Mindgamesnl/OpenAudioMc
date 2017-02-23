package io.socket.utf8;

import java.util.ArrayList;
import java.util.List;

/**
 * UTF-8 encoder/decoder ported from utf8.js.
 *
 * @see <a href="https://github.com/mathiasbynens/utf8.js">https://github.com/mathiasbynens/utf8.js</a>
 */
public final class UTF8 {

    private static final String INVALID_CONTINUATION_BYTE = "Invalid continuation byte";
    private static int[] byteArray;
    private static int byteCount;
    private static int byteIndex;

    private UTF8 () {}

    public static String encode(String string) throws UTF8Exception {
        int[] codePoints = ucs2decode(string);
        int length = codePoints.length;
        int index = -1;
        int codePoint;
        StringBuilder byteString = new StringBuilder();
        while (++index < length) {
            codePoint = codePoints[index];
            byteString.append(encodeCodePoint(codePoint));
        }
        return byteString.toString();
    }

    public static String decode(String byteString) throws UTF8Exception {
        byteArray = ucs2decode(byteString);
        byteCount = byteArray.length;
        byteIndex = 0;
        List<Integer> codePoints = new ArrayList<Integer>();
        int tmp;
        while ((tmp = decodeSymbol()) != -1) {
            codePoints.add(tmp);
        }
        return ucs2encode(listToArray(codePoints));
    }

    private static int[] ucs2decode(String string) {
        int length = string.length();
        int[] output = new int[string.codePointCount(0, length)];
        int counter = 0;
        int value;
        for (int i = 0; i < length; i += Character.charCount(value)) {
            value = string.codePointAt(i);
            output[counter++] = value;
        }
        return output;
    }

    private static String encodeCodePoint(int codePoint) throws UTF8Exception {
        StringBuilder symbol = new StringBuilder();
        if ((codePoint & 0xFFFFFF80) == 0) {
            return symbol.append(Character.toChars(codePoint)).toString();
        }
        if ((codePoint & 0xFFFFF800) == 0) {
            symbol.append(Character.toChars(((codePoint >> 6) & 0x1F) | 0xC0));
        } else if ((codePoint & 0xFFFF0000) == 0) {
            checkScalarValue(codePoint);
            symbol.append(Character.toChars(((codePoint >> 12) & 0x0F) | 0xE0));
            symbol.append(createByte(codePoint, 6));
        } else if ((codePoint & 0xFFE00000) == 0) {
            symbol.append(Character.toChars(((codePoint >> 18) & 0x07) | 0xF0));
            symbol.append(createByte(codePoint, 12));
            symbol.append(createByte(codePoint, 6));
        }
        symbol.append(Character.toChars((codePoint & 0x3F) | 0x80));
        return symbol.toString();
    }

    private static char[] createByte(int codePoint, int shift) {
        return Character.toChars(((codePoint >> shift) & 0x3F) | 0x80);
    }

    private static int decodeSymbol() throws UTF8Exception {
        int byte1;
        int byte2;
        int byte3;
        int byte4;
        int codePoint;

        if (byteIndex > byteCount) {
            throw new UTF8Exception("Invalid byte index");
        }

        if (byteIndex == byteCount) {
            return -1;
        }

        byte1 = byteArray[byteIndex] & 0xFF;
        byteIndex++;

        if ((byte1 & 0x80) == 0) {
            return byte1;
        }

        if ((byte1 & 0xE0) == 0xC0) {
            byte2 = readContinuationByte();
            codePoint = ((byte1 & 0x1F) << 6) | byte2;
            if (codePoint >= 0x80) {
                return codePoint;
            } else {
                throw new UTF8Exception(INVALID_CONTINUATION_BYTE);
            }
        }

        if ((byte1 & 0xF0) == 0xE0) {
            byte2 = readContinuationByte();
            byte3 = readContinuationByte();
            codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
            if (codePoint >= 0x0800) {
                checkScalarValue(codePoint);
                return codePoint;
            } else {
                throw new UTF8Exception(INVALID_CONTINUATION_BYTE);
            }
        }

        if ((byte1 & 0xF8) == 0xF0) {
            byte2 = readContinuationByte();
            byte3 = readContinuationByte();
            byte4 = readContinuationByte();
            codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) | (byte3 << 0x06) | byte4;
            if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                return codePoint;
            }
        }

        throw new UTF8Exception(INVALID_CONTINUATION_BYTE);
    }

    private static int readContinuationByte() throws UTF8Exception {
        if (byteIndex >= byteCount) {
            throw new UTF8Exception("Invalid byte index");
        }

        int continuationByte = byteArray[byteIndex] & 0xFF;
        byteIndex++;

        if ((continuationByte & 0xC0) == 0x80) {
            return continuationByte & 0x3F;
        }

        throw new UTF8Exception(INVALID_CONTINUATION_BYTE);
    }

    private static String ucs2encode(int[] array) {
        StringBuilder output = new StringBuilder();
        for (int value : array) {
            output.appendCodePoint(value);
        }
        return output.toString();
    }

    private static void checkScalarValue(int codePoint) throws UTF8Exception {
        if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
            throw new UTF8Exception(
                    "Lone surrogate U+" + Integer.toHexString(codePoint).toUpperCase() +
                    " is not a scalar value"
            );
        }
    }

    private static int[] listToArray(List<Integer> list) {
        int size = list.size();
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = list.get(i);
        }
        return array;
    }
}
