'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var klassName = require('./util/className');

var Tab = function (_Component) {
    _inherits(Tab, _Component);

    function Tab(props) {
        _classCallCheck(this, Tab);

        var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, props));

        _this.handleItemClick = _this.handleItemClick.bind(_this);

        var current = props.current;

        _this.state = {
            current: current
        };
        return _this;
    }

    _createClass(Tab, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var current = this.props.current;

            if (nextProps.current !== current) {
                this.setState({
                    current: nextProps.current
                });
            }
        }
    }, {
        key: 'handleItemClick',
        value: function handleItemClick(index) {
            var onChange = this.props.onChange;

            if (onChange) onChange(index);
            this.setState({
                current: index
            });
        }
    }, {
        key: 'makeTab',
        value: function makeTab() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                style = _props.style,
                className = _props.className,
                vertical = _props.vertical,
                section = _props.section,
                bottom = _props.bottom;

            className = klassName(className, 'tab');
            if (vertical) {
                className += ' vertical';
            }
            if (section) {
                className += ' section';
            }
            if (bottom) {
                className += ' bottom';
            }
            var current = this.state.current;

            var tabs = [],
                contents = [];

            React.Children.map(children, function (node, i) {
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
                tabs.push(React.createElement(
                    'div',
                    { key: 'tab_' + i, className: cls, onClick: function onClick() {
                            return _this2.handleItemClick(index);
                        } },
                    title
                ));
                contents.push(React.createElement(
                    'div',
                    { key: 'content_' + i, className: cls },
                    children
                ));
            });

            var node = bottom ? React.createElement(
                'div',
                { className: className, style: style },
                React.createElement(
                    'div',
                    { className: '_content' },
                    contents
                ),
                React.createElement(
                    'div',
                    { className: '_tab' },
                    tabs
                )
            ) : React.createElement(
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

            return node;
        }
    }, {
        key: 'render',
        value: function render() {
            return this.makeTab();
        }
    }]);

    return Tab;
}(Component);

Tab.propTypes = {
    onChange: PropTypes.func,
    bottom: PropTypes.bool,
    section: PropTypes.bool,
    vertical: PropTypes.bool
};

Tab.defaultProps = {
    className: '',
    bottom: false,
    vertical: false,
    section: false
};

module.exports = Tab;