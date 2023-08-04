export default class UrlReader {
  static getParametersFromUrl(url) {
    if (url.indexOf('&') === -1) return {}; const lets = url.split('&');
    const queryString = {};
    for (let i = 0; i < lets.length; i++) {
      const pair = lets[i].split('=');
      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof queryString[key] === 'undefined') {
        queryString[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof queryString[key] === 'string') {
        queryString[key] = [queryString[key], decodeURIComponent(value)];
        // If third or later entry with this name
      } else {
        queryString[key].push(decodeURIComponent(value));
      }
    }
    return queryString;
  }
}
