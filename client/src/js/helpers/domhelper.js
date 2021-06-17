import {oalog} from "./log";

// stupid cache
export const textElementCache = {}
export const propertyValueCache = {}

/**
 * These function as the main templating functions within openaudio mc, running
 * `replaceProperty("{{ oam.color }}", "color: blue");`
 * will look for elements like
 * <a style="{{ oam.color }}">hi!</a>
 * and replace the style function
 *
 * this function is cached, so running it again with red, like
 * `replaceProperty("{{ oam.color }}", "color: red");`
 * will find the previously changed element (despite it no longer having the template variable) and update
 * the style
 *
 * (this works with *any* attribute, not just style, so can be used to template images or whatever)
 *
 * @param from: placeholder to search
 * @param to: new value
 */
export function replaceProperty(from, to, newPropName) {
    // do we have cache?
    if (from in propertyValueCache) {
        for (let i = 0; i < propertyValueCache[from].length; i++) {
            let mapped = propertyValueCache[from][i]
            mapped.element.setAttribute(mapped.att, to)
        }
    } else {
        oalog("Building property cache for " + from)
        let result = [];
        (function scanSubTree(node) {
            if (node.children.length) {
                for (let i = 0; i < node.children.length; i++) {
                    scanSubTree(node.children[i])
                    let att = node.children[i].attributes
                    for (let j = 0; j < att.length; j++) {
                        let attrib = att[j];
                        // fast index of
                        if (attrib.value.indexOf(from) !== -1) {
                            // remove the old att
                            node.children[i].removeAttribute(attrib.name)

                            result.push({
                                "element": node.children[i],
                                "att": newPropName
                            })
                        }
                    }
                }
            }
        })(document);
        propertyValueCache[from] = result
        replaceProperty(from, to)
    }
}

/**
 * This is a similar function to `replaceProperty`, but it looks for dom content instead of attributes
 * for use in elements like <a>{{ oam.player_name }}</a>
 *
 * @param from
 * @param to
 */
export function replaceGlobalText(from, to) {
    // do we have cache?
    if (from in textElementCache) {
        for (let i = 0; i < textElementCache[from].length; i++) {
            textElementCache[from][i].nodeValue = to;
        }
    } else {
        oalog("Building element cache for " + from)
        getAllTextNodes().forEach(function (node) {
            // does this node contain the thing?
            if (node.nodeValue.indexOf(from) !== -1) {
                // replace
                let m = textElementCache[from];
                if (m == null) {
                    m = []
                }
                m.push(node)
                node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);
                textElementCache[from] = m
            }
        });
    }

    function getAllTextNodes() {
        var result = [];

        (function scanSubTree(node) {
            if (node.childNodes.length)
                for (var i = 0; i < node.childNodes.length; i++)
                    scanSubTree(node.childNodes[i]);
            else if (node.nodeType === Node.TEXT_NODE)
                result.push(node);
        })(document);

        return result;
    }

    function quote(str) {
        return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
}

export function CallAfterDomUpdate(fn) {
    var intermediate = function () {
        window.requestAnimationFrame(fn)
    }
    window.requestAnimationFrame(intermediate)
}