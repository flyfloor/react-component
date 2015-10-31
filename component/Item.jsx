const Item = React.createClass({
    handleClick(e){
        this.props.onItemClick(this.props.itemIndex);
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