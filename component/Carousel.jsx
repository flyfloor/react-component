import css from '../css/carousel.less';
import React from 'react';
import Item from './Item.jsx';
import DataAccessor from '../util/DataAccessor';

const Carousel = React.createClass({

    getInitialState() {
        return {
            index: 0,
        };
    },

    getDefaultProps() {
        return {
            showArrow: true
        };
    },

    makeCarouselItem(content){
        const NODES = content.props.children;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return <Item key={index} selected={ this.state.index === index } itemIndex={index}>{node.props.children}</Item>;
            })
        }
        return itemNodes;
    },

    handleSlide(e){
        const DOT_INDEX = DataAccessor.getData(e.target, 'index');
        console.log(DOT_INDEX)
    },

    render() {
        let arrowNode = this.props.showArrow ? <div className="_arrow">
                                                    <a href="javascript:;">&larr;</a>
                                                    <a href="javascript:;">&rarr;</a>
                                                </div> : null;
        let contentNodes = this.makeCarouselItem(this.props.items);
        let dotNodes = [];
        for(let i = 0; i < contentNodes.length; i++){
            dotNodes.push(<a href="javascript:;" key={i} data-index={i} className={this.state.index === i ? 'active _item' : '_item'} onClick={this.handleSlide}>&middot;</a>)
        }
        return (
            <div className="ui carousel">
                <div className="_content">{contentNodes}</div>
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