const React = require('react');
const css = require('../css/popup.less');
const DocumentClickMixin = require('../mixin/DocumentClickMixin');
const PopUpMixin = require('../mixin/PopUpMixin');

const Tooltip = React.createClass({
    displayName: 'Tooltip',

    mixins: [DocumentClickMixin, PopUpMixin],

    onOtherDomClick(e) {
        this.setState({
            open: false
        });
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
                )
            )
        ) : null;
        return React.createElement(
            'span',
            { className: 'ui confirm-box popup', style: this.props.style, onMouseOver: this.onTrigger, onMouseLeave: this.onTrigger },
            React.createElement(
                'span',
                { className: '_trigger', ref: 'trigger' },
                this.props.children
            ),
            content
        );
    }
});

module.exports = Tooltip;