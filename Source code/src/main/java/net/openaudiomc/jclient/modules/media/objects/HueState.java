package net.openaudiomc.jclient.modules.media.objects;

import net.openaudiomc.jclient.modules.media.exceptions.InvalidColorCodeException;

public class HueState {

    private int red = 0;
    private int green = 0;
    private int blue = 0;
    private int brightness = 0;

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

    public HueState fromRgb(String rgb) throws InvalidColorCodeException {
        if (rgb.contains(" ")) throw new InvalidColorCodeException();

        rgb = rgb.replace("rgba(", "");
        rgb = rgb.replace(")", "");
        String[] args = rgb.split(",");

        if (args.length != 4) throw new InvalidColorCodeException();

        this.red = Integer.parseInt(args[0]);
        this.green = Integer.parseInt(args[0]);
        this.blue = Integer.parseInt(args[0]);
        this.brightness = Integer.parseInt(args[0]);

        return this;
    }

}
