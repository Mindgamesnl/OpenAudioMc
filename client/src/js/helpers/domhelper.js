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
 * @param asHtml
 */
export function replaceGlobalText(from, to, asHtml= false) {
    // do we have cache?
    if (from in textElementCache) {
        for (let i = 0; i < textElementCache[from].length; i++) {
            if (asHtml && textElementCache[from][i].parentElement.tagName === "RAW") {
                let parent = textElementCache[from][i].parentElement;
                while (parent.hasChildNodes()) {
                    parent.removeChild(parent.childNodes[0]);
                }
                let nds = htmlToElements(to)
                for (let q = 0; q < nds.length; q++) {
                    parent.appendChild(nds[q])
                }
            } else {
                textElementCache[from][i].nodeValue = to
            }
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

                if (asHtml && node.parentElement.tagName === "RAW") {
                    let parent = node.parentElement;
                    while (parent.hasChildNodes()) {
                        parent.removeChild(parent.childNodes[0]);
                    }
                    let nds = htmlToElements(node.nodeValue.replace(new RegExp(quote(from), 'g'), to))
                    for (let i = 0; i < nds.length; i++) {
                        parent.appendChild(nds[i])
                    }
                } else {
                    node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to)
                }

                m.push(node)
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

function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

/**
 * Deep scan DOM for all text nodes starting with a specific sequence
 * used to find localization keys in static html
 *
 * WATCH OUT!!! THIS METHOD IS EXPENSIVE AS FUCK
 *
 * @param needle
 */
export function deepScanStartingWith(needle) {
    let matches = [];

    for (let i = 0; i < getAllTextNodes().length; i++) {
        let node = getAllTextNodes()[i];
        // does this node contain the thing?
        if (node.nodeValue.indexOf(needle) !== -1) {
            matches.push(node.nodeValue)
        }
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
    return matches;
}

export function CallAfterDomUpdate(fn) {
    var intermediate = function () {
        window.requestAnimationFrame(fn)
    }
    window.requestAnimationFrame(intermediate)
}