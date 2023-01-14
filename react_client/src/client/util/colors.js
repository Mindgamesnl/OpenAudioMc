export function changeColor(findHexColor, replaceWith) {
    function hexToRgb(hex){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        return  'rgb('+r+', '+g+', '+b+')';
    }

    let convertedColor = hexToRgb(findHexColor);

    // Select and run a map function on every tag
    document.querySelectorAll('*').forEach(function(el, i) {
        // Get the computed styles of each tag
        let styles = window.getComputedStyle(el);
        // Go through each computed style and search for "color"
        //eslint-disable-next-line
        Object.keys(styles).reduce(function(acc, k) {
            let name = styles[k];
            let value = styles.getPropertyValue(name);
            if (value.indexOf(convertedColor) >=0 ) {
                let newValue = value.replace(convertedColor, replaceWith);
                // special attributes
                if (name.indexOf("border-top") >= 0) {
                    el.style.borderTop = '2px solid ' + newValue;
                } else {
                    el.style[name] = newValue;
                }
            }
        });
    });
}