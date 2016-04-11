export function toggleClass(el, className){
    if (el && el instanceof Node && className) {
        let str = el.className;
        const index = str.indexOf(className);
        el.className = index === -1 ? 
            `${str} ${className}` 
            : str.slice(0, index) + str.slice(index, className.length);
    }
}

export function removeClass(el, className){
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
    const clist = getClassList(el);
    const length = clist.length;
    let str = '', changed = false;
    for (let i = 0; i < length; i++) {
        if (!clist[i]) continue;
        if (clist[i] === className) {
            changed = true;
        } else {
            if (str) str += ' ';
            str += clist[i];
        }
    }
    if (changed) el.className = str;
}

export function hasClass(el, className){
    if (el && className && el instanceof Node) {
        return el.className.indexOf(className) !== -1;
    }
    return false;
}


export function addClass(el, className) {
    if (!el || !className) return;
    if (el instanceof NodeList) {
        const length = el.length;
        for (let i = 0; i < length; i++) {
            let str = el.className.trim();
            el[i].className = `${str} ${className}`;
        }
        return;
    }
    if (el instanceof Node) {
        el.className = `${el.className.trim()} ${className}`;
    }
}

export function getClassList(el){
    if (el && el instanceof Node) return el.className.split(/\s+/);
    return [];
}
