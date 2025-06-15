package com.craftmend.openaudiomc.generic.networking.payloads.in;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;
import java.util.UUID;

public class ClientVoiceInteractionPayload extends AbstractPacketPayload {
    private UUID client;
    private String target;
    private String action;

    public UUID getClient() {
        return this.client;
    }

    public String getTarget() {
        return this.target;
    }

    public String getAction() {
        return this.action;
    }

    public void setClient(final UUID client) {
        this.client = client;
    }

    public void setTarget(final String target) {
        this.target = target;
    }

    public void setAction(final String action) {
        this.action = action;
    }

    @Override
    public String toString() {
        return "ClientVoiceInteractionPayload(client=" + this.getClient() + ", target=" + this.getTarget() + ", action=" + this.getAction() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ClientVoiceInteractionPayload)) return false;
        final ClientVoiceInteractionPayload other = (ClientVoiceInteractionPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$client = this.getClient();
        final Object other$client = other.getClient();
        if (this$client == null ? other$client != null : !this$client.equals(other$client)) return false;
        final Object this$target = this.getTarget();
        final Object other$target = other.getTarget();
        if (this$target == null ? other$target != null : !this$target.equals(other$target)) return false;
        final Object this$action = this.getAction();
        final Object other$action = other.getAction();
        if (this$action == null ? other$action != null : !this$action.equals(other$action)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ClientVoiceInteractionPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $client = this.getClient();
        result = result * PRIME + ($client == null ? 43 : $client.hashCode());
        final Object $target = this.getTarget();
        result = result * PRIME + ($target == null ? 43 : $target.hashCode());
        final Object $action = this.getAction();
        result = result * PRIME + ($action == null ? 43 : $action.hashCode());
        return result;
    }

    public ClientVoiceInteractionPayload(final UUID client, final String target, final String action) {
        this.client = client;
        this.target = target;
        this.action = action;
    }

    public ClientVoiceInteractionPayload() {
    }
}
