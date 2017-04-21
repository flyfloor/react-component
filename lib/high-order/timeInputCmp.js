'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var timeStr2Obj = require('../util/time').timeStr2Obj;
var obj2TimeStr = require('../util/time').obj2TimeStr;

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
        }]);

        return TimeInputCmp;
    }(Cmp);

    TimeInputCmp.propTypes = {
        simple: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        className: PropTypes.string,
        placeHolder: PropTypes.string
    };

    return TimeInputCmp;
};