package com.craftmend.openaudiomc;

import lombok.Getter;
import lombok.SneakyThrows;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * This is a simple class that contains the current build number, as well as some other details
 * about the compiler and compile environment. This could be used in update checks and is
 * passed through to the backend to provide backwards compatibility on endpoints that may have been
 * patched in an effort to fix bugs without pushing plugin updates.
 *
 * These placeholders are processed during compile time by some bash scripts and maven plugins.
 * This means that builds made on Windows may have issues loading diagnostic details, and that endpoints
 * may behave weirdly if the passed buildnumber is formatted incorrectly or isn't an integer at all.
 */
@Getter
public class OpenAudioMcBuild {

    /**
     * Constructor that loads the properties file and gathers all the data
     */
    @SneakyThrows
    public OpenAudioMcBuild() {
        Properties prop = new Properties();
        try (InputStream inputStream = OpenAudioMc.class.getResourceAsStream("/version.properties")) {
            prop.load(inputStream);

            // this loads the build version and details, which are placed in the resources directory by a bash script
            // which is ran in the final stage of the maven install target. Values must be stripped of their "
            // because they are noted in the bash variable format, and don't need double string notation
            // since it isn't required for the properties file format.
            buildNumber = Integer.parseInt(prop.getProperty("BUILD_VERSION").replaceAll("\"", ""));
            buildAuthor = prop.getProperty("BUILD_AUTHOR").replaceAll("\"", "");
            buildCommit = prop.getProperty("BUILD_COMMIT").replaceAll("\"", "");
        } catch (IOException e) {
            // why catch this and then throw it again? well, to ensure that the input stream closes.
            // why not just call the close method? because that could cause NPE's and some ugly code
            // why slip in a sneaky throw? well, you bastard, because the plugin shouldn't start if the build
            // is that fucking broken
            throw e;
        }

    }

    /**
     * This is an incrementing build number that bumps for _every_ maven build, so public
     * releases may not have following build numbers and may instead make major jumps form 233 > 458. The only given
     * is that higher numbers will represent newer builds. These build numbers may be mapped to releases.
     */
    private final int buildNumber;

    /**
     * This is the git commit on which the build was made. This can be used to trace back to the release
     * or specific path. Auto links will automatically assume the base url to link to the original Mindgamesnl/OpenAudioMc
     * repository, so please double check before releasing or forking.
     */
    private final String buildCommit;

    /**
     * The build author is the git Username of the user who last committed in the working directory.
     * This will default to me (Mindgamesnl) but will link back to contributors who patched.
     */
    private final String buildAuthor;
}
