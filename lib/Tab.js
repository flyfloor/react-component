'use strict';

var React = require('react');

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        onSelect: React.PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: ''
        };
    },
    getInitialState: function getInitialState() {
        var current = this.props.current;

        return { current: current };
    },
    handleItemClick: function handleItemClick(index) {
        var onSelect = this.props.onSelect;

        if (onSelect) onSelect(index);
        this.setState({
            current: index
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var current = this.props.current;

        if (nextProps.current !== current) {
            this.setState({
                current: nextProps.current
            });
        }
    },
    makeTabItems: function makeTabItems(children) {
        var _this = this;

        var current = this.state.current;

        var tabs = [],
            contents = [];

        React.Children.map(children, function (node, i) {
            var _node$props = node.props;
            var index = _node$props.index;
            var _node$props$title = _node$props.title;
            var title = _node$props$title === undefined ? index : _node$props$title;
            var children = _node$props.children;

            if (index === null || index === undefined) return console.error('index is needed for children of menu');
            var className = index === current ? '_item _active' : '_item';
            if ((current === undefined || current === null) && i === 0) className += ' _active';
            tabs.push(React.createElement(
                'div',
                { key: 'tab_' + i, className: className, onClick: function onClick() {
                        return _this.handleItemClick(index);
                    } },
                title
            ));
            contents.push(React.createElement(
                'div',
                { key: 'content_' + i, className: className },
                children
            ));
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: '_tab' },
                tabs
            ),
            React.createElement(
                'div',
                { className: '_content' },
                contents
            )
        );
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