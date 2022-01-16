package com.craftmend.openaudiomc.generic.commands.subcommands;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.commands.interfaces.SubCommand;
import com.craftmend.openaudiomc.generic.commands.objects.Argument;
import com.craftmend.openaudiomc.generic.craftmend.CraftmendService;
import com.craftmend.openaudiomc.generic.platform.OaColor;
import com.craftmend.openaudiomc.generic.user.User;
import lombok.SneakyThrows;

import java.lang.reflect.Field;

public class ResetCmDebugCommand extends SubCommand {

    public ResetCmDebugCommand() {
        super("cm-reset");
        registerArguments(
                new Argument("", "Forcefully resets RTP state to debug or force resets")
        );
        ignorePermissions = false;
        listed = false;
    }

    @Override
    @SneakyThrows
    public void onExecute(User user, String[] strings) {
        CraftmendService cs = OpenAudioMc.getService(CraftmendService.class);

        user.sendMessage(OaColor.RED + "Resetting craftmend account state...");

        // this value isn't normally exposed, so we need to update it through reflection
        setCraftmendServiceBool("isVcLocked", false);
        setCraftmendServiceBool("isAttemptingVcConnect", false);
        setCraftmendServiceBool("lockVcAttempt", false);
        setCraftmendServiceBool("initialized", true);

        if (cs.getVoiceApiConnection() != null) {
            cs.getVoiceApiConnection().stop();
        }

        cs.startVoiceHandshake(true);
        user.sendMessage(OaColor.RED + "Attempting login");
    }

    private void setCraftmendServiceBool(String fieldName, boolean state) throws NoSuchFieldException, IllegalAccessException {
        CraftmendService cs = OpenAudioMc.getService(CraftmendService.class);
        Field f = CraftmendService.class.getDeclaredField(fieldName);
        f.setAccessible(true);
        f.set(cs, true);
    }
}
