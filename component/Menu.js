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
        const {onSelect} = this.props;
        if (onSelect) onSelect(index);
        this.setState({
            open: false,
            index: index, 
        });
    },

    onOtherDomClick(e){
        this.closeMenu()
    },

    makeMenuItems(content){
        const NODES = content.props.children;
        const {index} = this.state;
        let active = '';
        
        let itemNodes = React.Children.map(NODES, (node, i) => {
            active = i == index ? '_active': '';
            return <div className={`_item ${active}`} onClick={() => this.handleItemClick(i)}>
                        {node}
                    </div>;
        })

        return itemNodes;
    },

    render() {
        const {open} = this.state;
        const {items, triggerOn, children, triggerType, style} = this.props;
        let content = open ? 
            <div className="_content">
                {this.makeMenuItems(items)}
            </div> 
            : null;
        let triggerDOM = open && triggerOn ? 
            triggerOn 
            : children;
        let menuNode = triggerType === 'click' ? 
                        <span className='ui menu' style={style}>
                            <span className="_trigger" onClick={this.toggleOpen}>{triggerDOM}</span>
                            <div className="_wrap">
                                {content}
                            </div>
                        </span> :
                        <span className='ui menu' style={style} onMouseOver={this.openMenu} onMouseLeave={this.closeMenu}>
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
