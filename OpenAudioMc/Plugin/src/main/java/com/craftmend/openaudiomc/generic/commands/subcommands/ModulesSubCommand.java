package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.modules.ModuleLoaderService;
import com.craftmend.openaudiomc.api.user.User;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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
            try {
                String md5 = md5FromFile(loadedModuleFile);
                message(sender, " - " + loadedModuleFile.getName() + " (" + md5 + " md5))");
            } catch (IOException | NoSuchAlgorithmException e) {
                message(sender, " - " + loadedModuleFile.getName() + " (unknown hash)");
            }
        }
    }

    private String md5FromFile(File file) throws IOException, NoSuchAlgorithmException {
        byte[] data = Files.readAllBytes(file.toPath());
        byte[] hash = MessageDigest.getInstance("MD5").digest(data);
        String checksum = new BigInteger(1, hash).toString(16);
        return checksum;
    }
}
