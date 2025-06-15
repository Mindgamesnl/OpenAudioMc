package com.craftmend.openaudiomc.generic.authentication.objects;

import java.util.UUID;

public class RequestResponse {
    /**
     * response of a http request, and its possible values
     */
    private boolean success;
    private UUID publicKey;
    private UUID privateKey;

    /**
     * response of a http request, and its possible values
     */
    public boolean isSuccess() {
        return this.success;
    }

    public UUID getPublicKey() {
        return this.publicKey;
    }

    public UUID getPrivateKey() {
        return this.privateKey;
    }

    /**
     * response of a http request, and its possible values
     */
    public void setSuccess(final boolean success) {
        this.success = success;
    }

    public void setPublicKey(final UUID publicKey) {
        this.publicKey = publicKey;
    }

    public void setPrivateKey(final UUID privateKey) {
        this.privateKey = privateKey;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof RequestResponse)) return false;
        final RequestResponse other = (RequestResponse) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.isSuccess() != other.isSuccess()) return false;
        final Object this$publicKey = this.getPublicKey();
        final Object other$publicKey = other.getPublicKey();
        if (this$publicKey == null ? other$publicKey != null : !this$publicKey.equals(other$publicKey)) return false;
        final Object this$privateKey = this.getPrivateKey();
        final Object other$privateKey = other.getPrivateKey();
        if (this$privateKey == null ? other$privateKey != null : !this$privateKey.equals(other$privateKey)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof RequestResponse;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + (this.isSuccess() ? 79 : 97);
        final Object $publicKey = this.getPublicKey();
        result = result * PRIME + ($publicKey == null ? 43 : $publicKey.hashCode());
        final Object $privateKey = this.getPrivateKey();
        result = result * PRIME + ($privateKey == null ? 43 : $privateKey.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "RequestResponse(success=" + this.isSuccess() + ", publicKey=" + this.getPublicKey() + ", privateKey=" + this.getPrivateKey() + ")";
    }

    public RequestResponse() {
    }
}
