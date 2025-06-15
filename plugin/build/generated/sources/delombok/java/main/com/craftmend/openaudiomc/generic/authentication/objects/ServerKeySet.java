package com.craftmend.openaudiomc.generic.authentication.objects;

public class ServerKeySet {
    /**
     * The key set
     *
     * Used for all authentication, and is what makes your server truly unique.
     * (sorry, was that too mean?)
     */
    private Key privateKey;
    private Key publicKey;

    /**
     * The key set
     *
     * Used for all authentication, and is what makes your server truly unique.
     * (sorry, was that too mean?)
     */
    public Key getPrivateKey() {
        return this.privateKey;
    }

    public Key getPublicKey() {
        return this.publicKey;
    }

    /**
     * The key set
     *
     * Used for all authentication, and is what makes your server truly unique.
     * (sorry, was that too mean?)
     */
    public void setPrivateKey(final Key privateKey) {
        this.privateKey = privateKey;
    }

    public void setPublicKey(final Key publicKey) {
        this.publicKey = publicKey;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof ServerKeySet)) return false;
        final ServerKeySet other = (ServerKeySet) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$privateKey = this.getPrivateKey();
        final Object other$privateKey = other.getPrivateKey();
        if (this$privateKey == null ? other$privateKey != null : !this$privateKey.equals(other$privateKey)) return false;
        final Object this$publicKey = this.getPublicKey();
        final Object other$publicKey = other.getPublicKey();
        if (this$publicKey == null ? other$publicKey != null : !this$publicKey.equals(other$publicKey)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof ServerKeySet;
    }

    @Override
    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $privateKey = this.getPrivateKey();
        result = result * PRIME + ($privateKey == null ? 43 : $privateKey.hashCode());
        final Object $publicKey = this.getPublicKey();
        result = result * PRIME + ($publicKey == null ? 43 : $publicKey.hashCode());
        return result;
    }

    @Override
    public String toString() {
        return "ServerKeySet(privateKey=" + this.getPrivateKey() + ", publicKey=" + this.getPublicKey() + ")";
    }

    /**
     * Creates a new {@code ServerKeySet} instance.
     *
     * @param privateKey The key set
     *
     * Used for all authentication, and is what makes your server truly unique.
     * (sorry, was that too mean?)
     * @param publicKey
     */
    public ServerKeySet(final Key privateKey, final Key publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    public ServerKeySet() {
    }
}
