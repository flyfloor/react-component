import css from "../css/menu.less";

import DocumentClickMixin from '../mixin/DocumentClickMixin';

const Menu = React.createClass ({
    mixins: [DocumentClickMixin],

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
        if (typeof this.props.onSelect === 'function') this.props.onSelect(index);
        this.setState({
            open: false,
            index: index, 
        });
    },

    onOtherClick(e){
        this.closeMenu()
    },

    makeMenuItems(content){
        const NODES = content.props.children,
            INDEX = this.state.index;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return <Menu.Item key={index} selected={index == INDEX} itemIndex={index} onItemClick={this.handleItemClick.bind(this)}>{node.props.children}</Menu.Item>;
            }.bind(this))
        }
        return itemNodes;
    },

    render() {
        let content = this.state.open ? <div className="_content">{this.makeMenuItems(this.props.items)}</div> : null;
        let trigger = this.state.open && this.props.triggerOn ? this.props.triggerOn : this.props.children;
        let menuNode = this.props.triggerType === 'click' ? 
                        <div className='ui menu'>
                            <Menu.Trigger onClick={this.toggleOpen.bind(this)}>{trigger}</Menu.Trigger>
                            {content}
                        </div> :
                        <div className='ui menu' onMouseOver={this.openMenu.bind(this)} onMouseLeave={this.closeMenu.bind(this)}>
                            <Menu.Trigger>{trigger}</Menu.Trigger>
                            {content}
                        </div>;

        return (
            menuNode
        );
    }
});

module.exports = Menu;

Menu.Trigger = React.createClass({
    handleTriggerClick(e){
        if (typeof this.props.onClick === 'function') this.props.onClick(e);
    },
    render() {
        return (
            <div className='_trigger' onClick={this.handleTriggerClick}>
                {this.props.children}
            </div>
        );
    }
});

Menu.Item = React.createClass({
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

