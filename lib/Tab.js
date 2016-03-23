'use strict';

var React = require('react');

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        onSelect: React.PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
        return {
            selectedIndex: 0,
            position: 'bottom'
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
        var position = _props.position;

        return React.createElement(
            'div',
            { className: 'ui tab ' + position, style: style },
            this.makeTabItems(children)
        );
    }
});

module.exports = Tab;