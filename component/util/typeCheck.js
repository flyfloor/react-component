function isType(obj, typeStr){
    return Object.prototype.toString.call(obj).slice(8, -1) === typeStr
}

module.exports = {
    isType
}