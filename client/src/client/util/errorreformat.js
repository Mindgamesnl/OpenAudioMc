export function StringifyError(error) {
  if (error === null) {
    return 'error is null';
  }

  if (error instanceof Error) {
    let output = '';
    const propertyNames = Object.getOwnPropertyNames(error);
    let descriptor;
    for (let property, i = 0, len = propertyNames.length; i < len; ++i) {
      property = propertyNames[i];
      descriptor = Object.getOwnPropertyDescriptor(error, property);

      if (Object.prototype.hasOwnProperty.call(descriptor, 'value') && typeof descriptor.value !== 'function') {
        output += `${property}: ${descriptor.value}\n`;
      }
    }
    return output;
  }

  return `Unknown error type ${typeof error}`;
}
