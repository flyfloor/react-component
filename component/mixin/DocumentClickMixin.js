const ReactDOM = require('react-dom');

const DocumentClickMixin = {
    
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
            if (document.contains(e.target) && this.onOtherDomClick) this.onOtherDomClick(e);
        }
        e.stopPropagation();
    }
};

module.exports = DocumentClickMixin;