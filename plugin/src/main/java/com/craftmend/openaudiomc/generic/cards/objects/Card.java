package com.craftmend.openaudiomc.generic.cards.objects;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.networking.client.objects.player.ClientConnection;
import com.craftmend.openaudiomc.generic.networking.packets.client.card.PacketClientCreateCard;
import com.craftmend.openaudiomc.generic.networking.packets.client.card.PacketClientDestroyCard;
import com.craftmend.openaudiomc.generic.networking.packets.client.card.PacketClientUpdateCard;
import lombok.Getter;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

public class Card {

    @Getter private String title;
    private List<Row> rows = new ArrayList<>();
    @Getter private UUID cardId = UUID.randomUUID();
    private transient List<String> ids = new ArrayList<>();

    public Card(String title) {
        this.title = title;
    }

    public Card updateText(String id, Text newText) {
        if (!ids.contains(id)) throw new IllegalArgumentException("There is no element called " + id + " in this card");

        this.rows.forEach(row -> {
            List<ReplacementText> replacementTexts = new ArrayList<>();
            for (Text text : row.getTextList()) {
                if (text.getId().equals(id)) {
                    int index = row.getTextList().indexOf(text);
                    replacementTexts.add(new ReplacementText(index, text));
                }
            }
            replacementTexts.forEach(replacementText -> {
                row.getTextList().set(replacementText.getIndex(), newText);
            });
        });

        PacketClientUpdateCard cardUpdate = new PacketClientUpdateCard(id, OpenAudioMc.getGson().toJson(newText));

        OpenAudioMc.getInstance().getNetworkingService().getClients().forEach(client -> {
            if (client.getCard() != null && cardId.toString().equals(client.getCard().getCardId().toString())) {
                // update card
                OpenAudioMc.getInstance().getNetworkingService().send(client, cardUpdate);
            }
        });

        return this;
    }

    public Card addPlayer(Player player) {
        addPlayer(player.getUniqueId());
        return this;
    }

    public Card removePlayer(Player player) {
        removePlayer(player.getUniqueId());
        return this;
    }

    public Card addPlayer(UUID uuid) {
        ClientConnection clientConnection = OpenAudioMc.getApi().getClient(uuid);
        if (clientConnection == null) throw new IllegalStateException("Player does not have a client connection session");

        clientConnection.setCard(this);
        // send show packet
        OpenAudioMc.getInstance().getNetworkingService().send(clientConnection, new PacketClientCreateCard(this));
        return this;
    }

    public Card removePlayer(UUID uuid) {
        ClientConnection clientConnection = OpenAudioMc.getApi().getClient(uuid);
        if (clientConnection == null) throw new IllegalStateException("Player does not have a client connection session");

        if (clientConnection.getCard() != null && clientConnection.getCard().toString().equals(cardId.toString())) {
            clientConnection.setCard(null);
        }

        // send destroy card packet
        OpenAudioMc.getInstance().getNetworkingService().send(clientConnection, new PacketClientDestroyCard());
        return this;
    }

    public Card addRow(Text... texts) {
        for (Text text : texts) {
            if (ids.contains(text.getId())) {
                throw new IllegalStateException("There already exists a element with id " + text.getId() + " in this card.");
            } else {
                ids.add(text.getId());
            }
        }

        if (texts.length > 15) throw new IllegalArgumentException("A row may not have more than 15 text elements");

        this.rows.add(new Row(Arrays.asList(texts)));
        return this;
    }

    public String toJson() {
        return OpenAudioMc.getGson().toJson(this);
    }


}
