import React from 'react';

const Item = React.createClass({
    propTypes: {
        onItemClick: React.PropTypes.func,
    },

    handleClick(e){
        if(this.props.onItemClick) this.props.onItemClick(this.props.itemIndex);
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