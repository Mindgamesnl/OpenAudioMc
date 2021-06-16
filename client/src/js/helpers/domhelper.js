import {oalog} from "./log";

export function CallAfterDomUpdate(fn) {
    var intermediate = function () {
        window.requestAnimationFrame(fn)
    }
    window.requestAnimationFrame(intermediate)
}

const textElementCache = {}

export function replaceGlobalText(from, to) {

    // do we have cache?
    if (from in textElementCache) {
        for (let i = 0; i < textElementCache[from].length; i++) {
            textElementCache[from][i].nodeValue = to;
        }
    } else {
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
