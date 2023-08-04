export function changeColor(findHexColor, replaceWith) {
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const convertedColor = hexToRgb(findHexColor);

  // Select and run a map function on every tag
  document.querySelectorAll('*').forEach((element) => {
  // Get the computed styles of each tag
    const styles = window.getComputedStyle(element);
    // Go through each computed style and search for "color"
    // eslint-disable-next-line
    Object.keys(styles).reduce(function (acc, k) {
      const name = styles[k];
      const value = styles.getPropertyValue(name);
      if (value.indexOf(convertedColor) >= 0) {
        const newValue = value.replace(convertedColor, replaceWith);
        // special attributes
        if (name.indexOf('border-top') >= 0) {
          element.style.borderTop = `2px solid ${newValue}`;
        } else {
          element.style[name] = newValue;
        }
      }
    });
  });
}
