/*
 * Copyright (C) 2017 Mindgamesnl
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
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
