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

var Tooltip = _react2.default.createClass({
    displayName: 'Tooltip',

    mixins: [_DocumentClickMixin2.default, _PopUpMixin2.default],

    propTypes: {
        content: _react2.default.PropTypes.element.isRequired,
        mode: _react2.default.PropTypes.oneOf(['hover', 'click'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            mode: 'hover'
        };
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            open: false
        });
    },
    render: function render() {
        var _this = this;

        var open = this.state.open;
        var _props = this.props,
            position = _props.position,
            content = _props.content,
            style = _props.style,
            className = _props.className,
            children = _props.children,
            mode = _props.mode;

        className = (0, _className2.default)('popup', className);
        if (open) {
            className = className + ' _active';
        }

        var onMouseLeave = null,
            onMouseEnter = null,
            onClick = null;

        if (mode === 'click') {
            onClick = function onClick(e) {
                return _this.onTrigger(e);
            };
        } else {
            onMouseEnter = function onMouseEnter(e) {
                return _this.onTrigger(e, true);
            };
            onMouseLeave = function onMouseLeave(e) {
                return _this.onTrigger(e, false);
            };
        }

        return _react2.default.createElement(
            'span',
            { className: className, style: style, onClick: onClick,
                onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
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
                    _react2.default.createElement('span', { className: '_arrow', ref: 'arrow' })
                )
            )
        );
    }
});

exports.default = Tooltip;