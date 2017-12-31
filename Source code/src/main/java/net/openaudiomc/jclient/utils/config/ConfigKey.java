package net.openaudiomc.jclient.utils.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter @ToString
public class ConfigKey {

    private String header;

    private String publicKey;
    private String privateKey;

    public List<String> serialize() {
        List<String> list = new ArrayList<>();
        list.add(header);
        list.add("key:");
        list.add("  public: '" + publicKey + "'");
        list.add("  private: '" + privateKey + "'");
        return list;
    }
}