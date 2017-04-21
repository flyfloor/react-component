const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const scrollCmp = require('./high-order/scrollCmp')
const klassName = require('./util/className')

class Pin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixed: false,
            baseTop: 0, 
        }
    }

    componentDidMount() {
        this.setState({
            baseTop: this.node2Top(),
        });
    }

    node2Top(){
        const {begin} = this.props;
        if (begin) return begin;
        const pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
        return pinNode.offsetTop;
    }

    onScroll(){
        const {_top} = this.windowScrollOffset();
        this.setState({
            fixed: _top >= this.state.baseTop
        });
    }

    render() {
        const {fixed} = this.state;
        let {top, children, className} = this.props;
        className = klassName(className, 'pin');
        let stat = fixed ? 'fixed': '';
        return (
            <div className={`${className} ${stat}`} style={{'top': top}} ref='pinNode'>
                {children}
            </div>
        );
    }
}

Pin.propTypes = {
    top: PropTypes.number,
    begin: PropTypes.number,
}

Pin.defaultProps = {
    top: 0,
    className: '',
}

module.exports = scrollCmp(Pin);