package net.openaudiomc.jclient.modules.media.objects;

import net.openaudiomc.jclient.modules.media.exceptions.InvalidColorCodeException;
import net.openaudiomc.jclient.modules.player.objects.AudioListener;
import net.openaudiomc.jclient.modules.socket.enums.PacketCommand;
import net.openaudiomc.jclient.modules.socket.objects.OaPacket;

public class HueState {

    private int red = 0;
    private int green = 0;
    private int blue = 0;
    private int brightness = 0;

    private PacketCommand command = PacketCommand.HUE;

    public HueState() {

    }

    public HueState setRed(int r) {
        this.red = r;
        return this;
    }

    public HueState setGreen(int g) {
        this.green = g;
        return this;
    }

    public HueState setBlue(int b) {
        this.blue = b;
        return this;
    }

    public HueState setBrightness(int b) {
        this.brightness = b;
        return this;
    }

    public HueState fromRgba(String rgba) throws InvalidColorCodeException {
        if (rgba.contains(" ")) throw new InvalidColorCodeException();

        rgba = rgba.replace("rgba(", "");
        rgba = rgba.replace(")", "");
        String[] args = rgba.split(",");

        if (args.length != 4) throw new InvalidColorCodeException();

        this.red = Integer.parseInt(args[0]);
        this.green = Integer.parseInt(args[0]);
        this.blue = Integer.parseInt(args[0]);
        this.brightness = Integer.parseInt(args[0]);

        return this;
    }

    public OaPacket getHandle(AudioListener listener) {
        OaPacket p = new OaPacket().setCommand(command).setPlayer(listener);
        p.setValue("rgba(" + red + "," + green + "," + blue + "," + brightness + ")");
        return p;
    }
}
