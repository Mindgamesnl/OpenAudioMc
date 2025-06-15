package com.craftmend.openaudiomc.spigot.modules.events;

import com.craftmend.openaudiomc.api.events.CancellableEvent;
import org.bukkit.command.CommandSender;

public class SpigotAudioCommandEvent extends CancellableEvent {
    private CommandSender sender;
    private String[] args;

    public CommandSender getSender() {
        return this.sender;
    }

    public String[] getArgs() {
        return this.args;
    }

    public void setSender(final CommandSender sender) {
        this.sender = sender;
    }

    public void setArgs(final String[] args) {
        this.args = args;
    }

    @Override
    public String toString() {
        return "SpigotAudioCommandEvent(sender=" + this.getSender() + ", args=" + java.util.Arrays.deepToString(this.getArgs()) + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof SpigotAudioCommandEvent)) return false;
        final SpigotAudioCommandEvent other = (SpigotAudioCommandEvent) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$sender = this.getSender();
        final Object other$sender = other.getSender();
        if (this$sender == null ? other$sender != null : !this$sender.equals(other$sender)) return false;
        if (!java.util.Arrays.deepEquals(this.getArgs(), other.getArgs())) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof SpigotAudioCommandEvent;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $sender = this.getSender();
        result = result * PRIME + ($sender == null ? 43 : $sender.hashCode());
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getArgs());
        return result;
    }

    public SpigotAudioCommandEvent(final CommandSender sender, final String[] args) {
        this.sender = sender;
        this.args = args;
    }
}
