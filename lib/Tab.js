'use strict';

var React = require('react');

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        onSelect: React.PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            selectedIndex: 0
        };
    },
    getInitialState: function getInitialState() {
        return {
            index: this.props.selectedIndex
        };
    },
    handleItemClick: function handleItemClick(index) {
        var onSelect = this.props.onSelect;

        if (onSelect) onSelect(index);
        this.setState({
            index: index
        });
    },
    makeTabItems: function makeTabItems(children) {
        var _this = this;

        var index = this.state.index;

        var active = void 0;
        return React.Children.map(children, function (node, i) {
            active = i == index ? '_active' : '';
            return React.createElement(
                'div',
                { className: '_item ' + active, onClick: function onClick() {
                        return _this.handleItemClick(i);
                    } },
                node
            );
        });
    },
    render: function render() {
        var _props = this.props;
        var children = _props.children;
        var style = _props.style;
        var className = _props.className;

        return React.createElement(
            'div',
            { className: 'ui tab ' + className, style: style },
            this.makeTabItems(children)
        );
    }
});

module.exports = Tab;