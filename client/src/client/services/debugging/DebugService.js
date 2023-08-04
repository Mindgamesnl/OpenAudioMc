const MAX_DEBUG_VALUES = 60 * 5;
const debugValues = {};
const debugLogLines = [];

export function debugLog(message, ...args) {
  // combine the message and the args
  message = `${message} ${args.join(' ')}`;

  if (debugLogLines.length > 10) {
    // remove the first one
    debugLogLines.shift();
  }

  debugLogLines.push(message);
  // eslint-disable-next-line no-console
  console.log('[DEBUG]', message);
}

export function getDebugLog() {
  return debugLogLines;
}

export function feedDebugValue(type, value) {
  if (debugValues[type.name] == null) {
    type.values = [];
    debugValues[type.name] = type;
  }
  debugValues[type.name].values.push(value);

  if (debugValues[type.name].values.length > MAX_DEBUG_VALUES) {
    debugValues[type.name].values.shift();
  }
}

export function getLatestDebugValue(key) {
  if (debugValues[key.name] == null) {
    return 0;
  }
  return debugValues[key.name].values[debugValues[key.name].values.length - 1];
}

export function incrementDebugValue(key, amount = 1) {
  if (debugValues[key.name] == null) {
    key.values = [0];
    debugValues[key.name] = key;
  }
  const last = getLatestDebugValue(key);
  feedDebugValue(key, last + amount);
}

export function getDebugValues() {
  return debugValues;
}
