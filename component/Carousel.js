const React = require('react');
const ReactDOM = require('react-dom');
const Item = require('./Item.js');
const IntervalMixin = require('./mixin/IntervalMixin');
const Data = require('./util/Data');

const Carousel = React.createClass({
    mixins: [IntervalMixin],

    propTypes: {
        items: React.PropTypes.element.isRequired,
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
        this.setState({
            baseWidth: BASE.offsetWidth,
        });
        if (this.props.autoPlay) this.setInterval(this.handleAutoPlay, this.props.delay);
    },

    handleAutoPlay(){
        if (this.state.index < this.state.count) {
            this.setState({
                index: this.state.index + 1 
            }, () => {
                this.addTransition(this.resetPosition);
            });
            
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
        let itemNodes = [], nodeItem;
        if (NODES instanceof Array) {
            let _len = NODES.length;
            for(let i = -1; i <= _len; i++){
                let _index = i;
                if (_index === -1) _index = _len - 1;
                if (_index === _len) _index = 0;
                itemNodes.push(<Item key={i} selected={ this.state.index == _index } style={{'width': this.state.baseWidth}} itemIndex={i}>{NODES[_index].props.children}</Item>);
            }
        }
        return itemNodes;
    },

    handleSlide(e){
        const DOT_INDEX = Data.getData(e.target, 'index');
        this.setState({
            index: parseInt(DOT_INDEX)
        }, () => {
            this.addTransition();
        });
    },

    handleRightArrow(){
        if (this.state.index >= 0) {
            this.setState({
                index: this.state.index - 1 
            }, () => {
                this.addTransition(this.resetPosition);
            });
        };
    },

    handleLeftArrow(){
        if (this.state.index < this.state.count) {
            this.setState({
                index: this.state.index + 1 
            }, () => {
                this.addTransition(this.resetPosition);
            });
        };
    },

    resetPosition(){
        if (this.state.index === -1) {
            this.setState({
                index: this.state.count - 1 
            })
        }
        if (this.state.index === this.state.count) {
            this.setState({
                index: 0 
            });
        };
    },

    addTransition(callback){
        let contentDOM  = ReactDOM.findDOMNode(this.refs.contentDOM);
        contentDOM.className += ' _slide';
        setTimeout(() => {
            contentDOM.className = '_content';
            if (callback) callback();
        }, 500)
    },

    render() {
        let arrowNode = this.props.showArrow ? <div className="_arrow">
                                                    <a href="javascript:;" onClick={this.handleLeftArrow} className="_left">&larr;</a>
                                                    <a href="javascript:;" onClick={this.handleRightArrow} className="_right">&rarr;</a>
                                                </div> : null;
        let contentNodes = this.makeCarouselItem(this.props.items);
        let dotNodes = [];
        for(let i = 0; i < this.state.count; i++){
            dotNodes.push(<a href="javascript:;" key={i} data-index={i} className={this.state.index == i ? 'active _item' : '_item'} onClick={this.handleSlide}>&middot;</a>)
        }
        
        let contentCss = {
            width: this.state.baseWidth * (this.state.count + 2),
            transform: `translate(-${this.state.baseWidth * (this.state.index + 1)}px, 0)`,
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

Carousel.Item = Item;

module.exports = Carousel;