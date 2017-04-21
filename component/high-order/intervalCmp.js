// interval high order component
module.exports = (Cmp) => {
    return class IntervalCmp extends Cmp {
        constructor(props) {
            super(props);
            this.intervals = []
        }

        setInterval (){
            this.intervals.push(setInterval.apply(null, arguments));
        }

        clearInterval (){
            this.intervals.map(clearInterval);
        }

        componentWillUnmount () {
            this.clearInterval();
            if (super.componentWillUnmount) {
                super.componentWillUnmount()
            }
        }
    }
}