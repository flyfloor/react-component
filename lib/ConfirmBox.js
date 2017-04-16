'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var documentClickCmp = require('./high-order/documentClickCmp');
var popUpCmp = require('./high-order/popUpCmp');
var klassName = require('./util/className');

var ConfirmBox = function (_Component) {
    _inherits(ConfirmBox, _Component);

    function ConfirmBox(props) {
        _classCallCheck(this, ConfirmBox);

        var _this = _possibleConstructorReturn(this, (ConfirmBox.__proto__ || Object.getPrototypeOf(ConfirmBox)).call(this, props));

        _this.handleCancel = _this.handleCancel.bind(_this);
        _this.handleConfirm = _this.handleConfirm.bind(_this);
        return _this;
    }

    _createClass(ConfirmBox, [{
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            if (!this.props.force) this.popUpClose();
        }
    }, {
        key: 'handleCancel',
        value: function handleCancel() {
            var onCancel = this.props.onCancel;

            if (!onCancel) return this.popUpClose();
            if (onCancel()) this.popUpClose();
        }
    }, {
        key: 'handleConfirm',
        value: function handleConfirm() {
            var onConfirm = this.props.onConfirm;

            if (!onConfirm) return this.popUpClose();
            if (onConfirm()) this.popUpClose();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                confirm = _props.confirm,
                cancel = _props.cancel,
                position = _props.position,
                className = _props.className,
                content = _props.content,
                style = _props.style,
                children = _props.children;
            var open = this.state.open;

            className = klassName('confirm-box popup', className);
            if (open) {
                className = className + ' _active';
            }

            return React.createElement(
                'span',
                { className: className, style: style, onClick: this.onTrigger },
                React.createElement(
                    'span',
                    { className: '_trigger', ref: 'trigger' },
                    children
                ),
                React.createElement(
                    ReactCssTransitionGroup,
                    { className: '_wrap _' + position, transitionName: 'popup',
                        transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                    open ? React.createElement(
                        'div',
                        { ref: 'content', className: '_content' },
                        React.createElement(
                            'div',
                            { className: '_title' },
                            content
                        ),
                        React.createElement(
                            'div',
                            { className: '_action' },
                            React.createElement(
                                'div',
                                { className: '_confirm', onClick: this.handleConfirm },
                                confirm ? confirm : React.createElement(
                                    'div',
                                    null,
                                    'ok'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: '_cancel', onClick: this.handleCancel },
                                cancel ? cancel : React.createElement(
                                    'div',
                                    null,
                                    'cancel'
                                )
                            )
                        ),
                        React.createElement('span', { className: '_arrow', ref: 'arrow' })
                    ) : null
                )
            );
        }
    }]);

    return ConfirmBox;
}(Component);

ConfirmBox.propTypes = {
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    force: PropTypes.bool,
    content: PropTypes.element.isRequired,
    confirm: PropTypes.element,
    cancel: PropTypes.element
};

ConfirmBox.defaultProps = {
    className: ''
};

module.exports = popUpCmp(documentClickCmp(ConfirmBox));