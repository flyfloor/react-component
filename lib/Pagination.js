'use strict';

var React = require('react');

var Pagination = React.createClass({
    displayName: 'Pagination',

    propTypes: {
        onChange: React.PropTypes.func,
        totalPage: React.PropTypes.number,
        currentPage: React.PropTypes.number,
        showRange: React.PropTypes.bool,
        showNav: React.PropTypes.bool,
        isEnd: React.PropTypes.bool,
        range: React.PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            currentPage: 1,
            range: 7,
            totalPage: 30
        };
    },
    getInitialState: function getInitialState() {
        return {
            currentPage: this.props.currentPage
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.currentPage != this.props.currentPage) {
            this.setState({
                currentPage: nextProps.currentPage || 1
            });
        }
    },
    onPageChange: function onPageChange(page) {
        if (page > this.props.totalPage) return;
        this.setState({
            currentPage: page
        });
        if (this.props.onChange) this.props.onChange(page);
    },
    render: function render() {
        var _this = this;

        var _props = this.props;
        var totalPage = _props.totalPage;
        var range = _props.range;
        var showRange = _props.showRange;
        var showNav = _props.showNav;
        var prevNode = _props.prevNode;
        var nextNode = _props.nextNode;
        var isEnd = _props.isEnd;
        var currentPage = this.state.currentPage;

        var start = 1,
            end = 1,
            nodes = [],
            left_half = Math.ceil(range / 2);

        // current large than half
        if (currentPage > left_half) start = currentPage - left_half;

        // calc end
        end = start + range;

        if (totalPage - start <= range) {
            start = totalPage - range;
            end = totalPage;
        }

        // first node
        var firstNode = null;
        if (showRange && start != 1) {
            firstNode = React.createElement(
                'li',
                { key: 'first-page', className: currentPage === 1 ? '_active _item' : '_item' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', onClick: function onClick() {
                            return _this.onPageChange(1);
                        } },
                    '1'
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
                        return _this.onPageChange(currentPage - 1);
                    } },
                prevNode ? prevNode : React.createElement(
                    'a',
                    { href: 'javascript:;' },
                    'previous'
                )
            );
        }

        // last node
        var lastNode = null;
        if (showRange && end != totalPage) {
            lastNode = React.createElement(
                'li',
                { key: 'last-page', className: currentPage === totalPage ? '_active _item' : '_item' },
                React.createElement(
                    'span',
                    null,
                    '... '
                ),
                React.createElement(
                    'a',
                    { href: 'javascript:;', onClick: function onClick() {
                            return _this.onPageChange(totalPage);
                        } },
                    totalPage
                )
            );
        } else if (showNav && !isEnd && end !== totalPage) {
            lastNode = React.createElement(
                'li',
                { className: '_item _nav _prev', key: 'next-page', onClick: function onClick() {
                        return _this.onPageChange(currentPage + 1);
                    } },
                nextNode ? nextNode : React.createElement(
                    'a',
                    { href: 'javascript:;' },
                    'next'
                )
            );
        }

        // node

        var _loop = function _loop(i) {
            if (isEnd && currentPage === i - 1) return 'break';
            nodes.push(React.createElement(
                'li',
                { key: 'page-link-' + i, className: currentPage === i ? '_active _item' : '_item' },
                React.createElement(
                    'a',
                    { href: 'javascript:;', onClick: function onClick() {
                            return _this.onPageChange(i);
                        } },
                    i
                )
            ));
        };

        for (var i = start; i <= end; i++) {
            var _ret = _loop(i);

            if (_ret === 'break') break;
        };
        return React.createElement(
            'ul',
            { className: 'ui pagination' },
            firstNode,
            nodes,
            lastNode
        );
    }
});

module.exports = Pagination;