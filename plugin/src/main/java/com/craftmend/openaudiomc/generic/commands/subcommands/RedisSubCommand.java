package com.craftmend.openaudiomc.generic.commands.subcommands;


import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.openaudiomc.generic.redis.RedisService;

public class RedisSubCommand extends SubCommand {

    private RedisService redisService;

    public RedisSubCommand(RedisService redisService) {
        super("redis");
        this.redisService = redisService;
        registerArguments(

        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        sender.makeExecuteCommand("oa help " + getCommand());
    }
}
