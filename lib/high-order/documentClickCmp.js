'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactDOM = require('react-dom');

module.exports = function (Cmp) {
    return function (_Cmp) {
        _inherits(DocumentClickCmp, _Cmp);

        function DocumentClickCmp(props) {
            _classCallCheck(this, DocumentClickCmp);

            var _this = _possibleConstructorReturn(this, (DocumentClickCmp.__proto__ || Object.getPrototypeOf(DocumentClickCmp)).call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            _this.onDocumentClick = _this.onDocumentClick.bind(_this);
            return _this;
        }

        _createClass(DocumentClickCmp, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                document.addEventListener('click', this.onClick);
                if (_get(DocumentClickCmp.prototype.__proto__ || Object.getPrototypeOf(DocumentClickCmp.prototype), 'componentDidMount', this)) {
                    _get(DocumentClickCmp.prototype.__proto__ || Object.getPrototypeOf(DocumentClickCmp.prototype), 'componentDidMount', this).call(this);
                }
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                document.removeEventListener('click', this.onClick);
                if (_get(DocumentClickCmp.prototype.__proto__ || Object.getPrototypeOf(DocumentClickCmp.prototype), 'componentWillUnmount', this)) {
                    _get(DocumentClickCmp.prototype.__proto__ || Object.getPrototypeOf(DocumentClickCmp.prototype), 'componentWillUnmount', this).call(this);
                }
            }
        }, {
            key: 'onClick',
            value: function onClick(e) {
                this.onDocumentClick(e);
            }
        }, {
            key: 'onDocumentClick',
            value: function onDocumentClick(e) {
                var BASE_NODE = ReactDOM.findDOMNode(this);
                if (e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
                    if (this.onBaseDomClick) this.onBaseDomClick(e);
                } else {
                    this.onOtherDomClick(e);
                }
                e.stopPropagation();
            }
        }]);

        return DocumentClickCmp;
    }(Cmp);
};