import React from 'react';

const Item = React.createClass({
    handleClick(e){
        if(typeof this.props.onItemClick === 'function') this.props.onItemClick(this.props.itemIndex);
    },
    render() {
        let isActive = this.props.selected ? 'active' : '';
        return (
            <div className={'_item ' + isActive} onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
    }
});

export default Item;