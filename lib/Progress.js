'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var Progress = function (_Component) {
    _inherits(Progress, _Component);

    function Progress(props) {
        _classCallCheck(this, Progress);

        return _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, props));
    }

    _createClass(Progress, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                value = _props.value,
                className = _props.className,
                status = _props.status,
                size = _props.size,
                disabled = _props.disabled,
                children = _props.children;

            if (value < 0) value = 0;
            if (value > 100) value = 100;
            className = klassName(className, 'progress');

            if (status) {
                className += ' _' + status;
            }
            if (disabled) {
                className += ' _disabled';
            }
            if (value === 100) {
                className += ' _completed';
            }
            if (children) {
                className += ' _context';
            }

            if (size) {
                className += ' _' + size;
            }

            return React.createElement(
                'div',
                { className: className },
                React.createElement(
                    'div',
                    { className: '_progress', style: { 'width': value + '%' } },
                    children
                )
            );
        }
    }]);

    return Progress;
}(Component);

Progress.propTypes = {
    value: PropTypes.number,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'normal', 'small']),
    status: PropTypes.oneOf(['warning', 'failed', 'success', 'active'])
};

Progress.defaultProps = {
    value: 0,
    className: ''
};

module.exports = Progress;