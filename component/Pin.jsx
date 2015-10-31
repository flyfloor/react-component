import css from '../css/pin.less';

import ScrollMixin from '../mixin/ScrollMixin';

const Pin = React.createClass({
    mixins: [ScrollMixin],
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
        let pinNode = ReactDOM.findDOMNode(this.refs.pinNode);
        return pinNode.offsetTop;
    },

    getDefaultProps() {
        return {
            top: 0,
        };
    },

    onScroll(e){
        let {_top} = this.windowScrollOffset();
        this.setState({
            fixed: _top >= this.state.baseTop
        });
    },

    render() {
        let stat = this.state.fixed ? 'fixed': '';
        return (
            <div className={'ui pin ' + stat} style={{'top': this.props.top}} ref='pinNode'>
                {this.props.children}
            </div>
        );
    }
});

export default Pin;