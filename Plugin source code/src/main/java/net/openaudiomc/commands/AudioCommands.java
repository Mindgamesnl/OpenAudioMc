/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
package net.openaudiomc.commands;

import net.openaudiomc.files.Messages;
import net.openaudiomc.socket.Authenticator;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import org.bukkit.command.ConsoleCommandSender;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.socket.TimeoutManager;
import org.bukkit.entity.Player;

public class AudioCommands implements CommandExecutor {

  @Override
  public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
    TimeoutManager.requestConnect();
    if (TimeoutManager.ioready) {

      if (args.length == 2) {
        if (args[0].equalsIgnoreCase("volume") || args[0].equalsIgnoreCase("v")) {
          Player p = (Player) sender;
          p.chat("/volume " + args[1]);
          return true;
        }
      }

      String url = Messages.getColor("website-url");
      url = url.replace("%name%", sender.getName());
      url = url.replace("%session%",
          Authenticator.getClientID() + ":" + Sessions.getSession(sender.getName()));

      String message = Messages.getColor("connect-message");

      ConsoleCommandSender console = Bukkit.getServer().getConsoleSender();
      String command = "tellraw "
          + sender.getName()
          + " "
          + "[\"\",{\"text\":\""
          + message
          + "\",\"clickEvent\":{\"action\":\"open_url\",\"value\":\""
          + url
          + "\"}}]"
          + "";
      Bukkit.dispatchCommand(console, command);
      return true;
    } else {
      sender.sendMessage(Messages.getColor("socketio-loading"));
      return true;
    }
  }
}
