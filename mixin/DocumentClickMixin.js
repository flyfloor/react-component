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
        const BASE_NODE = React.findDOMNode(this);
        if(e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
            if (typeof this.onBaseClick === 'function') this.onBaseDomClick(e);
        } else {
            if (typeof this.onOtherClick === 'function') this.onOtherDomClick(e);
        }
        e.stopPropagation();
    }
}

export default DocumentClickMixin;