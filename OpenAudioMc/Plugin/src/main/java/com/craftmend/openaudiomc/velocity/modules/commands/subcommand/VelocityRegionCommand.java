package com.craftmend.openaudiomc.velocity.modules.commands.subcommand;


import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.media.tabcomplete.MediaTabcompleteProvider;
import com.craftmend.openaudiomc.generic.node.enums.ProxiedCommand;
import com.craftmend.openaudiomc.generic.node.packets.CommandProxyPacket;
import com.craftmend.openaudiomc.generic.proxy.interfaces.UserHooks;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.spigot.modules.proxy.objects.CommandProxyPayload;
import com.velocitypowered.api.proxy.Player;

public class VelocityRegionCommand extends SubCommand {

    public VelocityRegionCommand() {
        super("region");
        registerArguments(
                new Argument("create <WG-region> <source> [volume]",
                        "Assigns a sound to a WorldGuard region by name, with optional volume")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<region-name>"})
                        .addTabCompleteProvider(2, MediaTabcompleteProvider.getInstance()),

                new Argument("temp <WG-region> <source> <duration>",
                        "Create a temporary region with it's own synced sound")
                        .addTabCompleteProvider(1, (sender) -> new String[]{"<region-name>"})
                        .addTabCompleteProvider(2, MediaTabcompleteProvider.getInstance()),

                new Argument("delete <WG-region>",
                        "Unlink the sound from a WorldGuard specific region by name"),

                new Argument("edit",
                        "Change settings through the a GUI"),

                new Argument("edit volume <region> <volume>",
                        "Change the volume of a region"),

                new Argument("edit fade <region> <fade time MS>",
                        "Change the fade of a region"),

                new Argument("list",
                        "List all regions at your current location and their properties"),

                new Argument("forceupdate", "Force all regions to update their media cache")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        // pass on to the spigot server
        if (sender.getOriginal() instanceof Player) {
            Player player = (Player) sender.getOriginal();

            CommandProxyPayload payload = new CommandProxyPayload();
            payload.setExecutor(player.getUniqueId());
            payload.setArgs(args);
            payload.setProxiedCommand(ProxiedCommand.REGION);
            OpenAudioMc.resolveDependency(UserHooks.class).sendPacket(sender, new CommandProxyPacket(payload));
        }
    }
}
