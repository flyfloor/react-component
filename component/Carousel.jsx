import React from 'react';
import ReactDOM from 'react-dom';
import css from '../css/carousel.less';
import Item from './Item.jsx';
import DataAccessor from '../util/DataAccessor';

const Carousel = React.createClass({
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
            showArrow: true
        };
    },

    componentDidMount() {
        const BASE = ReactDOM.findDOMNode(this);
        this.setState({
            baseWidth: BASE.offsetWidth,
        });
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
                if (_index === -1) _index = 0;
                if (_index === _len) _index = _len - 1;
                itemNodes.push(<Item key={i} selected={ this.state.index == i } style={{'width': this.state.baseWidth}} itemIndex={i}>{NODES[_index].props.children}</Item>);
            }
        }
        return itemNodes;
    },

    handleSlide(e){
        const DOT_INDEX = DataAccessor.getData(e.target, 'index');
        this.setState({
            index: DOT_INDEX
        });
    },

    render() {
        let arrowNode = this.props.showArrow ? <div className="_arrow">
                                                    <a href="javascript:;" className="_left">&larr;</a>
                                                    <a href="javascript:;" className="_right">&rarr;</a>
                                                </div> : null;
        let contentNodes = this.makeCarouselItem(this.props.items);
        let dotNodes = [];
        for(let i = 0; i < this.state.count; i++){
            dotNodes.push(<a href="javascript:;" key={i} data-index={i} className={this.state.index == i ? 'active _item' : '_item'} onClick={this.handleSlide}>&middot;</a>)
        }
        return (
            <div className="ui carousel">
                <div className="_content" ref='contentDOM' style={{'width': this.state.baseWidth * (this.state.count + 2)}}>{contentNodes}</div>
                <div className="_dot">
                    {dotNodes}
                </div>
                {arrowNode}
            </div>
        );
    }
});

export default Carousel;

Carousel.Item = Item;