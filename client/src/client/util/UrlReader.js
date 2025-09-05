export default class UrlReader {
  // input is a string like "param1=value1&param2=value2", but values MAY have trailing = because they are base64 encoded
  static getParametersFromUrl(url) {
    const params = {};
    const parts = url.split('&');
    parts.forEach((part) => {
      const keyValue = part.split('=');
      if (keyValue.length >= 2) {
        const key = keyValue[0];
        const value = keyValue.slice(1).join('='); // re-join the rest in case value had '='
        params[key] = decodeURIComponent(value);
      }
    });
    return params;
  }
}
