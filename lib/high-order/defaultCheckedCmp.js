'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Cmp) {
    return function (_Cmp) {
        _inherits(DefaultCheckedCmp, _Cmp);

        function DefaultCheckedCmp(props) {
            _classCallCheck(this, DefaultCheckedCmp);

            return _possibleConstructorReturn(this, (DefaultCheckedCmp.__proto__ || Object.getPrototypeOf(DefaultCheckedCmp)).call(this, props));
        }

        _createClass(DefaultCheckedCmp, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                // value change
                if (this.props.value !== nextProps.value) {
                    this.setState({
                        value: nextProps.value
                    });
                }
                if (_get(DefaultCheckedCmp.prototype.__proto__ || Object.getPrototypeOf(DefaultCheckedCmp.prototype), 'componentWillReceiveProps', this)) {
                    _get(DefaultCheckedCmp.prototype.__proto__ || Object.getPrototypeOf(DefaultCheckedCmp.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
                }
            }
        }, {
            key: 'initDefaultValue',
            value: function initDefaultValue() {
                var _this2 = this;

                var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { multi: false },
                    multi = _ref.multi,
                    props = _ref.props;

                var _ref2 = props || this.props,
                    valueName = _ref2.valueName,
                    options = _ref2.options,
                    onChange = _ref2.onChange,
                    children = _ref2.children;

                var initVal = multi ? [] : '';
                if (options && options.length > 0) {
                    initVal = options[0][valueName];
                }
                if (children && children.length > 0) {
                    initVal = children[0].props[valueName];
                }
                this.setState({
                    value: multi ? [initVal] : initVal
                }, function () {
                    return onChange(_this2.state.value);
                });
            }
        }]);

        return DefaultCheckedCmp;
    }(Cmp);
};