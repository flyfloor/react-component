const IntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },

    setInterval: function(){
        this.intervals.push(setInterval.apply(null, arguments));
    },

    clearInterval: function(){
        this.intervals.map(clearInterval);
    },

    componentWillUnmount: function() {
        this.clearInterval();
    },
};

module.exports = IntervalMixin;