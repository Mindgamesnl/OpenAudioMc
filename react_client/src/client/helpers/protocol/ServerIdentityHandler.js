import { Log } from '../utils/log'
import { fetch } from '../../../libs/github.fetch'
import {replaceProperty} from "../domhelper";

export async function HandleServerIdentity(id, playerName) {
  // safe async
  Log("Fetching identity..")
  let response = await fetch("https://cloud.openaudiomc.net/identity?token=" + id);
  let out = await response.json();

  if (out.errors.length > 0) {
    console.error("Could not load identity " + id);
    return
  }

  // update favicon
  document.querySelector("link[rel*='icon']").href = out.response.icon + "&name=" + playerName;

  // replace logo
  replaceProperty("{{ oam.logo_image }}", out.response.icon  + "&name=" + playerName)

  Log("Native minecraft version: " + out.response.version)
  Log("Minecraft motd: " + out.response.motd)
}