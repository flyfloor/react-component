'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var React = require('react');
var klassName = require('../util/className');
var POSITIONS = ['left', 'right', 'bottom', 'top'];

module.exports = function (Cmp, positions) {
    var dropDownCmp = function (_Cmp) {
        _inherits(dropDownCmp, _Cmp);

        function dropDownCmp(props) {
            _classCallCheck(this, dropDownCmp);

            return _possibleConstructorReturn(this, (dropDownCmp.__proto__ || Object.getPrototypeOf(dropDownCmp)).call(this, props));
        }

        _createClass(dropDownCmp, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    className = _props.className,
                    position = _props.position;

                className = klassName(className, '_' + position);
                return React.createElement(Cmp, _extends({}, this.props, { className: className }));
            }
        }]);

        return dropDownCmp;
    }(Cmp);

    positions = positions instanceof Array ? positions : POSITIONS;
    dropDownCmp.propTypes = {
        position: PropTypes.oneOf(positions)
    };

    dropDownCmp.defaultProps = {
        position: 'bottom'
    };
    return dropDownCmp;
};