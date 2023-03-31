
const MAX_DEBUG_VALUES = 60 * 5;
let debugValues = {};

export function feedDebugValue(key, value) {
    if (debugValues[key] == null) {
        debugValues[key] = [];
    }
    debugValues[key].push(value);

    if (debugValues[key].length > MAX_DEBUG_VALUES) {
        debugValues[key].shift();
    }
}

export function getLatestDebugValue(key) {
    if (debugValues[key] == null) {
        return 0;
    }
    return debugValues[key][debugValues[key].length - 1];
}

export function incrementDebugValue(key, amount = 1) {
    if (debugValues[key] == null) {
        debugValues[key] = [0];
    }
    let last = getLatestDebugValue(key);
    feedDebugValue(key, last + amount);
}

export function getDebugValues() {
    return debugValues;
}