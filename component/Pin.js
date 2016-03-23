const React = require('react');
const ReactDOM = require('react-dom');
const ScrollMixin = require('./mixin/ScrollMixin');

const Pin = React.createClass({
    mixins: [ScrollMixin],

    propTypes: {
        top: React.PropTypes.number,
    },

    getInitialState() {
        return {
            fixed: false,
            baseTop: 0, 
        };
    },

    componentDidMount() {
        this.setState({
            baseTop: this.node2Top(),
        });
    },

    node2Top(){
        const pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
        return pinNode.offsetTop;
    },

    getDefaultProps() {
        return {
            top: 0,
        };
    },

    onScroll(e){
        const {_top} = this.windowScrollOffset();
        this.setState({
            fixed: _top >= this.state.baseTop
        });
    },

    render() {
        const {fixed} = this.state;
        const {top, children, className} = this.props;
        let stat = fixed ? 'fixed': '';
        return (
            <div className={`ui pin ${stat} ${className}`} style={{'top': top}} ref='pinNode'>
                {children}
            </div>
        );
    }
});

module.exports = Pin;