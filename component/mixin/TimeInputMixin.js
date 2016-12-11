const PropTypes = require('react').PropTypes
const timeStr2Obj = require('../util/time').timeStr2Obj

const TimeInputMixin = {
    propTypes: {
        simple: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        className: PropTypes.string,
        placeHolder: PropTypes.string,
    },

    initTime(val = this.props.value){
        const {simple} = this.props;
        let {hour, min, sec} = timeStr2Obj(val, { simple });
        let value = this.formatValue(hour, min, sec);
        if (!val) {
            return {}
        }
        return {value}
    },
    formatValue(hour, min, sec){
        return this.props.simple ? `${hour}:${min}` : `${hour}:${min}:${sec}`
    },
    
}

module.exports = TimeInputMixin