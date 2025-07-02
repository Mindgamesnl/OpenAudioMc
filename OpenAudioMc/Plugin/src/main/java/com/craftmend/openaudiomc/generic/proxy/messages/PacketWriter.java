package com.craftmend.openaudiomc.generic.proxy.messages;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;

/**
 * Created by iKeirNez on 12/12/13, ported to velocity and modified by fluse1367 on 11/2020.
 */
public class PacketWriter {

    private final StandardPacket packet;

    private final ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
    private final DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);

    /**
     * Creates a new instance of this class
     * @param packet The packet that is writing to this instance
     */
    public PacketWriter(StandardPacket packet){
        this.packet = packet;

        if (!(packet instanceof RawPacket)){
            try {
                dataOutputStream.writeUTF(packet.getClass().getName());
            } catch (IOException e) {
                OpenAudioLogger.error(e, "Failed to write packet class name to packet");
            }
        }
    }

    public byte[] toByteArray(){
        return byteArrayOutputStream.toByteArray();
    }

    // DataOutputStream methods

    public void write(int v) throws IOException {
        dataOutputStream.write(v);
    }

    public void write(byte[] b, int off, int len) throws IOException {
        dataOutputStream.write(b, off, len);
    }

    public void write(byte[] b) throws IOException {
        dataOutputStream.write(b);
    }

    public void flush() throws IOException {
        dataOutputStream.flush();
    }

    public void writeBoolean(boolean v) throws IOException {
        dataOutputStream.writeBoolean(v);
    }

    public void writeByte(int v) throws IOException {
        dataOutputStream.writeByte(v);
    }

    public void writeShort(int v) throws IOException {
        dataOutputStream.writeShort(v);
    }

    public void writeChar(int v) throws IOException {
        dataOutputStream.writeChar(v);
    }

    public void writeInt(int v) throws IOException {
        dataOutputStream.writeInt(v);
    }

    public void writeLong(long v) throws IOException {
        dataOutputStream.writeLong(v);
    }

    public void writeFloat(float v) throws IOException {
        dataOutputStream.writeFloat(v);
    }

    public void writeDouble(double v) throws IOException {
        dataOutputStream.writeDouble(v);
    }

    public void writeBytes(String s) throws IOException {
        dataOutputStream.writeBytes(s);
    }

    public void writeChars(String s) throws IOException {
        dataOutputStream.writeChars(s);
    }

    public void writeUTF(String str) throws IOException {
        dataOutputStream.writeUTF(str);
    }

    public int size() {
        return dataOutputStream.size();
    }

}
