'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var IntervalMixin = require('./mixin/IntervalMixin');

var Carousel = React.createClass({
    displayName: 'Carousel',

    mixins: [IntervalMixin],

    propTypes: {
        items: React.PropTypes.element.isRequired,
        autoPlay: React.PropTypes.bool,
        delay: React.PropTypes.number,
        showArrow: React.PropTypes.bool
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
        var _props = this.props;
        var autoPlay = _props.autoPlay;
        var delay = _props.delay;

        this.setState({
            baseWidth: BASE.offsetWidth
        });
        if (autoPlay) this.setInterval(this.handleAutoPlay, delay);
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
        var _state2 = this.state;
        var baseWidth = _state2.baseWidth;
        var index = _state2.index;

        var itemNodes = [];

        var _len = React.Children.count(NODES);

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
            return _this2.addTransition();
        });
    },
    handleRightArrow: function handleRightArrow() {
        var _this3 = this;

        var index = this.state.index;

        if (index >= 0) {
            this.setState({
                index: index - 1
            }, function () {
                return _this3.addTransition(_this3.resetPosition);
            });
        };
    },
    handleLeftArrow: function handleLeftArrow() {
        var _this4 = this;

        var _state3 = this.state;
        var index = _state3.index;
        var count = _state3.count;

        if (index < count) {
            this.setState({
                index: index + 1
            }, function () {
                return _this4.addTransition(_this4.resetPosition);
            });
        };
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
        var leftArrow = _props2.leftArrow;
        var rightArrow = _props2.rightArrow;
        var showArrow = _props2.showArrow;
        var _state5 = this.state;
        var baseWidth = _state5.baseWidth;
        var count = _state5.count;
        var index = _state5.index;


        var arrowNode = showArrow ? React.createElement(
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
                { href: 'javascript:;', key: i,
                    className: index == i ? '_active _item' : '_item', onClick: function onClick() {
                        return _this6.handleSlide(i);
                    } },
                '·'
            ));
        };

        for (var i = 0; i < count; i++) {
            _loop(i);
        }

        var contentCss = {
            width: baseWidth * (count + 2),
            transform: 'translate(-' + baseWidth * (index + 1) + 'px, 0)'
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