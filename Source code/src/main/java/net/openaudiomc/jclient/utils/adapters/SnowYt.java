package net.openaudiomc.jclient.utils.adapters;

import com.google.gson.annotations.SerializedName;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class SnowYt {

    @SerializedName("mediacomplete")
    private String fullEndpoint = "";
}
