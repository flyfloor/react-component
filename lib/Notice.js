'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var Notice = function (_Component) {
    _inherits(Notice, _Component);

    function Notice(props) {
        _classCallCheck(this, Notice);

        var _this = _possibleConstructorReturn(this, (Notice.__proto__ || Object.getPrototypeOf(Notice)).call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Notice, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                delay = _props.delay,
                onClose = _props.onClose;

            if (delay !== 0) {
                this._timer = setTimeout(function () {
                    _this2.clearTimer();
                    onClose();
                }, delay);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.clearTimer();
        }
    }, {
        key: 'clearTimer',
        value: function clearTimer() {
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            var _props2 = this.props,
                onClick = _props2.onClick,
                onClose = _props2.onClose;

            if (onClick) {
                onClick(this.props);
                onClose();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                title = _props3.title,
                content = _props3.content,
                className = _props3.className,
                close = _props3.close,
                onClose = _props3.onClose;

            className = klassName(className, 'notice');
            return React.createElement(
                'div',
                { className: className },
                title ? React.createElement(
                    'div',
                    { className: '_title', onClick: this.handleClick },
                    title
                ) : null,
                React.createElement(
                    'div',
                    { className: '_content', onClick: this.handleClick },
                    content
                ),
                React.createElement(
                    'div',
                    { className: '_close', onClick: onClose },
                    close
                )
            );
        }
    }]);

    return Notice;
}(Component);

Notice.propTypes = {
    delay: PropTypes.number,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onClick: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    close: PropTypes.element
};

Notice.defaultProps = {
    content: null,
    delay: 5000,
    close: React.createElement(
        'i',
        null,
        'x'
    )
};

module.exports = Notice;