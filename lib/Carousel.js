'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var IntervalMixin = require('./mixin/IntervalMixin');

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
            active = '';

        var _len = React.Children.count(NODES);

        for (var i = -1; i <= _len; i++) {
            var _index = i;
            if (_index === -1) _index = _len - 1;
            if (_index === _len) _index = 0;

            itemNodes.push(React.createElement(
                'div',
                { key: 'carousel-item-' + i, style: { 'width': this.state.baseWidth }, className: '_item ' + active },
                NODES[_index]
            ));
        }
        return itemNodes;
    },
    handleSlide: function handleSlide(index) {
        var _this2 = this;

        this.setState({
            index: parseInt(index)
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
        var _this5 = this;

        var leftArrow = this.props.leftArrow,
            rightArrow = this.props.rightArrow,
            arrowNode = this.props.showArrow ? React.createElement(
            'div',
            { className: '_arrow' },
            React.createElement(
                'a',
                { href: 'javascript:;', onClick: this.handleLeftArrow, className: '_left' },
                leftArrow ? leftArrow : '←'
            ),
            React.createElement(
                'a',
                { href: 'javascript:;', onClick: this.handleRightArrow, className: '_right' },
                rightArrow ? rightArrow : '→'
            )
        ) : null;

        var contentNodes = this.makeCarouselItem(this.props.items);
        var dotNodes = [];

        var _loop = function _loop(i) {
            dotNodes.push(React.createElement(
                'a',
                { href: 'javascript:;', key: i, className: _this5.state.index == i ? '_active _item' : '_item', onClick: function onClick() {
                        return _this5.handleSlide(i);
                    } },
                '·'
            ));
        };

        for (var i = 0; i < this.state.count; i++) {
            _loop(i);
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

module.exports = Carousel;