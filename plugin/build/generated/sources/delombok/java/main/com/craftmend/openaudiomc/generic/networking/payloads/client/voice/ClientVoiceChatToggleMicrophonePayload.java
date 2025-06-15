package com.craftmend.openaudiomc.generic.networking.payloads.client.voice;

import com.craftmend.openaudiomc.generic.networking.abstracts.AbstractPacketPayload;

public class ClientVoiceChatToggleMicrophonePayload extends AbstractPacketPayload {
	@Override
	public String toString() {
		return "ClientVoiceChatToggleMicrophonePayload()";
	}

	@Override
	public boolean equals(final Object o) {
		if (o == this) return true;
		if (!(o instanceof ClientVoiceChatToggleMicrophonePayload)) return false;
		final ClientVoiceChatToggleMicrophonePayload other = (ClientVoiceChatToggleMicrophonePayload) o;
		if (!other.canEqual((Object) this)) return false;
		return true;
	}

	protected boolean canEqual(final Object other) {
		return other instanceof ClientVoiceChatToggleMicrophonePayload;
	}

	@Override
	public int hashCode() {
		final int result = 1;
		return result;
	}

	public ClientVoiceChatToggleMicrophonePayload() {
	}
}
