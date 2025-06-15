package com.craftmend.openaudiomc.spigot.modules.proxy.objects;

import com.craftmend.openaudiomc.generic.node.enums.ProxiedCommand;
import java.util.UUID;

public class CommandProxyPayload {
    private ProxiedCommand proxiedCommand;
    private String[] args;
    private UUID executor;

    public ProxiedCommand getProxiedCommand() {
        return this.proxiedCommand;
    }

    public String[] getArgs() {
        return this.args;
    }

    public UUID getExecutor() {
        return this.executor;
    }

    public void setProxiedCommand(final ProxiedCommand proxiedCommand) {
        this.proxiedCommand = proxiedCommand;
    }

    public void setArgs(final String[] args) {
        this.args = args;
    }

    public void setExecutor(final UUID executor) {
        this.executor = executor;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof CommandProxyPayload)) return false;
        final CommandProxyPayload other = (CommandProxyPayload) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$proxiedCommand = this.getProxiedCommand();
        final Object other$proxiedCommand = other.getProxiedCommand();
        if (this$proxiedCommand == null ? other$proxiedCommand != null : !this$proxiedCommand.equals(other$proxiedCommand)) return false;
        if (!java.util.Arrays.deepEquals(this.getArgs(), other.getArgs())) return false;
        final Object this$executor = this.getExecutor();
        final Object other$executor = other.getExecutor();
        if (this$executor == null ? other$executor != null : !this$executor.equals(other$executor)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof CommandProxyPayload;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $proxiedCommand = this.getProxiedCommand();
        result = result * PRIME + ($proxiedCommand == null ? 43 : $proxiedCommand.hashCode());
        result = result * PRIME + java.util.Arrays.deepHashCode(this.getArgs());
        final Object $executor = this.getExecutor();
        result = result * PRIME + ($executor == null ? 43 : $executor.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "CommandProxyPayload(proxiedCommand=" + this.getProxiedCommand() + ", args=" + java.util.Arrays.deepToString(this.getArgs()) + ", executor=" + this.getExecutor() + ")";
    }

    public CommandProxyPayload() {
    }

    public CommandProxyPayload(final ProxiedCommand proxiedCommand, final String[] args, final UUID executor) {
        this.proxiedCommand = proxiedCommand;
        this.args = args;
        this.executor = executor;
    }
}
