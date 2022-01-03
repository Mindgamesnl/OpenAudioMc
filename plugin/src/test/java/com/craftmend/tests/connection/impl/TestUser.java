package com.craftmend.tests.connection.impl;

import com.craftmend.openaudiomc.OpenAudioMc;
import com.craftmend.openaudiomc.generic.logging.OpenAudioLogger;
import com.craftmend.openaudiomc.generic.storage.enums.StorageKey;
import com.craftmend.openaudiomc.generic.user.User;
import com.craftmend.tests.connection.ConnectionTest;
import com.craftmend.utils.FutureAssertion;
import lombok.AllArgsConstructor;
import net.md_5.bungee.api.chat.TextComponent;

import java.util.UUID;

@AllArgsConstructor
public class TestUser implements User {

    private boolean gotPreparingSession;

    private UUID id;
    private String name;

    @Override
    public Object getOriginal() {
        return null;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public UUID getUniqueId() {
        return id;
    }

    @Override
    public boolean isAdministrator() {
        return true;
    }

    @Override
    public boolean hasPermission(String permission) {
        return true;
    }

    @Override
    public void makeExecuteCommand(String command) {
        ConnectionTest.testLog("Running command for fake user " + name + ": " + command);
    }

    @Override
    public void sendMessage(String message) {
        ConnectionTest.testLog("Sending message to fake user " + name + ": " + message);

        if (!gotPreparingSession) {
            gotPreparingSession = true;
            ConnectionTest.assertionGroup.run(new FutureAssertion("User got a preparing session message", shit -> StorageKey.MESSAGE_GENERATING_SESSION.getString().equals(message)));
        }
    }

    @Override
    public void sendMessage(TextComponent textComponent) {
        ConnectionTest.testLog("Sending text component to fake user " + name + ": " + textComponent.getText());
    }

    @Override
    public void sendClickableCommandMessage(String message, String hoverMessage, String command) {

    }

    @Override
    public void sendClickableUrlMessage(String message, String hoverMessage, String url) {
        ConnectionTest.testLog("Sending url component to fake user " + name + ": " + message + " url=" + url);
        ConnectionTest.assertionGroup.run(new FutureAssertion("User link has a token", shit -> url.split("#")[1].length() > 2));
    }
}
