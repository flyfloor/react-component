'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var PopUpMixin = {
    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom'])
    },

    getInitialState: function getInitialState() {
        return {
            open: false
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            position: 'top'
        };
    },
    triggerSize: function triggerSize() {
        var TRG = ReactDOM.findDOMNode(this.refs.trigger);
        return {
            tr_width: TRG.offsetWidth,
            tr_height: TRG.offsetHeight
        };
    },
    contentSize: function contentSize() {
        var CONTENT = ReactDOM.findDOMNode(this.refs.content);
        if (!CONTENT) return { width: 0, height: 0 };
        return {
            c_width: CONTENT.offsetWidth,
            c_height: CONTENT.offsetHeight
        };
    },
    onTrigger: function onTrigger(e, state) {
        var _this = this;

        var contentDOM = ReactDOM.findDOMNode(this.refs.content);
        if (contentDOM && (e.target == contentDOM || contentDOM.contains(e.target))) {
            // do nothing
        } else {
                state = state !== null && state !== undefined ? state : !this.state.open;
                this.setState({
                    open: state
                }, function () {
                    contentDOM = ReactDOM.findDOMNode(_this.refs.content);
                    if (contentDOM) contentDOM.setAttribute("style", _this.calcPosition());
                });
            }
    },
    calcPosition: function calcPosition() {
        var _triggerSize = this.triggerSize();

        var tr_width = _triggerSize.tr_width;
        var tr_height = _triggerSize.tr_height;

        var _contentSize = this.contentSize();

        var c_width = _contentSize.c_width;
        var c_height = _contentSize.c_height;
        var style = void 0;

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
};

module.exports = PopUpMixin;