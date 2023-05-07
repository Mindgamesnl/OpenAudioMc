export function StringifyError(error) {

    if (error === null) {
        return "error is null";
    }

    if (error instanceof Error) {
        var output = "";
        var propertyNames = Object.getOwnPropertyNames(error);
        var descriptor;
        for (var property, i = 0, len = propertyNames.length; i < len; ++i) {
            property = propertyNames[i];
            descriptor = Object.getOwnPropertyDescriptor(error, property);

            if (descriptor.hasOwnProperty("value") && typeof descriptor.value !== "function") {
                output += property + ": " + descriptor.value + "\n";
            }
        }
        return output;
    }

    return "Unknown error type " + typeof error
}