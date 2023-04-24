package com.craftmend.tests;

import com.craftmend.openaudiomc.OpenAudioMcBuild;
import com.craftmend.openaudiomc.generic.database.DatabaseService;
import com.craftmend.openaudiomc.generic.database.internal.Repository;
import com.craftmend.openaudiomc.generic.environment.MagicValue;
import com.craftmend.openaudiomc.spigot.modules.regions.objects.RegionProperties;
import lombok.SneakyThrows;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

public class RegionWorldUpdateTest {

    private static DatabaseService databaseService;

    /**
     * This test uses and old file that doesn't have the two fields
     * and makes sure that nothing breaks during migrations
     */

    // prepare/setup
    @BeforeClass
    @SneakyThrows
    public static void setup() {
        OpenAudioMcBuild.IS_TESTING = true;
        File folder = new File(createTempFolder());
        // copy the "old" sample data to the temp folder
        copyFile("../dev-resources/storm-with-regions-no-world.db", folder.getAbsolutePath(), "storm.db");
        MagicValue.overWrite(MagicValue.STORAGE_DIRECTORY, new File(folder.getAbsolutePath()));
        databaseService = new DatabaseService();
    }

    @SneakyThrows
    @Test
    public void testRegionWorldUpdate() {
        Repository<RegionProperties> regionRepo = databaseService.getRepository(RegionProperties.class);
        Collection<RegionProperties> regions = regionRepo.values();

        // we should still have 5 regions
        assertEquals(5, regions.size());

        // region names and sources are equal, so we can test integrity
        for (RegionProperties region : regions) {
            assertEquals(region.getSource(), region.getRegionName());
        }
    }

    private static String createTempFolder() {
        String tempDirPath = System.getProperty("java.io.tmpdir");
        String folderName = UUID.randomUUID().toString();
        String folderPath = tempDirPath + File.separator + folderName;
        File folder = new File(folderPath);
        folder.mkdir();
        return folderPath;
    }

    private static void copyFile(String sourcePath, String targetDirectory, String newFileName) throws IOException {
        File sourceFile = new File(sourcePath);
        Path targetDirectoryPath = Paths.get(targetDirectory);
        if (!Files.exists(targetDirectoryPath)) {
            Files.createDirectories(targetDirectoryPath);
        }
        Path targetFilePath = targetDirectoryPath.resolve(newFileName);
        Files.copy(sourceFile.toPath(), targetFilePath);
    }

}
