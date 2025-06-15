package com.craftmend.openaudiomc.generic.oac.response;

import com.craftmend.openaudiomc.generic.oac.enums.AccountState;
import com.craftmend.openaudiomc.generic.rest.response.AbstractRestResponse;

public class OpenaudioSettingsResponse extends AbstractRestResponse {
    private int voicechatSlots = 0;
    private boolean claimed = false;
    private boolean banned = false;
    private String clientUrl = "";
    private String startSound = "";
    private String startButton = "";
    private String backgroundImage = "";
    private String activeMessage = "";
    private String errorMessage = "";
    private String title = "";
    private String color = "";
    private String ambianceSound = "";
    private String welcomeMessage = "";
    private boolean useTranslations = false;
    private String displayName = "";
    private boolean isVoicechatEnabled = false;
    private boolean isPatreon = false;

    public boolean hasState(AccountState addonCategory) {
        switch (addonCategory) {
        case ACCOUNT: 
            return claimed;
        case VOICE: 
            return voicechatSlots > 0 && isVoicechatEnabled;
        }
        return false;
    }

    public int getVoicechatSlots() {
        return this.voicechatSlots;
    }

    public boolean isClaimed() {
        return this.claimed;
    }

    public boolean isBanned() {
        return this.banned;
    }

    public String getClientUrl() {
        return this.clientUrl;
    }

    public String getStartSound() {
        return this.startSound;
    }

    public String getStartButton() {
        return this.startButton;
    }

    public String getBackgroundImage() {
        return this.backgroundImage;
    }

    public String getActiveMessage() {
        return this.activeMessage;
    }

    public String getErrorMessage() {
        return this.errorMessage;
    }

    public String getTitle() {
        return this.title;
    }

    public String getColor() {
        return this.color;
    }

    public String getAmbianceSound() {
        return this.ambianceSound;
    }

    public String getWelcomeMessage() {
        return this.welcomeMessage;
    }

    public boolean isUseTranslations() {
        return this.useTranslations;
    }

    public String getDisplayName() {
        return this.displayName;
    }

    public boolean isVoicechatEnabled() {
        return this.isVoicechatEnabled;
    }

    public boolean isPatreon() {
        return this.isPatreon;
    }

    public void setVoicechatSlots(final int voicechatSlots) {
        this.voicechatSlots = voicechatSlots;
    }

    public void setClaimed(final boolean claimed) {
        this.claimed = claimed;
    }

    public void setBanned(final boolean banned) {
        this.banned = banned;
    }

    public void setClientUrl(final String clientUrl) {
        this.clientUrl = clientUrl;
    }

    public void setStartSound(final String startSound) {
        this.startSound = startSound;
    }

    public void setStartButton(final String startButton) {
        this.startButton = startButton;
    }

