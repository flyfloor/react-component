'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');

module.exports = function (Cmp) {
    var PopUpCmp = function (_Cmp) {
        _inherits(PopUpCmp, _Cmp);

        function PopUpCmp(props) {
            _classCallCheck(this, PopUpCmp);

            var _this = _possibleConstructorReturn(this, (PopUpCmp.__proto__ || Object.getPrototypeOf(PopUpCmp)).call(this, props));

            _this.triggerSize = _this.triggerSize.bind(_this);
            _this.onTrigger = _this.onTrigger.bind(_this);
            _this.calcPosition = _this.calcPosition.bind(_this);

            _this.state = {
                open: false
            };
            return _this;
        }

        _createClass(PopUpCmp, [{
            key: 'triggerSize',
            value: function triggerSize() {
                var TRG = ReactDOM.findDOMNode(this.refs.trigger);
                return {
                    tr_width: TRG.offsetWidth,
                    tr_height: TRG.offsetHeight
                };
            }
        }, {
            key: 'contentSize',
            value: function contentSize() {
                var CONTENT = ReactDOM.findDOMNode(this.refs.content);
                if (!CONTENT) return { width: 0, height: 0 };
                return {
                    c_width: CONTENT.offsetWidth,
                    c_height: CONTENT.offsetHeight
                };
            }

            // popup close

        }, {
            key: 'popUpClose',
            value: function popUpClose() {
                this.setState({
                    open: false
                });
            }
        }, {
            key: 'onTrigger',
            value: function onTrigger(e, state) {
                var _this2 = this;

                var contentDOM = ReactDOM.findDOMNode(this.refs.content);
                if (contentDOM && (e.target == contentDOM || contentDOM.contains(e.target))) {
                    // do nothing
                } else {
                    state = state !== null && state !== undefined ? state : !this.state.open;
                    this.setState({
                        open: state
                    }, function () {
                        contentDOM = ReactDOM.findDOMNode(_this2.refs.content);
                        if (contentDOM) contentDOM.setAttribute("style", _this2.calcPosition());
                    });
                }
            }
        }, {
            key: 'calcPosition',
            value: function calcPosition() {
                var _triggerSize = this.triggerSize(),
                    tr_width = _triggerSize.tr_width,
                    tr_height = _triggerSize.tr_height,
                    _contentSize = this.contentSize(),
                    c_width = _contentSize.c_width,
                    c_height = _contentSize.c_height,
                    style = void 0;

                switch (this.props.position) {
                    case 'left':
                        style = 'left:' + (-10 - c_width) + 'px;top:' + -(tr_height + c_height) / 2 + 'px';
                        break;
                    case 'right':
                        style = 'left:' + (tr_width + 10) + 'px;top:' + -(tr_height + c_height) / 2 + 'px';
                        break;
                    case 'bottom':
                        style = 'left:' + (tr_width / 2 - c_width / 2) + 'px;top:10px';
                        break;
                    default:
                        style = 'left:' + (tr_width / 2 - c_width / 2) + 'px;bottom:' + (tr_height + 10) + 'px';
                        break;
                }

                return style;
            }
        }]);

        return PopUpCmp;
    }(Cmp);

    PopUpCmp.propTypes = {
        position: PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
    };

    PopUpCmp.defaultProps = {
        position: 'top'
    };

    return PopUpCmp;
};