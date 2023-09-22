export function isValidHttps() {
  // are we on localhost? then its probably fine
  if (window.location.hostname === 'localhost') {
    return true;
  }

  return window.location.protocol === 'https:';
}
