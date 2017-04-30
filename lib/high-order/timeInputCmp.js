'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var timeUtil = require('../util/time');
var timeStr2Obj = timeUtil.timeStr2Obj,
    obj2TimeStr = timeUtil.obj2TimeStr,
    seconds2Obj = timeUtil.seconds2Obj;


module.exports = function (Cmp) {
    var TimeInputCmp = function (_Cmp) {
        _inherits(TimeInputCmp, _Cmp);

        function TimeInputCmp(props) {
            _classCallCheck(this, TimeInputCmp);

            return _possibleConstructorReturn(this, (TimeInputCmp.__proto__ || Object.getPrototypeOf(TimeInputCmp)).call(this, props));
        }

        _createClass(TimeInputCmp, [{
            key: 'initTime',
            value: function initTime() {
                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { value: 0 },
                    displayValue = _ref.displayValue,
                    value = _ref.value;

                var simple = this.props.simple;

                var rtnObj = displayValue !== undefined ? timeStr2Obj(displayValue) : seconds2Obj(value);
                var hour = rtnObj.hour,
                    minute = rtnObj.minute,
                    second = rtnObj.second;

                value = hour * 3600 + minute * 60 + second;

                displayValue = obj2TimeStr({
                    hour: hour, minute: minute, second: second
                }, {
                    simple: simple
                });

                return { value: value, displayValue: displayValue };
            }
        }]);

        return TimeInputCmp;
    }(Cmp);

    TimeInputCmp.propTypes = {
        simple: PropTypes.bool,
        value: PropTypes.number,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        className: PropTypes.string,
        placeHolder: PropTypes.string,
        onClick: PropTypes.func
    };

    return TimeInputCmp;
};