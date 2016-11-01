'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _IntervalMixin = require('./mixin/IntervalMixin');

var _IntervalMixin2 = _interopRequireDefault(_IntervalMixin);

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Carousel = _react2.default.createClass({
    displayName: 'Carousel',

    mixins: [_IntervalMixin2.default],

    propTypes: {
        children: _react2.default.PropTypes.node,
        autoPlay: _react2.default.PropTypes.bool,
        delay: _react2.default.PropTypes.number,
        showArrow: _react2.default.PropTypes.bool,
        showDot: _react2.default.PropTypes.bool,
        prev: _react2.default.PropTypes.element,
        next: _react2.default.PropTypes.element,
        className: _react2.default.PropTypes.string
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
            prev: _react2.default.createElement(
                'span',
                null,
                'prev'
            ),
            next: _react2.default.createElement(
                'span',
                null,
                'next'
            )
        };
    },
    componentDidMount: function componentDidMount() {
        var base = _reactDom2.default.findDOMNode(this);
        this.setState({
            baseWidth: base.offsetWidth
        });
        this.resetAutoplay();
    },
    handleAutoPlay: function handleAutoPlay() {
        var _this = this;

        var _state = this.state,
            index = _state.index,
            count = _state.count;

        if (index < count) {
            this.setState({
                index: index + 1
            }, function () {
                return _this.addTransition(_this.resetPosition);
            });
        }
    },
    resetAutoplay: function resetAutoplay() {
        var _props = this.props,
            autoPlay = _props.autoPlay,
            delay = _props.delay;

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
        var _state2 = this.state,
            baseWidth = _state2.baseWidth,
            index = _state2.index;

        var itemNodes = [];

        var _len = _react2.default.Children.count(children);

        for (var i = -1; i <= _len; i++) {
            var _index = i;
            var active = index === i ? '_active' : '';
            if (_index === -1) _index = _len - 1;
            if (_index === _len) _index = 0;

            itemNodes.push(_react2.default.createElement(
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
        var _state3 = this.state,
            index = _state3.index,
            count = _state3.count;

        if (index < count) {
            this.setState({
                index: index + 1
            }, function () {
                return _this4.addTransition(_this4.resetPosition);
            });
        }
    },
    resetPosition: function resetPosition() {
        var _state4 = this.state,
            index = _state4.index,
            count = _state4.count;

        if (index === -1) this.setState({ index: count - 1 });

        if (index === count) this.setState({ index: 0 });
    },
    addTransition: function addTransition(callback) {
        var _this5 = this;

        var contentDOM = _reactDom2.default.findDOMNode(this.refs.contentDOM);
        contentDOM.className += ' _slide';
        setTimeout(function () {
            contentDOM.className = '_content';
            if (callback) callback.call(_this5, null);
        }, 500);
    },
    render: function render() {
        var _this6 = this;

        var _props2 = this.props,
            prev = _props2.prev,
            next = _props2.next,
            showArrow = _props2.showArrow,
            showDot = _props2.showDot,
            children = _props2.children;
        var _state5 = this.state,
            baseWidth = _state5.baseWidth,
            count = _state5.count,
            index = _state5.index;


        var arrowNode = null;

        if (showArrow) {
            arrowNode = _react2.default.createElement(
                'div',
                { className: '_arrow' },
                _react2.default.createElement(
                    'div',
                    { className: '_prev', onClick: this.handlePrev },
                    prev
                ),
                _react2.default.createElement(
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
                dotNodes.push(_react2.default.createElement(
                    'a',
                    { href: 'javascript:;', key: i,
                        className: index == i ? '_active _item' : '_item',
                        onClick: function onClick() {
                            return _this6.handleSlide(i);
                        } },
                    '\xB7'
                ));
            };

            for (var i = 0; i < count; i++) {
                _loop(i);
            }
            dotNodes = _react2.default.createElement(
                'div',
                { className: '_dot' },
                dotNodes
            );
        }

        var contentCss = {
            width: baseWidth * (count + 2),
            transform: 'translate3d(-' + baseWidth * (index + 1) + 'px, 0, 0)'
        };

        return _react2.default.createElement(
            'div',
            { className: (0, _className2.default)(this.props.className, 'carousel') },
            _react2.default.createElement(
                'div',
                { className: '_content', ref: 'contentDOM', style: contentCss },
                contentNodes
            ),
            dotNodes,
            arrowNode
        );
    }
});

exports.default = Carousel;