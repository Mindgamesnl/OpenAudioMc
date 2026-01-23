import { isDomainOfficial } from '../../../config/MagicValues';
import { AUDIO_ENDPOINTS } from '../../../util/AudioSourceProcessor';

export function isProxyRequired(url) {
  // does the url begin with http or https?
  if (url.startsWith('http://')) {
    // local or invalid url
    return true;
  }

  if (skipCors(url)) {
    return false;
  }

  // compare origins
  const isSourceOfficial = isDomainOfficial(getDomainOfStr(url));

  // only cors of neither the source nor the current domain is official
  // we cannot expect the user to be serving cors headers
  if (!isSourceOfficial) {
    // we don't need cors if the source is the same webserver as this client, assuming cors policy is set up correctly
    // and we aren't running on a different subdomain
    if (!url.includes(getDomain())) {
      // we need to proxy the audio, unfortunately
      return true;
    }
  }
  return false;
}

function isValidUrl(url) {
  // does this browser support URL.canParse? because some don't..
  try {
    return URL.canParse(url);
  } catch (e) {
    // fallback, lets sanity check
    return url.startsWith('http') || url.startsWith('https');
  }
}

function getQueryParam(url, key, defaultValue = null) {
  if (!isValidUrl(url)) return defaultValue;
  const urlObj = new URL(url);
  return urlObj.searchParams.get(key) || defaultValue;
}

export function skipCors(url) {
  return getQueryParam(url, 'oaNoCors') === 'true' || getQueryParam(url, 'oaSkipBuffer') === 'true';
}

export function proxifyUrl(url) {
  // is it official?
  if (isDomainOfficial(getDomainOfStr(url))) {
    return url;
  }
  if (url.indexOf(AUDIO_ENDPOINTS.PROXY) === -1 && !skipCors(url)) {
    return AUDIO_ENDPOINTS.PROXY + encodeURIComponent(url);
  }
  // already proxified
  return url;
}

function getDomainOfStr(str) {
  if (!isValidUrl(str)) return getDomain();
  const url = new URL(str);
  return getDomain(url.hostname);
}

function getDomain(of = window.location.hostname) {
  const fullHostname = of;
  const hostnameParts = fullHostname.split('.');
  if (hostnameParts.length > 2) {
    return hostnameParts.slice(-2).join('.');
  }

  return fullHostname;
}
