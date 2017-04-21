const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const intervalCmp = require('./high-order/intervalCmp')
const klassName = require('./util/className')

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.handleAutoPlay = this.handleAutoPlay.bind(this)
        this.resetAutoplay = this.resetAutoplay.bind(this)
        this.makeCarouselItem = this.makeCarouselItem.bind(this)
        this.handleSlide = this.handleSlide.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.resetPosition = this.resetPosition.bind(this)
        this.addTransition = this.addTransition.bind(this)
        this.state = {
            index: 0,
            count: 0,
            baseWidth: 0,
        }
    }

    handleAutoPlay(){
        const {index, count} = this.state;
        if (index < count) {
            this.setState({
                index: index + 1 
            }, () => this.addTransition(this.resetPosition) );
        } 
    }

    resetAutoplay(){
        const {autoPlay, delay} = this.props;
        if (autoPlay) {
            this.clearInterval();
            this.setInterval(this.handleAutoPlay, delay);
        }
    }

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
    }

    componentWillMount() {
        const {children} = this.props;
        if (children) {
            this.setState({
                count: children.length
            });
        }
    }

    componentDidMount() {
        const base = ReactDOM.findDOMNode(this);
        this.setState({
            baseWidth: base.offsetWidth
        });
        this.resetAutoplay();
    }

    handleSlide(index){
        this.resetAutoplay();
        this.setState({
            index: parseInt(index)
        }, () => this.addTransition() );
    }

    handleNext(){
        this.resetAutoplay();
        const {index} = this.state;
        if (index >= 0) {
            this.setState({
                index: index - 1 
            }, () => this.addTransition(this.resetPosition) );
        }
    }

    handlePrev(){
        this.resetAutoplay();
        const {index, count} = this.state;
        if (index < count) {
            this.setState({
                index: index + 1 
            }, () => this.addTransition(this.resetPosition) );
        }
    }

    resetPosition(){
        const {index, count} = this.state;
        if (index === -1) this.setState({ index: count - 1 });

        if (index === count)  this.setState({ index: 0 });
    }

    addTransition(callback){
        let contentDOM  = ReactDOM.findDOMNode(this.refs.contentDOM);
        contentDOM.className += ' _slide';
        setTimeout(() => {
            contentDOM.className = '_content';
            if (callback) callback.call(this, null);
        }, 500);
    }

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
}

Carousel.propTypes = {
    children: PropTypes.node,
    autoPlay: PropTypes.bool,
    delay: PropTypes.number,
    showArrow: PropTypes.bool,
    showDot: PropTypes.bool,
    prev: PropTypes.element,
    next: PropTypes.element,
    className:  PropTypes.string,
}

Carousel.defaultProps = {
    showArrow: false,
    showDot: true,
    autoPlay: false,
    delay: 3000,
    prev: <span>prev</span>,
    next: <span>next</span>,
}

module.exports = intervalCmp(Carousel);