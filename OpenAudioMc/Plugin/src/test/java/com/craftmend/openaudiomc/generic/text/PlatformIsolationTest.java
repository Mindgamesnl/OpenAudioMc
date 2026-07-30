package com.craftmend.openaudiomc.generic.text;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

/**
 * A class that names two platforms gets both linked, and verifying the branch it does not need still
 * resolves that platform's types. Naming BungeeAudiences next to BukkitAudiences was enough to throw
 * NoClassDefFoundError for net.md_5.bungee.api.plugin.Plugin on a Paper server.
 */
@RunWith(Parameterized.class)
public class PlatformIsolationTest {

    @Parameterized.Parameters(name = "{0} must not reference {1}")
    public static Collection<Object[]> cases() {
        return Arrays.asList(new Object[][]{
                {SpigotAudiences.class, "net/md_5/bungee/api/plugin/Plugin"},
                {SpigotAudiences.class, "net/kyori/adventure/platform/bungeecord"},
                {BungeeAudienceProvider.class, "org/bukkit/plugin"},
                {BungeeAudienceProvider.class, "net/kyori/adventure/platform/bukkit"},
        });
    }

    @Parameterized.Parameter
    public Class<?> subject;

    @Parameterized.Parameter(1)
    public String forbidden;

    @Test
    public void doesNotReferenceTheOtherPlatform() throws Exception {
        String constantPool = new String(bytecodeOf(subject), "ISO-8859-1");

        assertFalse(
                subject.getSimpleName() + " links " + forbidden + ", which is absent on the other platform",
                constantPool.contains(forbidden)
        );
    }

    private byte[] bytecodeOf(Class<?> type) throws Exception {
        String resource = "/" + type.getName().replace('.', '/') + ".class";
        try (InputStream in = type.getResourceAsStream(resource)) {
            assertNotNull("Unable to read bytecode for " + type, in);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            return out.toByteArray();
        }
    }

}
