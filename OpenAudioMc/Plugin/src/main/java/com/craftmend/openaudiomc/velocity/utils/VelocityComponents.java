package com.craftmend.openaudiomc.velocity.utils;

import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.text.ForeignAdventure;
import com.velocitypowered.api.command.CommandSource;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.serializer.legacy.LegacyComponentSerializer;

import java.lang.reflect.Method;

public final class VelocityComponents {

    private static Method sendMessage;

    private VelocityComponents() {
    }

    public static void sendPlain(CommandSource source, String text) {
        try {
            sendMessage(source, ForeignAdventure.text(text));
        } catch (Throwable e) {
            OpenAudioLogger.error(e, "Failed to send a message to a Velocity command source");
        }
    }

    public static void send(CommandSource source, Component component) {
        try {
            sendMessage(source, ForeignAdventure.convert(component));
        } catch (Throwable e) {
            OpenAudioLogger.warn("Failed to send a component to a Velocity command source, falling back to color codes: " + e.getMessage());
            sendPlain(source, LegacyComponentSerializer.legacySection().serialize(component));
        }
    }

    private static synchronized void sendMessage(CommandSource source, Object component) throws Exception {
        if (sendMessage == null) {
            sendMessage = CommandSource.class.getMethod("sendMessage", ForeignAdventure.componentClass());
        }
        sendMessage.invoke(source, component);
    }

}
