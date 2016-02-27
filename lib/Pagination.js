'use strict';

var React = require('react');

var Pagination = React.createClass({
    displayName: 'Pagination',

    propTypes: {
        onChange: React.PropTypes.func
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
        this.setState({
            currentPage: page
        });
        if (this.props.onChange) {
            this.props.onChange(page);
        }
    },
    render: function render() {
        var _this = this;

        var currentPage = parseInt(this.state.currentPage),
            totalPage = parseInt(this.props.totalPage),
            range = parseInt(this.props.range),
            start = 1,
            end = 1,
            left_half = Math.ceil(range / 2),
            nodes = [],
            showRange = this.props.showRange;

        if (currentPage > left_half) start = currentPage - left_half;

        end = start + range;

        if (totalPage - start <= range) {
            start = totalPage - range;
            end = totalPage;
        }

        var firstNode = showRange && start != 1 ? React.createElement(
            'li',
            { className: '_first', key: 'first-page', className: currentPage === 1 ? '_active _item' : '_item' },
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
        ) : null;

        var lastNode = showRange && end != totalPage ? React.createElement(
            'li',
            { className: '_last', key: 'last-page', className: currentPage === totalPage ? '_active _item' : '_item' },
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
        ) : null;

        var _loop = function _loop(i) {
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
            _loop(i);
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