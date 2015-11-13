import css from '../css/carousel.less';
import React from 'react';
import Item from './Item.jsx';

const Carousel = React.createClass({

    getInitialState() {
        return {
            index:this.props.index 
        };
    },

    getDefaultProps() {
        return {
            index: 0,
            showArrow: true
        };
    },

    makeCarouselItem(content){
        const NODES = content.props.children,
            INDEX = this.state.index;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return <Item key={index} selected={ index == INDEX } itemIndex={index}>{node.props.children}</Item>;
            })
        }
        return itemNodes;
    },

    render() {
        return (
            <div className="ui carousel">
                <div className="_content">{this.makeCarouselItem(this.props.items)}</div>
                <div className="_dot"></div>
                <div className="_arrow"></div>
            </div>
        );
    }
});

export default Carousel;

Carousel.Item = Item;