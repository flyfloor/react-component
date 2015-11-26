const React = require('react');
const css = require('../css/popup.less');
const DocumentClickMixin = require('../mixin/DocumentClickMixin');
const PopUpMixin = require('../mixin/PopUpMixin');

const ConfirmBox = React.createClass({
    displayName: 'ConfirmBox',

    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func
    },

    closeConfirm() {
        this.setState({
            open: false
        });
    },

    onOtherDomClick(e) {
        this.closeConfirm();
    },

    handleCancel() {
        if (!this.props.onCancel) return this.closeConfirm();
        if (this.props.onCancel()) this.closeConfirm();
    },

    handleConfirm() {
        if (!this.props.onConfirm) return this.closeConfirm();
        if (this.props.onConfirm()) this.closeConfirm();
    },

    render() {
        let content = this.state.open ? React.createElement(
            'div',
            { className: '_wrap _' + this.props.position },
            React.createElement('span', { className: '_arrow', ref: 'arrow' }),
            React.createElement(
                'div',
                { ref: 'content', className: '_content' },
                React.createElement(
                    'div',
                    { className: '_title' },
                    this.props.title
                ),
                React.createElement(
                    'div',
                    { className: '_action' },
                    React.createElement(
                        'a',
                        { href: 'javascript:;', className: '_confirm', onClick: this.handleConfirm },
                        '确认'
                    ),
                    React.createElement(
                        'a',
                        { href: 'javascript:;', className: '_cancel', onClick: this.handleCancel },
                        '取消'
                    )
                )
            )
        ) : null;
        return React.createElement(
            'span',
            { className: 'ui confirm-box popup', style: this.props.style, onClick: this.onTrigger },
            React.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                this.props.children
            ),
            content
        );
    }
});

module.exports = ConfirmBox;