'use strict';

var PropTypes = require('react').PropTypes;
var timeStr2Obj = require('../util/time').timeStr2Obj;
var obj2TimeStr = require('../util/time').obj2TimeStr;

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
            minute = _timeStr2Obj.minute,
            second = _timeStr2Obj.second;

        var value = obj2TimeStr({ hour: hour, minute: minute, second: second }, {
            simple: this.props.simple
        });
        if (!val) {
            return {};
        }
        return { value: value };
    }
};

module.exports = TimeInputMixin;