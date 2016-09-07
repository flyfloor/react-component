const React = require('react');
const ReactDOM = require('react-dom');
const IntervalMixin = require('./mixin/IntervalMixin');
const klassName = require('./util/className');

const Carousel = React.createClass({
    mixins: [IntervalMixin],

    propTypes: {
        children: React.PropTypes.node,
        autoPlay: React.PropTypes.bool,
        delay: React.PropTypes.number,
        showArrow: React.PropTypes.bool,
        showDot: React.PropTypes.bool,
        prev: React.PropTypes.element,
        next: React.PropTypes.element,
        className:  React.PropTypes.string,
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
            showDot: true,
            autoPlay: false,
            delay: 3000,
            prev: <span>prev</span>,
            next: <span>next</span>,
        };
    },

    componentDidMount() {
        const base = ReactDOM.findDOMNode(this);
        this.setState({
            baseWidth: base.offsetWidth
        });
        this.resetAutoplay();
    },

    handleAutoPlay(){
        const {index, count} = this.state;
        if (index < count) {
            this.setState({
                index: index + 1 
            }, () => this.addTransition(this.resetPosition) );
        } 
    },

    resetAutoplay(){
        const {autoPlay, delay} = this.props;
        if (autoPlay) {
            this.clearInterval();
            this.setInterval(this.handleAutoPlay, delay);
        }
    },

    componentWillMount() {
        const {children} = this.props;
        if (children) {
            this.setState({
                count: children.length
            });
        }
    },

    makeCarouselItem(children){
        const {baseWidth, index} = this.state;
        let itemNodes = [];

        let _len = React.Children.count(children);

        for(let i = -1; i <= _len; i++){
            let _index = i;
            let active = index === i ? '_active': '';
            if (_index === -1) _index = _len - 1;
            if (_index === _len) _index = 0;

            itemNodes.push(<div key={`carousel-item-${i}`} 
                                style={{'width': baseWidth}} 
                                className={`_item ${active}`}>
                                    {children[_index]}
                            </div>);
        }
        return itemNodes;
    },

    handleSlide(index){
        this.resetAutoplay();
        this.setState({
            index: parseInt(index)
        }, () => this.addTransition() );
    },

    handleNext(){
        this.resetAutoplay();
        const {index} = this.state;
        if (index >= 0) {
            this.setState({
                index: index - 1 
            }, () => this.addTransition(this.resetPosition) );
        }
    },

    handlePrev(){
        this.resetAutoplay();
        const {index, count} = this.state;
        if (index < count) {
            this.setState({
                index: index + 1 
            }, () => this.addTransition(this.resetPosition) );
        }
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
        }, 500);
    },

    render() {
        const {prev, next, showArrow, showDot, children} = this.props;
        const {baseWidth, count, index} = this.state;

        let arrowNode = null;

        if (showArrow) {
            arrowNode = <div className="_arrow">
                            <div className="_prev" onClick={this.handlePrev}>
                                {prev}
                            </div>
                            <div className="_next" onClick={this.handleNext}>
                                {next}
                            </div>
                        </div>;
        }
        
        const contentNodes = this.makeCarouselItem(children);
        let dotNodes = [];

        if (showDot) {
            for(let i = 0; i < count; i++){
                dotNodes.push(<a href="javascript:;" key={i} 
                                className={index == i ? '_active _item' : '_item'} 
                                onClick={() => this.handleSlide(i)}>
                                    &middot;
                            </a>);
            }
            dotNodes = <div className="_dot">
                            {dotNodes}
                        </div>;
        }
        
        const contentCss = {
            width: baseWidth * (count + 2),
            transform: `translate3d(-${baseWidth * (index + 1)}px, 0, 0)`,
        }
        
        return (
            <div className={klassName(this.props.className, 'carousel')}>
                <div className="_content" ref='contentDOM' style={contentCss}>{contentNodes}</div>
                {dotNodes}
                {arrowNode}
            </div>
        );
    }
});

module.exports = Carousel;