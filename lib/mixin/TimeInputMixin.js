'use strict';

var PropTypes = require('react').PropTypes;
var timeStr2Obj = require('../util/time').timeStr2Obj;

var TimeInputMixin = {
    propTypes: {
        simple: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        className: PropTypes.string,
        placeHolder: PropTypes.string
    },

    initTime: function initTime() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;
        var simple = this.props.simple;

        var _timeStr2Obj = timeStr2Obj(val, { simple: simple }),
            hour = _timeStr2Obj.hour,
            min = _timeStr2Obj.min,
            sec = _timeStr2Obj.sec;

        var value = this.formatValue(hour, min, sec);
        if (!val) {
            return {};
        }
        return { value: value };
    },
    formatValue: function formatValue(hour, min, sec) {
        return this.props.simple ? hour + ':' + min : hour + ':' + min + ':' + sec;
    }
};

module.exports = TimeInputMixin;