export function toggleClass(el, className){
    if (el && el instanceof Node && className) {
        let str = String(el.className);
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
            el[i].className = removeSubStr(el[i].className, className);
        }
        return;
    }
    if (el instanceof Node && hasClass(el, className)) {
        el.className = removeSubStr(el.className, className);
    }
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
            if (!hasClass(el[i], className)) el[i].className = `${el[i].className} ${className}`;
        }
        return;
    }
    if (el instanceof Node && !hasClass(el, className)) el.className = `${el.className} ${className}`;
}

export function getClassList(className){
    if (className instanceof String)  return className.split(' ').filter(Boolean);
    return [];
}

function removeSubStr(str, subStr){
    const index = str.indexOf(subStr);
    if (index !== -1) return str.slice(0, index) + str.slice(index, subStr.length);
    return str;
}