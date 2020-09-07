package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.generic.commands.interfaces.GenericExecutor;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.redis.RedisService;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;

public class RedisSubCommand extends SubCommand {

    private RedisService redisService;

    public RedisSubCommand(RedisService redisService) {
        super("redis");
        this.redisService = redisService;
        
        registerArguments(

        );
    }

    @Override
    public void onExecute(GenericExecutor sender, String[] args) {


        Bukkit.getServer().dispatchCommand((CommandSender) sender.getOriginal(), "oa help " + getCommand());
    }
}
