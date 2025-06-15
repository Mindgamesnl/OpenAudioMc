package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVoiceChatToggleDeafenPayload extends AbstractPacketPayload {
	@Override
	public String toString() {
		return "ClientVoiceChatToggleDeafenPayload()";
	}

	@Override
	public boolean equals(final Object o) {
		if (o == this) return true;
		if (!(o instanceof ClientVoiceChatToggleDeafenPayload)) return false;
		final ClientVoiceChatToggleDeafenPayload other = (ClientVoiceChatToggleDeafenPayload) o;
		if (!other.canEqual((Object) this)) return false;
		return true;
	}

	protected boolean canEqual(final Object other) {
		return other instanceof ClientVoiceChatToggleDeafenPayload;
	}

	@Override
	public int hashCode() {
		final int result = 1;
		return result;
	}

	public ClientVoiceChatToggleDeafenPayload() {
	}
}
