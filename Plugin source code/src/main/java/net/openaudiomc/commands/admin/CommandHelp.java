package net.openaudiomc.commands.admin;

import net.openaudiomc.commands.OpenAudioCommand;
import net.openaudiomc.core.Main;
import org.bukkit.ChatColor;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class CommandHelp implements OpenAudioCommand {

    @Override
    public String getSubCommand() {
        return "help";
    }

    @Override
    public boolean isPlayerCommand() {
        return true;
    }

    @Override
    public void execute(CommandSender sender, String[] args) {
        Player player = (Player) sender;
        if (args.length == 0) {
            String help = "/openaudio help ";
            String helpAction = ChatColor.translateAlternateColorCodes('&', "&c&l(Click here)&r&3 for help with %%.");
            
            player.sendMessage(Main.PREFIX + "Help menu.");
            String command = "[\"\",{\"text\":\"" + helpAction.replace("%%", "audio") + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "audio" + "\"}}]";
            String command2 = "[\"\",{\"text\":\"" + helpAction.replace("%%", "regions") + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "region" + "\"}}]";
            String command3 = "[\"\",{\"text\":\"" + helpAction.replace("%%", "philips hue lights") + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "hue" + "\"}}]";
            String command4 = "[\"\",{\"text\":\"" + helpAction.replace("%%", "admin commands")+ "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "admin" + "\"}}]";
            String command5 = "[\"\",{\"text\":\"" + helpAction.replace("%%", "user commands") + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "user" + "\"}}]";
            String command6 = "[\"\",{\"text\":\"" + helpAction.replace("%%", "the speaker system") + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "speaker" + "\"}}]";
            String command7 = "[\"\",{\"text\":\"" + helpAction.replace("%%", "the group system") + "\",\"clickEvent\":{\"action\":\"run_command\",\"value\":\"" + help + "group" + "\"}}]";

            Main.get().getReflection().sendChatPacket(player, command);
            Main.get().getReflection().sendChatPacket(player, command2);
            Main.get().getReflection().sendChatPacket(player, command3);
            Main.get().getReflection().sendChatPacket(player, command4);
            Main.get().getReflection().sendChatPacket(player, command5);
            Main.get().getReflection().sendChatPacket(player, command6);
            Main.get().getReflection().sendChatPacket(player, command7);
        } else if (args[0].equalsIgnoreCase("audio")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lAudio"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setvolume <selector/player> <volume> [id]&r&a Set the volume for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio skipto <selector/player> <id> <seconds>&r&a Skip to a part in a song."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio play <selector/player> <url> [id] [mode]&r&a Play a sound for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio toggle <selector/player> <id>&r&a Toggle play/pause for a sound."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio loop <selector/player> <url>&r&a Play a loop for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio stop <selector/player> [id]&r&a Stop the sound for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio stopall <selector/player>&r&a Stop all sounds for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setvolume <selector/player> [id]&r&a Set the volume for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio buffer create <selector/player> <url>&r&a Buffer a sound for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio buffer play <selector/player>&r&a Play sound in buffer for a player."));
        } else if (args[0].equalsIgnoreCase("region")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lRegion"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio region create <wg region name> <url>&r&a Add sound to a wg region."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio region delete <wg region name>&r&a Remove the sound from a wg region."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio playregion <wg region name> <url>&r&a Start sound for players in a region."));
        } else if (args[0].equalsIgnoreCase("hue")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lPhilips Hue"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue set <selector/player> <rgba code> [id]&r&a Set the hue lights for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue reset <selector/player>&r&a Reset the hue lights for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio hue effect <blink/stop/cycle> <selector/player>&r&a Start a hue effect for a player."));
        } else if (args[0].equalsIgnoreCase("admin")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lAdmin commands"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio oauth&a Get a key to use in third party apps."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio setbg <selector/player> <url/reset>&r&a Set the background image for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio spy&r&a Toggle connection spy."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio send <selector/player> <message>&r&a Send a push notification."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio json <selector/player> <json>&r&a Send a custom json string."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio playlist set <list> <id> <url>&r&a Set a song in a playlist."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio playlist play <list> <selector/player>&r&a Start the playlist for a player."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio reload&r&a Reloads the messages and the config from OA+."));
        } else if (args[0].equalsIgnoreCase("user")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lUser Commands"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/volume <number>&r&a Set your own volume."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/audio&r&a Give the url for the web client."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/connect&r&a Give the url for the web client."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/music&r&a Give the url for the web client."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/sound&r&a Give the url for the web client."));
        } else if (args[0].equalsIgnoreCase("speaker")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lSpeakers"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker add <url>&r&a Get a speaker, just place it and you are good to go."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&lHow to remove a speaker?&r&a Just break the speaker skull."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker stop&r&a Turn off all speakers."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker start&r&a Turn on all speakers."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker set <url> off&r&a Disable one speaker."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio speaker set <url> on&r&a Enable one speaker."));
        } else if (args[0].equalsIgnoreCase("group")) {
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', Main.PREFIX + "Help menu / &lGroup"));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio group set <group name> <selector/player>&r&a Set the players group."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio group remove <selector/player>&r&a Remove a player from a group."));
            player.sendMessage(ChatColor.translateAlternateColorCodes('&', " &c- &3&l/openaudio group list&r&a List players in a group."));
        } else {
            player.sendMessage(Main.PREFIX + "Invalid help page.");
        }
    }
}
