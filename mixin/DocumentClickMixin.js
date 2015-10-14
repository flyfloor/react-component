const DocumentClickMixin = {
    componentDidMount() {
        document.addEventListener('click', this.onDocumentClick);
    },
    
    componentWillUnmount() {
        document.removeEventListener('click', this.onDocumentClick);
    },

    onDocumentClick(e){
        if(typeof this.handleOtherClick === 'function') this.handleOtherClick(e);
    }, 
}

export default DocumentClickMixin;