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
            if (typeof this.onBaseDomClick === 'function') this.onBaseDomClick(e);
        } else {
            if (typeof this.onOtherDomClick === 'function') this.onOtherDomClick(e);
        }
        e.stopPropagation();
    }
}

export default DocumentClickMixin;