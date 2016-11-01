'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;
var Modal = _react2.default.createClass({
    displayName: 'Modal',

    propTypes: {
        title: PropTypes.element,
        confirmText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        cancelText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        onClose: PropTypes.func,
        closeIcon: PropTypes.element
    },

    getInitialState: function getInitialState() {
        return {
            display: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            confirmText: 'confirm',
            cancelText: 'cancel',
            closeIcon: _react2.default.createElement(
                'span',
                null,
                'x'
            )
        };
    },
    open: function open() {
        this.setState({
            display: true
        });
    },
    close: function close() {
        var onClose = this.props.onClose;

        if (onClose && !onClose()) return;
        this.setState({
            display: false
        });
    },
    handleConfirm: function handleConfirm() {
        if (this.props.onConfirm()) this.close();
    },
    handleCancel: function handleCancel() {
        if (this.props.onCancel()) this.close();
    },
    render: function render() {
        var _props = this.props,
            onConfirm = _props.onConfirm,
            onCancel = _props.onCancel,
            confirmText = _props.confirmText,
            className = _props.className,
            cancelText = _props.cancelText,
            title = _props.title,
            children = _props.children,
            style = _props.style,
            force = _props.force,
            closeIcon = _props.closeIcon;
        var display = this.state.display;

        var actionDOM = [];
        if (onConfirm) actionDOM.push(_react2.default.createElement(
            'div',
            { key: '_confirm-action', className: '_action-btn',
                onClick: this.handleConfirm },
            confirmText
        ));
        if (onCancel) actionDOM.push(_react2.default.createElement(
            'div',
            { key: '_cancel-action', className: '_action-btn',
                onClick: this.handleCancel },
            cancelText
        ));

        var footer = onCancel || onConfirm ? _react2.default.createElement(
            'div',
            { className: '_actions' },
            actionDOM
        ) : null;

        className = (0, _className2.default)('modal', className);

        if (display) {
            className += ' _show';
        }
        if (force) {
            className += ' _force';
        }

        return _react2.default.createElement(
            'div',
            { style: style, className: className },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: '_body' },
                    _react2.default.createElement(
                        'div',
                        { className: '_wrap' },
                        title ? _react2.default.createElement(
                            'div',
                            { className: '_title' },
                            title
                        ) : null,
                        _react2.default.createElement(
                            'div',
                            { className: '_content' },
                            children,
                            footer
                        ),
                        force ? null : _react2.default.createElement(
                            'div',
                            { className: '_close', onClick: this.close },
                            closeIcon
                        )
                    )
                ),
                force ? _react2.default.createElement('div', { className: '_overlay' }) : _react2.default.createElement('div', { className: '_overlay', onClick: this.close })
            )
        );
    }
});

exports.default = Modal;