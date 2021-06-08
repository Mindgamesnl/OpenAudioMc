export function CallAfterDomUpdate(fn) {
    var intermediate = function () {
        window.requestAnimationFrame(fn)
    }
    window.requestAnimationFrame(intermediate)
}

export function replaceGlobalText(from, to){
    getAllTextNodes().forEach(function(node){
        node.nodeValue = node.nodeValue.replace(new RegExp(quote(from), 'g'), to);
    });

    function getAllTextNodes(){
        var result = [];

        (function scanSubTree(node){
            if(node.childNodes.length)
                for(var i = 0; i < node.childNodes.length; i++)
                    scanSubTree(node.childNodes[i]);
            else if(node.nodeType == Node.TEXT_NODE)
                result.push(node);
        })(document);

        return result;
    }

    function quote(str){
        return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }
}