    public void setBackgroundImage(final String backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public void setActiveMessage(final String activeMessage) {
        this.activeMessage = activeMessage;
    }

    public void setErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    public void setColor(final String color) {
        this.color = color;
    }

    public void setAmbianceSound(final String ambianceSound) {
        this.ambianceSound = ambianceSound;
    }

    public void setWelcomeMessage(final String welcomeMessage) {
        this.welcomeMessage = welcomeMessage;
    }

    public void setUseTranslations(final boolean useTranslations) {
        this.useTranslations = useTranslations;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }

    public void setVoicechatEnabled(final boolean isVoicechatEnabled) {
        this.isVoicechatEnabled = isVoicechatEnabled;
    }

    public void setPatreon(final boolean isPatreon) {
        this.isPatreon = isPatreon;
    }

    @Override
    public String toString() {
        return "OpenaudioSettingsResponse(voicechatSlots=" + this.getVoicechatSlots() + ", claimed=" + this.isClaimed() + ", banned=" + this.isBanned() + ", clientUrl=" + this.getClientUrl() + ", startSound=" + this.getStartSound() + ", startButton=" + this.getStartButton() + ", backgroundImage=" + this.getBackgroundImage() + ", activeMessage=" + this.getActiveMessage() + ", errorMessage=" + this.getErrorMessage() + ", title=" + this.getTitle() + ", color=" + this.getColor() + ", ambianceSound=" + this.getAmbianceSound() + ", welcomeMessage=" + this.getWelcomeMessage() + ", useTranslations=" + this.isUseTranslations() + ", displayName=" + this.getDisplayName() + ", isVoicechatEnabled=" + this.isVoicechatEnabled() + ", isPatreon=" + this.isPatreon() + ")";
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof OpenaudioSettingsResponse)) return false;
        final OpenaudioSettingsResponse other = (OpenaudioSettingsResponse) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.getVoicechatSlots() != other.getVoicechatSlots()) return false;
        if (this.isClaimed() != other.isClaimed()) return false;
        if (this.isBanned() != other.isBanned()) return false;
        if (this.isUseTranslations() != other.isUseTranslations()) return false;
        if (this.isVoicechatEnabled() != other.isVoicechatEnabled()) return false;
        if (this.isPatreon() != other.isPatreon()) return false;
        final Object this$clientUrl = this.getClientUrl();
        final Object other$clientUrl = other.getClientUrl();
        if (this$clientUrl == null ? other$clientUrl != null : !this$clientUrl.equals(other$clientUrl)) return false;
        final Object this$startSound = this.getStartSound();
        final Object other$startSound = other.getStartSound();
        if (this$startSound == null ? other$startSound != null : !this$startSound.equals(other$startSound)) return false;
        final Object this$startButton = this.getStartButton();
        final Object other$startButton = other.getStartButton();
        if (this$startButton == null ? other$startButton != null : !this$startButton.equals(other$startButton)) return false;
        final Object this$backgroundImage = this.getBackgroundImage();
        final Object other$backgroundImage = other.getBackgroundImage();
        if (this$backgroundImage == null ? other$backgroundImage != null : !this$backgroundImage.equals(other$backgroundImage)) return false;
        final Object this$activeMessage = this.getActiveMessage();
        final Object other$activeMessage = other.getActiveMessage();
        if (this$activeMessage == null ? other$activeMessage != null : !this$activeMessage.equals(other$activeMessage)) return false;
        final Object this$errorMessage = this.getErrorMessage();
        final Object other$errorMessage = other.getErrorMessage();
        if (this$errorMessage == null ? other$errorMessage != null : !this$errorMessage.equals(other$errorMessage)) return false;
        final Object this$title = this.getTitle();
        final Object other$title = other.getTitle();
        if (this$title == null ? other$title != null : !this$title.equals(other$title)) return false;
        final Object this$color = this.getColor();
        final Object other$color = other.getColor();
        if (this$color == null ? other$color != null : !this$color.equals(other$color)) return false;
        final Object this$ambianceSound = this.getAmbianceSound();
        final Object other$ambianceSound = other.getAmbianceSound();
        if (this$ambianceSound == null ? other$ambianceSound != null : !this$ambianceSound.equals(other$ambianceSound)) return false;
        final Object this$welcomeMessage = this.getWelcomeMessage();
        final Object other$welcomeMessage = other.getWelcomeMessage();
        if (this$welcomeMessage == null ? other$welcomeMessage != null : !this$welcomeMessage.equals(other$welcomeMessage)) return false;
        final Object this$displayName = this.getDisplayName();
        final Object other$displayName = other.getDisplayName();
        if (this$displayName == null ? other$displayName != null : !this$displayName.equals(other$displayName)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof OpenaudioSettingsResponse;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.getVoicechatSlots();
        result = result * PRIME + (this.isClaimed() ? 79 : 97);
        result = result * PRIME + (this.isBanned() ? 79 : 97);
        result = result * PRIME + (this.isUseTranslations() ? 79 : 97);
        result = result * PRIME + (this.isVoicechatEnabled() ? 79 : 97);
        result = result * PRIME + (this.isPatreon() ? 79 : 97);
        final Object $clientUrl = this.getClientUrl();
        result = result * PRIME + ($clientUrl == null ? 43 : $clientUrl.hashCode());
        final Object $startSound = this.getStartSound();
        result = result * PRIME + ($startSound == null ? 43 : $startSound.hashCode());
        final Object $startButton = this.getStartButton();
        result = result * PRIME + ($startButton == null ? 43 : $startButton.hashCode());
        final Object $backgroundImage = this.getBackgroundImage();
        result = result * PRIME + ($backgroundImage == null ? 43 : $backgroundImage.hashCode());
        final Object $activeMessage = this.getActiveMessage();
        result = result * PRIME + ($activeMessage == null ? 43 : $activeMessage.hashCode());
        final Object $errorMessage = this.getErrorMessage();
        result = result * PRIME + ($errorMessage == null ? 43 : $errorMessage.hashCode());
        final Object $title = this.getTitle();
        result = result * PRIME + ($title == null ? 43 : $title.hashCode());
        final Object $color = this.getColor();
        result = result * PRIME + ($color == null ? 43 : $color.hashCode());
        final Object $ambianceSound = this.getAmbianceSound();
        result = result * PRIME + ($ambianceSound == null ? 43 : $ambianceSound.hashCode());
        final Object $welcomeMessage = this.getWelcomeMessage();
        result = result * PRIME + ($welcomeMessage == null ? 43 : $welcomeMessage.hashCode());
        final Object $displayName = this.getDisplayName();
        result = result * PRIME + ($displayName == null ? 43 : $displayName.hashCode());
        return result;
    }

    public OpenaudioSettingsResponse() {
    }
}
