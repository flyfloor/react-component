'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

        _this.handleConfirm = _this.handleConfirm.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.open = _this.open.bind(_this);

        _this.state = {
            display: false
        };
        return _this;
    }

    _createClass(Modal, [{
        key: 'open',
        value: function open() {
            this.setState({
                display: true
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var onClose = this.props.onClose;

            if (onClose && !onClose()) return;
            this.setState({
                display: false
            });
        }
    }, {
        key: 'handleConfirm',
        value: function handleConfirm() {
            if (this.props.onConfirm()) this.close();
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            if (this.props.onCancel()) this.close();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                onConfirm = _props.onConfirm,
                onCancel = _props.onCancel,
                confirm = _props.confirm,
                className = _props.className,
                cancel = _props.cancel,
                title = _props.title,
                children = _props.children,
                style = _props.style,
                force = _props.force,
                close = _props.close;
            var display = this.state.display;

            var actionDOM = [];
            if (onConfirm) actionDOM.push(React.createElement(
                'div',
                { key: '_confirm-action', className: '_action-btn',
                    onClick: this.handleConfirm },
                confirm
            ));
            if (onCancel) actionDOM.push(React.createElement(
                'div',
                { key: '_cancel-action', className: '_action-btn',
                    onClick: this.handleCancel },
                cancel
            ));

            var footer = onCancel || onConfirm ? React.createElement(
                'div',
                { className: '_actions' },
                actionDOM
            ) : null;

            className = klassName('modal', className);

            if (display) {
                className += ' _show';
            }
            if (force) {
                className += ' _force';
            }

            return React.createElement(
                'div',
                { style: style, className: className },
                React.createElement(
                    'div',
                    { className: '_body' },
                    React.createElement(
                        'div',
                        { className: '_wrap' },
                        title ? React.createElement(
                            'div',
                            { className: '_title' },
                            title
                        ) : null,
                        React.createElement(
                            'div',
                            { className: '_content' },
                            children,
                            footer
                        )
                    ),
                    force ? null : React.createElement(
                        'div',
                        { className: '_close', onClick: this.close },
                        close
                    )
                ),
                force ? React.createElement('div', { className: '_overlay' }) : React.createElement('div', { className: '_overlay', onClick: this.close })
            );
        }
    }]);

    return Modal;
}(Component);

Modal.propTypes = {
    title: PropTypes.element,
    confirm: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    cancel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    close: PropTypes.element
};

Modal.defaultProps = {
    confirm: 'confirm',
    cancel: 'cancel',
    close: React.createElement(
        'span',
        null,
        'x'
    )
};

module.exports = Modal;