
const MAX_DEBUG_VALUES = 60 * 5;
let debugValues = {};

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
        key.values = [0]
        debugValues[key.name] = key;
    }
    let last = getLatestDebugValue(key);
    feedDebugValue(key, last + amount);
}

export function getDebugValues() {
    return debugValues;
}