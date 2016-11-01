'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tab = _react2.default.createClass({
    displayName: 'Tab',

    propTypes: {
        onChange: _react2.default.PropTypes.func
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

        var _props = this.props,
            children = _props.children,
            style = _props.style,
            className = _props.className;

        className = (0, _className2.default)(className, 'tab');
        var current = this.state.current;

        var tabs = [],
            contents = [];

        _react2.default.Children.map(children, function (node, i) {
            var _node$props = node.props,
                index = _node$props.index,
                _node$props$title = _node$props.title,
                title = _node$props$title === undefined ? index : _node$props$title,
                children = _node$props.children;

            if (index === null || index === undefined) {
                throw new Error('index is needed for children of tab');
            }
            var cls = index === current ? '_item _active' : '_item';
            if ((current === undefined || current === null) && i === 0) cls += ' _active';
            tabs.push(_react2.default.createElement(
                'div',
                { key: 'tab_' + i, className: cls, onClick: function onClick() {
                        return _this.handleItemClick(index);
                    } },
                title
            ));
            contents.push(_react2.default.createElement(
                'div',
                { key: 'content_' + i, className: cls },
                children
            ));
        });

        return _react2.default.createElement(
            'div',
            { className: className, style: style },
            _react2.default.createElement(
                'div',
                { className: '_tab' },
                tabs
            ),
            _react2.default.createElement(
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

exports.default = Tab;