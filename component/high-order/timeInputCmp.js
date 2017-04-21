const PropTypes = require('prop-types')
const timeStr2Obj = require('../util/time').timeStr2Obj
const obj2TimeStr = require('../util/time').obj2TimeStr

module.exports = Cmp => {
    class TimeInputCmp extends Cmp {
        constructor(props) {
            super(props);
        }

        initTime(val = this.props.value){
            const {simple} = this.props;
            let {hour, minute, second} = timeStr2Obj(val, { simple });

            let value = obj2TimeStr({ hour, minute, second }, {
                simple: this.props.simple
            });
            if (!val) {
                return {}
            }
            return { value }
        }
    }

    TimeInputCmp.propTypes = {
        simple: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        className: PropTypes.string,
        placeHolder: PropTypes.string,
    }

    return TimeInputCmp
}
