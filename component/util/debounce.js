let _timer = null

module.exports = (fn, delay = 300) => {
    clearTimeout(_timer)
    return (...args) => {
        _timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
