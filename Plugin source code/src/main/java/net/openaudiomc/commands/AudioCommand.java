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

import net.openaudiomc.core.Main;
import net.openaudiomc.socket.Authenticator;
import org.bukkit.command.Command;
import org.bukkit.command.CommandExecutor;
import org.bukkit.command.CommandSender;
import net.openaudiomc.players.Sessions;
import net.openaudiomc.socket.TimeoutManager;
import org.bukkit.entity.Player;

import static net.openaudiomc.commands.AdminCommands.error;
import static net.openaudiomc.core.Main.sm;
import static net.openaudiomc.core.Main.tr;

public class AudioCommand implements CommandExecutor {

  @Override
  public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
    if (!(sender instanceof Player)) {
      error(sender, AdminCommands.NO_PLAYER_INSTANCE);
      return true;
    } else {
      TimeoutManager.requestConnect();
      if (TimeoutManager.isReady()) {
        if (args.length > 2) {
          if (args[0].equalsIgnoreCase("volume")
              || args[0].equalsIgnoreCase("v")
              || args[0].equalsIgnoreCase("-v")) {
            ((Player) sender).chat("/volume " + args[1]);
            return true;
          } else {
            error(sender, "Usage: /" + label + " volume <0-100>");
            return false;
          }
        } else {
          if (tr("connect.message").isPresent()) {
            String url = Main.get().getWebConfig().getWebsiteUrl()
                .replace("%name%", sender.getName())
                .replace("%session%",
                    Authenticator.getClientID() + ":" + Sessions.getSession(sender.getName()));

            String message = "[\"\",{\"text\":\""
                    + tr("connect.message").get()
                    + "\",\"clickEvent\":{\"action\":\"open_url\",\"value\":\""
                    + url
                    + "\"}}]"
                    + "";
            Main.get().getReflection().sendChatPacket((Player) sender, message);
          }
          return true;
        }
      } else {
        sm(sender, "socketio.loading");
        return true;
      }
    }
  }
}
