import React from 'react';
import ReactDOM from 'react-dom';

const DocumentClickMixin = {
    propTypes: {
        onBaseDomClick: React.PropTypes.func,
        onBaseDomClick: React.PropTypes.func,
        onOtherDomClick: React.PropTypes.func,
    },
    
    componentDidMount() {
        document.addEventListener('click', this.onClick);
    },
    
    componentWillUnmount() {
        document.removeEventListener('click', this.onClick);
    },

    onClick(e) {
        this.onDocumentClick(e);
    }, 

    onDocumentClick(e) {
        const BASE_NODE = ReactDOM.findDOMNode(this);
        if(e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
            if (this.onBaseDomClick) this.onBaseDomClick(e);
        } else {
            if (this.onOtherDomClick) this.onOtherDomClick(e);
        }
        e.stopPropagation();
    }
}

export default DocumentClickMixin;