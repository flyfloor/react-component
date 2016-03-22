const React = require('react');
const ReactDOM = require('react-dom');
const IntervalMixin = require('./mixin/IntervalMixin');

const Carousel = React.createClass({
    mixins: [IntervalMixin],

    propTypes: {
        items: React.PropTypes.element.isRequired,
        autoPlay: React.PropTypes.bool,
        delay: React.PropTypes.number,
        showArrow: React.PropTypes.bool,
    },

    getInitialState() {
        return {
            index: 0,
            count: 0,
            baseWidth: 0,
        };
    },

    getDefaultProps() {
        return {
            showArrow: false,
            autoPlay: false,
            delay: 3000,
        };
    },

    componentDidMount() {
        const BASE = ReactDOM.findDOMNode(this);
        const {autoPlay, delay} = this.props;
        this.setState({
            baseWidth: BASE.offsetWidth,
        });
        if (autoPlay) this.setInterval(this.handleAutoPlay, delay);
    },

    handleAutoPlay(){
        const {index, count} = this.state;
        if (index < count) {
            this.setState({
                index: index + 1 
            }, () => this.addTransition(this.resetPosition) );
        } 
    },

    componentWillMount() {
        let _child = this.props.items.props.children;
        if (_child) {
            this.setState({
                count: _child.length
            });
        }
    },

    makeCarouselItem(content){
        const NODES = content.props.children;
        const {baseWidth, index} = this.state;
        let itemNodes = [];

        let _len = React.Children.count(NODES);

        for(let i = -1; i <= _len; i++){
            let _index = i;
            let active = index === i ? '_active': '';
            if (_index === -1) _index = _len - 1;
            if (_index === _len) _index = 0;

            itemNodes.push(<div key={`carousel-item-${i}`} 
                                style={{'width': baseWidth}} 
                                className={`_item ${active}`}>
                                    {NODES[_index]}
                            </div>);
        }
        return itemNodes;
    },

    handleSlide(index){
        this.setState({
            index: parseInt(index)
        }, () => this.addTransition() );
    },

    handleRightArrow(){
        const {index} = this.state;
        if (index >= 0) {
            this.setState({
                index: index - 1 
            }, () => this.addTransition(this.resetPosition) );
        };
    },

    handleLeftArrow(){
        const {index, count} = this.state;
        if (index < count) {
            this.setState({
                index: index + 1 
            }, () => this.addTransition(this.resetPosition) );
        };
    },

    resetPosition(){
        const {index, count} = this.state;
        if (index === -1) this.setState({ index: count - 1 });

        if (index === count)  this.setState({ index: 0 });
    },

    addTransition(callback){
        let contentDOM  = ReactDOM.findDOMNode(this.refs.contentDOM);
        contentDOM.className += ' _slide';
        setTimeout(() => {
            contentDOM.className = '_content';
            if (callback) callback.call(this, null);
        }, 500)
    },

    render() {
        const {leftArrow, rightArrow, showArrow} = this.props;
        const {baseWidth, count, index} = this.state;
        
        let arrowNode = showArrow ? 
                <div className="_arrow">
                    <a href="javascript:;" onClick={this.handleLeftArrow} className="_left">{leftArrow ? leftArrow :  '←'}</a>
                    <a href="javascript:;" onClick={this.handleRightArrow} className="_right">{rightArrow ? rightArrow : '→'}</a>
                </div> : null;

        const contentNodes = this.makeCarouselItem(this.props.items);
        let dotNodes = [];

        for(let i = 0; i < count; i++){
            dotNodes.push(<a href="javascript:;" key={i} 
                            className={index == i ? '_active _item' : '_item'} onClick={() => this.handleSlide(i)}>
                                &middot;
                        </a>);
        }
        
        const contentCss = {
            width: baseWidth * (count + 2),
            transform: `translate(-${baseWidth * (index + 1)}px, 0)`,
        }
        return (
            <div className='ui carousel'>
                <div className="_content" ref='contentDOM' style={contentCss}>{contentNodes}</div>
                <div className="_dot">
                    {dotNodes}
                </div>
                {arrowNode}
            </div>
        );
    }
});

module.exports = Carousel;