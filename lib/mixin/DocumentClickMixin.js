'use strict';

var ReactDOM = require('react-dom');

var DocumentClickMixin = {
    componentDidMount: function componentDidMount() {
        document.addEventListener('click', this.onClick);
    },
    componentWillUnmount: function componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
    },
    onClick: function onClick(e) {
        this.onDocumentClick(e);
    },
    onDocumentClick: function onDocumentClick(e) {
        var BASE_NODE = ReactDOM.findDOMNode(this);

        if (e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
            if (this.onBaseDomClick) this.onBaseDomClick(e);
        } else {
            if (document.contains(e.target) && this.onOtherDomClick) this.onOtherDomClick(e);
        }
        e.stopPropagation();
    }
};

module.exports = DocumentClickMixin;