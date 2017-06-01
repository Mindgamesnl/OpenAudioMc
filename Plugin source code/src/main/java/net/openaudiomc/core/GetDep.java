package net.openaudiomc.core;

public class GetDep {
  private static Boolean dependenciesComplete;
  private static Boolean skriptInstalled;

  public static void runCheck() {
    if (Main.getPL().getServer().getPluginManager().isPluginEnabled("WorldGuard") && Main.getPL()
        .getServer()
        .getPluginManager()
        .isPluginEnabled("WorldEdit")) {
      System.out.println("[OpenAudio] All dependencies are detected, regions will be enabled!");
      dependenciesComplete = true;
    } else {
      System.out.println(
          "[OpenAudio] Not all dependencies are installed, all the region functions will NOT work! please install WorldEdit, WorldGuard and WgRegionEvents");
      dependenciesComplete = false;
    }
    if (Main.getPL().getServer().getPluginManager().isPluginEnabled("Skript")) {
      System.out.println("[OpenAudio] All dependencies are detected, regions will be enabled!");
      skriptInstalled = true;
    } else {
      skriptInstalled = false;
    }
  }

  public static boolean getStatus() {
    return dependenciesComplete;
  }

  public static boolean isSkriptInstalled() {
    return skriptInstalled;
  }
}
