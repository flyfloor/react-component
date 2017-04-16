module.exports = Cmp => {
    return class ScrollCmp extends Cmp {
        constructor(props) {
            super(props);
            this.onScroll = this.onScroll.bind(this)
        }
        componentDidMount() {
            document.addEventListener('scroll', this.onScroll);
            if (super.componentDidMount) {
                super.componentDidMount()
            }
        }

        componentWillUnmount() {
            document.removeEventListener('scroll', this.onScroll);
            if (super.componentWillUnmount) {
                super.componentWillUnmount()
            }
        }

        windowScrollOffset(){
            const doc = document.documentElement;
            let left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
            return {
                _left: left,
                _top: top,
            };
        }
    }
}
