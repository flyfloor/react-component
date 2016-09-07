'use strict';

var React = require('react');
var klassName = require('./util/className');

var Pagination = React.createClass({
    displayName: 'Pagination',

    propTypes: {
        onChange: React.PropTypes.func,
        total: React.PropTypes.number,
        current: React.PropTypes.number,
        showRange: React.PropTypes.bool,
        showNav: React.PropTypes.bool,
        isEnd: React.PropTypes.bool,
        range: React.PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            current: 1,
            range: 7,
            total: 30
        };
    },
    getInitialState: function getInitialState() {
        var current = this.props.current;

        return { current: current };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.current != this.props.current) {
            this.setState({
                current: nextProps.current || 1
            });
        }
    },
    onPageChange: function onPageChange(page) {
        var _props = this.props;
        var total = _props.total;
        var onChange = _props.onChange;

        if (page > total) return;
        this.setState({
            current: page
        });
        if (onChange) onChange(page);
    },
    formatFirstNode: function formatFirstNode(start) {
        var _this = this;

        var _props2 = this.props;
        var showRange = _props2.showRange;
        var showNav = _props2.showNav;
        var prevNode = _props2.prevNode;
        var current = this.state.current;


        var firstNode = null;
        if (showRange && start != 1) {
            firstNode = React.createElement(
                'li',
                { key: 'first-page', onClick: function onClick() {
                        return _this.onPageChange(1);
                    },
                    className: current === 1 ? '_active _range _item' : '_range _item' },
                React.createElement(
                    'span',
                    null,
                    '1 '
                ),
                React.createElement(
                    'span',
                    null,
                    ' ...'
                )
            );
        } else if (showNav && start != 1) {
            firstNode = React.createElement(
                'li',
                { className: '_item _nav _prev', key: 'previous-page', onClick: function onClick() {
                        return _this.onPageChange(current - 1);
                    } },
                prevNode ? prevNode : React.createElement(
                    'span',
                    null,
                    'prev'
                )
            );
        }
        return firstNode;
    },
    formatLastNode: function formatLastNode(end) {
        var _this2 = this;

        var _props3 = this.props;
        var showRange = _props3.showRange;
        var showNav = _props3.showNav;
        var nextNode = _props3.nextNode;
        var isEnd = _props3.isEnd;
        var total = _props3.total;
        var current = this.state.current;


        var lastNode = null;
        if (showRange && end !== total) {
            lastNode = React.createElement(
                'li',
                { key: 'last-page', onClick: function onClick() {
                        return _this2.onPageChange(total);
                    },
                    className: current === total ? '_active _range _item' : '_range _item' },
                React.createElement(
                    'span',
                    null,
                    '...  '
                ),
                React.createElement(
                    'span',
                    null,
                    total
                )
            );
        } else if (showNav && !isEnd && end !== total) {
            lastNode = React.createElement(
                'li',
                { className: '_item _nav _prev', key: 'next-page', onClick: function onClick() {
                        return _this2.onPageChange(current + 1);
                    } },
                nextNode ? nextNode : React.createElement(
                    'span',
                    null,
                    'next'
                )
            );
        }
        return lastNode;
    },
    formatStartAndEnd: function formatStartAndEnd() {
        var _props4 = this.props;
        var range = _props4.range;
        var total = _props4.total;
        var current = this.state.current;

        var start = 1,
            end = 1,
            left_half = Math.ceil(range / 2);

        // current large than half
        if (current > left_half) start = current - left_half;

        // calc end
        end = start + range;
        if (total - start <= range) {
            start = total - range;
            end = total;
        }

        return {
            start: start, end: end
        };
    },
    formatRange: function formatRange(start, end) {
        var _this3 = this;

        var isEnd = this.props.isEnd;
        var current = this.state.current;

        var nodes = [];

        var _loop = function _loop(i) {
            if (isEnd && current === i - 1) return 'break';
            nodes.push(React.createElement(
                'li',
                { key: 'page-link-' + i, onClick: function onClick() {
                        return _this3.onPageChange(i);
                    },
                    className: current === i ? '_active _item' : '_item' },
                React.createElement(
                    'span',
                    null,
                    i
                )
            ));
        };

        for (var i = start; i <= end; i++) {
            var _ret = _loop(i);

            if (_ret === 'break') break;
        }
        return nodes;
    },
    render: function render() {
        var _formatStartAndEnd = this.formatStartAndEnd();

        var start = _formatStartAndEnd.start;
        var end = _formatStartAndEnd.end;
        var className = this.props.className;

        className = klassName(className, 'pagination');
        return React.createElement(
            'ul',
            { className: className },
            this.formatFirstNode(start),
            this.formatRange(start, end),
            this.formatLastNode(end)
        );
    }
});

module.exports = Pagination;