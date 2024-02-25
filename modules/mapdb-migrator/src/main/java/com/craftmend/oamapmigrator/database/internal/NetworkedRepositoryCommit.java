package com.craftmend.oamapmigrator.database.internal;

import com.craftmend.oamapmigrator.database.MapDBService;
import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.proxy.messages.PacketWriter;
import com.craftmend.openaudiomc.generic.proxy.messages.StandardPacket;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.DataInputStream;
import java.io.IOException;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NetworkedRepositoryCommit extends StandardPacket {

    private String key;
    private String repositoryTypeClass;
    private String dataString;

    public void handle(DataInputStream dataInputStream) throws IOException {
        NetworkedRepositoryCommit self = OpenAudioMc.getGson().fromJson(dataInputStream.readUTF(), NetworkedRepositoryCommit.class);
        this.repositoryTypeClass = self.repositoryTypeClass;
        this.key = self.key;
        this.dataString = self.dataString;
    }

    public PacketWriter write() throws IOException {
        PacketWriter packetWriter = new PacketWriter(this);
        packetWriter.writeUTF(OpenAudioMc.getGson().toJson(this));
        return packetWriter;
    }

    public void commit() {
        MapDBService dbs = OpenAudioMc.getService(MapDBService.class);
        try {
            Class<? extends LegacyStore> dataStore = (Class<? extends LegacyStore>) Class.forName(repositoryTypeClass);
            dbs.getRepository(dataStore).saveString(key, dataString);
        } catch (ClassNotFoundException e) {
            OpenAudioLogger.info("Couldn't commit " + repositoryTypeClass + " because the class type is unknown");
        }
    }

}
