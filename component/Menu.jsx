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

    onOtherDomClick(e){
        this.closeMenu()
    },

    makeMenuItems(content){
        const NODES = content.props.children,
            INDEX = this.state.index;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return <Menu.Item key={index} selected={ index == INDEX } itemIndex={index} onItemClick={this.handleItemClick}>{node.props.children}</Menu.Item>;
            })
        }
        return itemNodes;
    },

    render() {
        let content = this.state.open ? <div className="_content">{this.makeMenuItems(this.props.items)}</div> : null;
        let triggerDOM = this.state.open && this.props.triggerOn ? this.props.triggerOn : this.props.children;
        let menuNode = this.props.triggerType === 'click' ? 
                        <span className='ui menu'>
                            <span className="_trigger" onClick={this.toggleOpen.bind(null, this)}>{triggerDOM}</span>
                            <div className="_wrap">
                                {content}
                            </div>
                        </span> :
                        <span className='ui menu' onMouseOver={this.openMenu.bind(null, this)} onMouseLeave={this.closeMenu.bind(null, this)}>
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

export default Menu;

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

