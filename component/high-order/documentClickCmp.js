const ReactDOM = require('react-dom')

module.exports = Cmp => {
    return class DocumentClickCmp extends Cmp {
        constructor(props) {
            super(props)
            this.onClick = this.onClick.bind(this)
            this.onDocumentClick = this.onDocumentClick.bind(this)
        }

        componentDidMount() {
            document.addEventListener('click', this.onClick);
            if (super.componentDidMount) {
                super.componentDidMount()
            }
        }
        
        componentWillUnmount() {
            document.removeEventListener('click', this.onClick);
            if (super.componentWillUnmount) {
                super.componentWillUnmount()
            }
        }

        onClick(e) {
            this.onDocumentClick(e);
        }

        onDocumentClick(e) {
            const BASE_NODE = ReactDOM.findDOMNode(this);
            if(e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
                if (this.onBaseDomClick) this.onBaseDomClick(e);
            } else {
                if (document.body.contains(e.target) && this.onOtherDomClick) this.onOtherDomClick(e);
            }
            e.stopPropagation();
        }
    }
}