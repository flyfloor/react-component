const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');

const Menu = React.createClass ({
    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func,
    },

    getInitialState: function() {
        return {
            open: false,
            index: this.props.selectedIndex,
        };
    },

    toggleOpen(){
        this.setState({
            open: !this.state.open 
        });
    },

    openMenu(){
        this.setState({
            open: true, 
        });
    },

    closeMenu(){
        this.setState({
            open: false, 
        });
    },

    handleItemClick(index){
        if (this.props.onSelect) this.props.onSelect(index);
        this.setState({
            open: false,
            index: index, 
        });
    },

    onOtherDomClick(e){
        this.closeMenu()
    },

    makeMenuItems(content){
        const NODES = content.props.children,
            INDEX = this.state.index;
        let active = '';
        
        let itemNodes = React.Children.map(NODES, (node, index) => {
            active = index == INDEX ? '_active': '';
            return <div className={`_item ${active}`} onClick={() => this.handleItemClick(index)}>
                        {node}
                    </div>
        })

        return itemNodes;
    },

    render() {
        let content = this.state.open ? <div className="_content">{this.makeMenuItems(this.props.items)}</div> : null;
        let triggerDOM = this.state.open && this.props.triggerOn ? this.props.triggerOn : this.props.children;
        let menuNode = this.props.triggerType === 'click' ? 
                        <span className='ui menu' style={this.props.style}>
                            <span className="_trigger" onClick={this.toggleOpen}>{triggerDOM}</span>
                            <div className="_wrap">
                                {content}
                            </div>
                        </span> :
                        <span className='ui menu' style={this.props.style} onMouseOver={this.openMenu} onMouseLeave={this.closeMenu}>
                            <span className="_trigger">{triggerDOM}</span>
                            <div className="_wrap">
                                {content}
                            </div>
                        </span>;

        return (
            menuNode
        );
    }
});

module.exports = Menu;
