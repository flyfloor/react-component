'use strict';

var React = require('react');
var klassName = require('./util/className');

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        onChange: React.PropTypes.func
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
        var onChange = this.props.onChange;

        if (onChange) onChange(index);
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
    makeTab: function makeTab() {
        var _this = this;

        var _props = this.props;
        var children = _props.children;
        var style = _props.style;
        var className = _props.className;

        className = klassName(className, 'tab');
        var current = this.state.current;

        var tabs = [],
            contents = [];

        React.Children.map(children, function (node, i) {
            var _node$props = node.props;
            var index = _node$props.index;
            var _node$props$title = _node$props.title;
            var title = _node$props$title === undefined ? index : _node$props$title;
            var children = _node$props.children;

            if (index === null || index === undefined) {
                throw new Error('index is needed for children of tab');
            }
            var cls = index === current ? '_item _active' : '_item';
            if ((current === undefined || current === null) && i === 0) cls += ' _active';
            tabs.push(React.createElement(
                'div',
                { key: 'tab_' + i, className: cls, onClick: function onClick() {
                        return _this.handleItemClick(index);
                    } },
                title
            ));
            contents.push(React.createElement(
                'div',
                { key: 'content_' + i, className: cls },
                children
            ));
        });

        return React.createElement(
            'div',
            { className: className, style: style },
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
        return this.makeTab();
    }
});

module.exports = Tab;