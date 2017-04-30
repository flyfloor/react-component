const PropTypes = require('prop-types')
const timeUtil = require('../util/time')
const {timeStr2Obj, obj2TimeStr, seconds2Obj} = timeUtil

module.exports = Cmp => {
    class TimeInputCmp extends Cmp {
        constructor(props) {
            super(props);
        }

        initTime({ displayValue, value }){
            const {simple} = this.props;
            if ([undefined, '', null].indexOf(displayValue) !== -1 && value === undefined) {
                return {}
            }
            
            let rtnObj = [undefined, '', null].indexOf(displayValue) === -1 ? timeStr2Obj(displayValue) : seconds2Obj(value)
            let {hour, minute, second} = rtnObj

            value = hour * 3600 + minute * 60 + second

            displayValue = obj2TimeStr({ 
                hour, minute, second 
            }, {
                simple
            });

            return { value, displayValue }
        }
    }

    TimeInputCmp.propTypes = {
        simple: PropTypes.bool,
        value: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        className: PropTypes.string,
        placeHolder: PropTypes.string,
        onClick: PropTypes.func,
    }

    return TimeInputCmp
}
