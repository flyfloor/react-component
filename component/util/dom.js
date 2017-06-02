function toggleClass(el, className){
    if (el && el instanceof Node && className) {
        if (hasClass(el, className)) {
            removeClass(el, className)
        } else {
            addClass(el, className)
        }
    }
}

function removeClass(el, className){
    if (!el || !className) return;
    if (el instanceof NodeList) {
        const length = el.length;
        for (let i = 0; i < length; i++) {
            _removeClass(el[i], className);
        }
        return;
    }
    if (el instanceof Node) {
        _removeClass(el, className);
    }
}

function _removeClass(el, className){
    if (hasClass(el, className)) {  
        let old = ` ${el.className} `
        old = old.replace(/(\s+)/gi, ' ')
        el.className = old.replace(' ' + className + ' ', ' ')
                            .replace(/(^\s+)|(\s+$)/g, '');
    } 
}

function hasClass(el, className){
    if (el && className && el instanceof Node) {
        return el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    return false;
}


function addClass(el, className) {
    if (!hasClass(el, className)) {
        el.className += el.className ? (" " + className) : className
    }
}

function getClassList(el){
    if (el && el instanceof Node) return el.className.split(/\s+/);
    return [];
}

module.exports = {
    toggleClass, removeClass, hasClass, addClass, getClassList
}
