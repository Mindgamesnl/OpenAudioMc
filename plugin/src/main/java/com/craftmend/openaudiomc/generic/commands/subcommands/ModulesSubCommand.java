package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.generic.user.User;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

public class ModulesSubCommand extends SubCommand {

    public ModulesSubCommand() {
        super("modules");
        registerArguments(
                new Argument("", "List all modules")
        );
    }

    @Override
    public void onExecute(User sender, String[] args) {
        // get all entries in the module folder
        message(sender, "Modules:");
        for (File loadedModuleFile : OpenAudioMc.getService(ModuleLoaderService.class).getLoadedModuleFiles()) {
            // get shasum of the file
            try (InputStream is = Files.newInputStream(loadedModuleFile.toPath())) {
                String md5 = org.apache.commons.codec.digest.DigestUtils.md5Hex(is);
                message(sender, " - " + loadedModuleFile.getName() + " (" + md5 + " md5))");
            } catch (IOException e) {
                message(sender, " - " + loadedModuleFile.getName() + " (unknown hash)");
            }
        }
    }
}
