'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _DocumentClickMixin2 = _interopRequireDefault(_DocumentClickMixin);

var _PopUpMixin = require('./mixin/PopUpMixin');

var _PopUpMixin2 = _interopRequireDefault(_PopUpMixin);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmBox = _react2.default.createClass({
    displayName: 'ConfirmBox',

    mixins: [_DocumentClickMixin2.default, _PopUpMixin2.default],

    propTypes: {
        onCancel: _react2.default.PropTypes.func,
        onConfirm: _react2.default.PropTypes.func,
        force: _react2.default.PropTypes.bool,
        content: _react2.default.PropTypes.element.isRequired,
        confirmBtn: _react2.default.PropTypes.element,
        cancelBtn: _react2.default.PropTypes.element
    },

    closeConfirm: function closeConfirm() {
        this.setState({
            open: false
        });
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    onOtherDomClick: function onOtherDomClick() {
        if (!this.props.force) this.closeConfirm();
    },
    handleCancel: function handleCancel() {
        var onCancel = this.props.onCancel;

        if (!onCancel) return this.closeConfirm();
        if (onCancel()) this.closeConfirm();
    },
    handleConfirm: function handleConfirm() {
        var onConfirm = this.props.onConfirm;

        if (!onConfirm) return this.closeConfirm();
        if (onConfirm()) this.closeConfirm();
    },
    render: function render() {
        var _props = this.props,
            confirmBtn = _props.confirmBtn,
            cancelBtn = _props.cancelBtn,
            position = _props.position,
            className = _props.className,
            content = _props.content,
            style = _props.style,
            children = _props.children;
        var open = this.state.open;

        className = (0, _className2.default)('confirm-box popup', className);
        if (open) {
            className = className + ' _active';
        }

        return _react2.default.createElement(
            'span',
            { className: className, style: style, onClick: this.onTrigger },
            _react2.default.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                children
            ),
            _react2.default.createElement(
                'div',
                { className: '_wrap _' + position },
                _react2.default.createElement(
                    'div',
                    { ref: 'content', className: '_content' },
                    _react2.default.createElement(
                        'div',
                        { className: '_title' },
                        content
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: '_action' },
                        _react2.default.createElement(
                            'div',
                            { className: '_confirm', onClick: this.handleConfirm },
                            confirmBtn ? confirmBtn : _react2.default.createElement(
                                'div',
                                null,
                                'ok'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: '_cancel', onClick: this.handleCancel },
                            cancelBtn ? cancelBtn : _react2.default.createElement(
                                'div',
                                null,
                                'cancel'
                            )
                        )
                    ),
                    _react2.default.createElement('span', { className: '_arrow', ref: 'arrow' })
                )
            )
        );
    }
});

exports.default = ConfirmBox;