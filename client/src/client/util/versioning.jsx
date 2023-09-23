import { API_ENDPOINT } from '../config/ApiEndpoints';
import { VERSION } from '../../build';

export async function compareProdVersions() {
  const prodVersionFile = await fetch(API_ENDPOINT.PROD_CLIENT_VERSION);

  if (prodVersionFile.status !== 200 || prodVersionFile.errored) {
    throw new Error('Failed to fetch prod version file');
  }

  const prodVersion = await prodVersionFile.json();

  // compare versions
  const majorDiff = prodVersion.buildMajor - VERSION.major;
  const minorDiff = prodVersion.buildMinor - VERSION.minor;
  const patchDiff = prodVersion.buildRevision - VERSION.revision;

  let diff = 0;
  if (majorDiff > diff) diff = majorDiff;
  if (minorDiff > diff) diff = minorDiff;
  if (patchDiff > diff) diff = patchDiff;

  if (diff === 0) {
    // are we behind?
    if (majorDiff < 0) diff = majorDiff;
    if (minorDiff < 0) diff = minorDiff;
    if (patchDiff < 0) diff = patchDiff;
  }

  if (diff > 0) {
    return {
      text: `${Math.abs(diff)} version(s) behind`,
      outOfDate: true,
      color: 'text-red-500',
    };
  }

  if (diff < 0) {
    return {
      text: `${Math.abs(diff)} version(s) ahead`,
      outOfDate: false,
      color: 'text-green-500',
    };
  }

  return {
    text: 'Up to date',
    outOfDate: false,
    color: 'text-gray-500',
  };
}
