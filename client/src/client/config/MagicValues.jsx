export const MagicValues = {

  VOICE_CANT_HEAR_YOU_TIMEOUT: 15 * 1000, // the delay (in seconds) before showing the "we couldn't hear you" hint
  VOICE_CANT_HEAR_YOU_THRESHOLD: 3, // the amount of times your mic should have triggered within VOICE_CANT_HEAR_YOU_TIMEOUT to not show the hint

  DEFAULT_DOMAINS: ['openaudiomc.net', 'minecraftvoicechat.com'],

};

export function isDomainOfficial(d) {
  for (let i = 0; i < MagicValues.DEFAULT_DOMAINS.length; i++) {
    if (MagicValues.DEFAULT_DOMAINS[i] === d) return true;
  }
  return false;
}

export function isCurrentClientDomainOfficial() {
  return isDomainOfficial(window.location.hostname);
}
