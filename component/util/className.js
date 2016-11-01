const klassName = function() {
    if (arguments.length === 0) {
        return ''
    }
    let cls = Array.prototype.slice.call(arguments)
    return cls.filter(l => l).join(' ')
}

module.exports = klassName