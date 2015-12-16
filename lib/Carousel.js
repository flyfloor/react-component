'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Item = require('./Item.js');
var IntervalMixin = require('./mixin/IntervalMixin');
var Data = require('./util/Data');

var Carousel = React.createClass({
    displayName: 'Carousel',

    mixins: [IntervalMixin],

    propTypes: {
        items: React.PropTypes.element.isRequired
    },

    getInitialState: function getInitialState() {
        return {
            index: 0,
            count: 0,
            baseWidth: 0
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            showArrow: false,
            autoPlay: false,
            delay: 3000
        };
    },
    componentDidMount: function componentDidMount() {
        var BASE = ReactDOM.findDOMNode(this);
        this.setState({
            baseWidth: BASE.offsetWidth
        });
        if (this.props.autoPlay) this.setInterval(this.handleAutoPlay, this.props.delay);
    },
    handleAutoPlay: function handleAutoPlay() {
        var _this = this;

        if (this.state.index < this.state.count) {
            this.setState({
                index: this.state.index + 1
            }, function () {
                _this.addTransition(_this.resetPosition);
            });
        }
    },
    componentWillMount: function componentWillMount() {
        var _child = this.props.items.props.children;
        if (_child) {
            this.setState({
                count: _child.length
            });
        }
    },
    makeCarouselItem: function makeCarouselItem(content) {
        var NODES = content.props.children;
        var itemNodes = [],
            nodeItem = undefined;
        if (NODES instanceof Array) {
            var _len = NODES.length;
            for (var i = -1; i <= _len; i++) {
                var _index = i;
                if (_index === -1) _index = _len - 1;
                if (_index === _len) _index = 0;
                itemNodes.push(React.createElement(
                    Item,
                    { key: i, selected: this.state.index == _index, style: { 'width': this.state.baseWidth }, itemIndex: i },
                    NODES[_index].props.children
                ));
            }
        }
        return itemNodes;
    },
    handleSlide: function handleSlide(e) {
        var _this2 = this;

        var DOT_INDEX = Data.getData(e.target, 'index');
        this.setState({
            index: parseInt(DOT_INDEX)
        }, function () {
            _this2.addTransition();
        });
    },
    handleRightArrow: function handleRightArrow() {
        var _this3 = this;

        if (this.state.index >= 0) {
            this.setState({
                index: this.state.index - 1
            }, function () {
                _this3.addTransition(_this3.resetPosition);
            });
        };
    },
    handleLeftArrow: function handleLeftArrow() {
        var _this4 = this;

        if (this.state.index < this.state.count) {
            this.setState({
                index: this.state.index + 1
            }, function () {
                _this4.addTransition(_this4.resetPosition);
            });
        };
    },
    resetPosition: function resetPosition() {
        if (this.state.index === -1) {
            this.setState({
                index: this.state.count - 1
            });
        }
        if (this.state.index === this.state.count) {
            this.setState({
                index: 0
            });
        };
    },
    addTransition: function addTransition(callback) {
        var contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM);
        contentDOM.className += ' _slide';
        setTimeout(function () {
            contentDOM.className = '_content';
            if (callback) callback();
        }, 500);
    },
    render: function render() {
        var arrowNode = this.props.showArrow ? React.createElement(
            'div',
            { className: '_arrow' },
            React.createElement(
                'a',
                { href: 'javascript:;', onClick: this.handleLeftArrow, className: '_left' },
                '←'
            ),
            React.createElement(
                'a',
                { href: 'javascript:;', onClick: this.handleRightArrow, className: '_right' },
                '→'
            )
        ) : null;
        var contentNodes = this.makeCarouselItem(this.props.items);
        var dotNodes = [];
        for (var i = 0; i < this.state.count; i++) {
            dotNodes.push(React.createElement(
                'a',
                { href: 'javascript:;', key: i, 'data-index': i, className: this.state.index == i ? 'active _item' : '_item', onClick: this.handleSlide },
                '·'
            ));
        }

        var contentCss = {
            width: this.state.baseWidth * (this.state.count + 2),
            transform: 'translate(-' + this.state.baseWidth * (this.state.index + 1) + 'px, 0)'
        };
        return React.createElement(
            'div',
            { className: 'ui carousel' },
            React.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: contentCss },
                contentNodes
            ),
            React.createElement(
                'div',
                { className: '_dot' },
                dotNodes
            ),
            arrowNode
        );
    }
});

Carousel.Item = Item;

module.exports = Carousel;