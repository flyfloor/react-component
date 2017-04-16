'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
var intervalCmp = require('./high-order/intervalCmp');
var klassName = require('./util/className');

var Carousel = function (_Component) {
    _inherits(Carousel, _Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.handleAutoPlay = _this.handleAutoPlay.bind(_this);
        _this.resetAutoplay = _this.resetAutoplay.bind(_this);
        _this.makeCarouselItem = _this.makeCarouselItem.bind(_this);
        _this.handleSlide = _this.handleSlide.bind(_this);
        _this.handleNext = _this.handleNext.bind(_this);
        _this.handlePrev = _this.handlePrev.bind(_this);
        _this.resetPosition = _this.resetPosition.bind(_this);
        _this.addTransition = _this.addTransition.bind(_this);
        _this.state = {
            index: 0,
            count: 0,
            baseWidth: 0
        };
        return _this;
    }

    _createClass(Carousel, [{
        key: 'handleAutoPlay',
        value: function handleAutoPlay() {
            var _this2 = this;

            var _state = this.state,
                index = _state.index,
                count = _state.count;

            if (index < count) {
                this.setState({
                    index: index + 1
                }, function () {
                    return _this2.addTransition(_this2.resetPosition);
                });
            }
        }
    }, {
        key: 'resetAutoplay',
        value: function resetAutoplay() {
            var _props = this.props,
                autoPlay = _props.autoPlay,
                delay = _props.delay;

            if (autoPlay) {
                this.clearInterval();
                this.setInterval(this.handleAutoPlay, delay);
            }
        }
    }, {
        key: 'makeCarouselItem',
        value: function makeCarouselItem(children) {
            var _state2 = this.state,
                baseWidth = _state2.baseWidth,
                index = _state2.index;

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
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var children = this.props.children;

            if (children) {
                this.setState({
                    count: children.length
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var base = ReactDOM.findDOMNode(this);
            this.setState({
                baseWidth: base.offsetWidth
            });
            this.resetAutoplay();
        }
    }, {
        key: 'handleSlide',
        value: function handleSlide(index) {
            var _this3 = this;

            this.resetAutoplay();
            this.setState({
                index: parseInt(index)
            }, function () {
                return _this3.addTransition();
            });
        }
    }, {
        key: 'handleNext',
        value: function handleNext() {
            var _this4 = this;

            this.resetAutoplay();
            var index = this.state.index;

            if (index >= 0) {
                this.setState({
                    index: index - 1
                }, function () {
                    return _this4.addTransition(_this4.resetPosition);
                });
            }
        }
    }, {
        key: 'handlePrev',
        value: function handlePrev() {
            var _this5 = this;

            this.resetAutoplay();
            var _state3 = this.state,
                index = _state3.index,
                count = _state3.count;

            if (index < count) {
                this.setState({
                    index: index + 1
                }, function () {
                    return _this5.addTransition(_this5.resetPosition);
                });
            }
        }
    }, {
        key: 'resetPosition',
        value: function resetPosition() {
            var _state4 = this.state,
                index = _state4.index,
                count = _state4.count;

            if (index === -1) this.setState({ index: count - 1 });

            if (index === count) this.setState({ index: 0 });
        }
    }, {
        key: 'addTransition',
        value: function addTransition(callback) {
            var _this6 = this;

            var contentDOM = ReactDOM.findDOMNode(this.refs.contentDOM);
            contentDOM.className += ' _slide';
            setTimeout(function () {
                contentDOM.className = '_content';
                if (callback) callback.call(_this6, null);
            }, 500);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

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
                                return _this7.handleSlide(i);
                            } },
                        '\xB7'
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
    }]);

    return Carousel;
}(Component);

Carousel.propTypes = {
    children: PropTypes.node,
    autoPlay: PropTypes.bool,
    delay: PropTypes.number,
    showArrow: PropTypes.bool,
    showDot: PropTypes.bool,
    prev: PropTypes.element,
    next: PropTypes.element,
    className: PropTypes.string
};

Carousel.defaultProps = {
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

module.exports = intervalCmp(Carousel);