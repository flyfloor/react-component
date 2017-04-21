'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
var scrollCmp = require('./high-order/scrollCmp');
var klassName = require('./util/className');

var Pin = function (_Component) {
    _inherits(Pin, _Component);

    function Pin(props) {
        _classCallCheck(this, Pin);

        var _this = _possibleConstructorReturn(this, (Pin.__proto__ || Object.getPrototypeOf(Pin)).call(this, props));

        _this.state = {
            fixed: false,
            baseTop: 0
        };
        return _this;
    }

    _createClass(Pin, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                baseTop: this.node2Top()
            });
        }
    }, {
        key: 'node2Top',
        value: function node2Top() {
            var begin = this.props.begin;

            if (begin) return begin;
            var pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
            return pinNode.offsetTop;
        }
    }, {
        key: 'onScroll',
        value: function onScroll() {
            var _windowScrollOffset = this.windowScrollOffset(),
                _top = _windowScrollOffset._top;

            this.setState({
                fixed: _top >= this.state.baseTop
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var fixed = this.state.fixed;
            var _props = this.props,
                top = _props.top,
                children = _props.children,
                className = _props.className;

            className = klassName(className, 'pin');
            var stat = fixed ? 'fixed' : '';
            return React.createElement(
                'div',
                { className: className + ' ' + stat, style: { 'top': top }, ref: 'pinNode' },
                children
            );
        }
    }]);

    return Pin;
}(Component);

Pin.propTypes = {
    top: PropTypes.number,
    begin: PropTypes.number
};

Pin.defaultProps = {
    top: 0,
    className: ''
};

module.exports = scrollCmp(Pin);