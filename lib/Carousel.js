'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var IntervalMixin = require('./mixin/IntervalMixin');
var klassName = require('./util/className');

var Carousel = React.createClass({
    displayName: 'Carousel',

    mixins: [IntervalMixin],

    propTypes: {
        children: React.PropTypes.node,
        autoPlay: React.PropTypes.bool,
        delay: React.PropTypes.number,
        showArrow: React.PropTypes.bool,
        showDot: React.PropTypes.bool,
        prev: React.PropTypes.element,
        next: React.PropTypes.element,
        className: React.PropTypes.string
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
            showDot: true,
            autoPlay: false,
            delay: 3000,
            prev: React.createElement(
                'span',
                null,
                'prev'
            ),
            next: React.createElement(
                'span',
                null,
                'next'
            )
        };
    },
    componentDidMount: function componentDidMount() {
        var base = ReactDOM.findDOMNode(this);
        this.setState({
            baseWidth: base.offsetWidth
        });
        this.resetAutoplay();
    },
    handleAutoPlay: function handleAutoPlay() {
        var _this = this;

        var _state = this.state;
        var index = _state.index;
        var count = _state.count;

        if (index < count) {
            this.setState({
                index: index + 1
            }, function () {
                return _this.addTransition(_this.resetPosition);
            });
        }
    },
    resetAutoplay: function resetAutoplay() {
        var _props = this.props;
        var autoPlay = _props.autoPlay;
        var delay = _props.delay;

        if (autoPlay) {
            this.clearInterval();
            this.setInterval(this.handleAutoPlay, delay);
        }
    },
    componentWillMount: function componentWillMount() {
        var children = this.props.children;

        if (children) {
            this.setState({
                count: children.length
            });
        }
    },
    makeCarouselItem: function makeCarouselItem(children) {
        var _state2 = this.state;
        var baseWidth = _state2.baseWidth;
        var index = _state2.index;

        var itemNodes = [];

        var _len = React.Children.count(children);

        for (var i = -1; i <= _len; i++) {
            var _index = i;
            var active = index === i ? '_active' : '';
            if (_index === -1) _index = _len - 1;
            if (_index === _len) _index = 0;

            itemNodes.push(React.createElement(
                'div',
                { key: 'carousel-item-' + i,
                    style: { 'width': baseWidth },
                    className: '_item ' + active },
                children[_index]
            ));
        }
        return itemNodes;
    },
    handleSlide: function handleSlide(index) {
        var _this2 = this;

        this.resetAutoplay();
        this.setState({
            index: parseInt(index)
        }, function () {
            return _this2.addTransition();
        });
    },
    handleNext: function handleNext() {
        var _this3 = this;

        this.resetAutoplay();
        var index = this.state.index;

        if (index >= 0) {
            this.setState({
                index: index - 1
            }, function () {
                return _this3.addTransition(_this3.resetPosition);
            });
        }
    },
    handlePrev: function handlePrev() {
        var _this4 = this;

        this.resetAutoplay();
        var _state3 = this.state;
        var index = _state3.index;
        var count = _state3.count;

        if (index < count) {
            this.setState({
                index: index + 1
            }, function () {
                return _this4.addTransition(_this4.resetPosition);
            });
        }
    },
    resetPosition: function resetPosition() {
        var _state4 = this.state;
        var index = _state4.index;
        var count = _state4.count;

        if (index === -1) this.setState({ index: count - 1 });

        if (index === count) this.setState({ index: 0 });
    },
    addTransition: function addTransition(callback) {
        var _this5 = this;

        var contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM);
        contentDOM.className += ' _slide';
        setTimeout(function () {
            contentDOM.className = '_content';
            if (callback) callback.call(_this5, null);
        }, 500);
    },
    render: function render() {
        var _this6 = this;

        var _props2 = this.props;
        var prev = _props2.prev;
        var next = _props2.next;
        var showArrow = _props2.showArrow;
        var showDot = _props2.showDot;
        var children = _props2.children;
        var _state5 = this.state;
        var baseWidth = _state5.baseWidth;
        var count = _state5.count;
        var index = _state5.index;


        var arrowNode = null;

        if (showArrow) {
            arrowNode = React.createElement(
                'div',
                { className: '_arrow' },
                React.createElement(
                    'div',
                    { className: '_prev', onClick: this.handlePrev },
                    prev
                ),
                React.createElement(
                    'div',
                    { className: '_next', onClick: this.handleNext },
                    next
                )
            );
        }

        var contentNodes = this.makeCarouselItem(children);
        var dotNodes = [];

        if (showDot) {
            var _loop = function _loop(i) {
                dotNodes.push(React.createElement(
                    'a',
                    { href: 'javascript:;', key: i,
                        className: index == i ? '_active _item' : '_item',
                        onClick: function onClick() {
                            return _this6.handleSlide(i);
                        } },
                    '·'
                ));
            };

            for (var i = 0; i < count; i++) {
                _loop(i);
            }
            dotNodes = React.createElement(
                'div',
                { className: '_dot' },
                dotNodes
            );
        }

        var contentCss = {
            width: baseWidth * (count + 2),
            transform: 'translate3d(-' + baseWidth * (index + 1) + 'px, 0, 0)'
        };

        return React.createElement(
            'div',
            { className: klassName(this.props.className, 'carousel') },
            React.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: contentCss },
                contentNodes
            ),
            dotNodes,
            arrowNode
        );
    }
});

module.exports = Carousel;