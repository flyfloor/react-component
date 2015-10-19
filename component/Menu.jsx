export default class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            index: this.props.selectedIndex,
        }
    }

    toggleOpen(){
        this.setState({
            open: !this.state.open 
        });
    }

    openMenu(){
        this.setState({
            open: true, 
        });
    }

    closeMenu(){
        this.setState({
            open: false, 
        });
    }

    handleMouseOver(e){
        this.openMenu();
    }

    handleMouseLeave(e){
        this.closeMenu();
    }

    handleItemClick(index){
        if (typeof this.props.onSelect === 'function') this.props.onSelect(index);
        this.setState({
            open: false,
            index: index, 
        });
    }

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
    }

    render() {
        let content = this.state.open ? <div ref='menuContent' className="content">{this.makeMenuItems(this.props.items)}</div> : null;
        let trigger = this.state.open && this.props.triggerOn ? this.props.triggerOn : this.props.children;
        let menuNode = this.props.triggerType === 'click' ? 
                        <div>
                            <Menu.Trigger onClick={this.toggleOpen.bind(this)}>{trigger}</Menu.Trigger>
                            {content}
                        </div> :
                        <div onMouseOver={this.handleMouseOver.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                            <Menu.Trigger onClick={this.toggleOpen.bind(this)}>{trigger}</Menu.Trigger>
                            {content}
                        </div>;

        return (
            menuNode
        );
    }
}

Menu.Trigger = React.createClass({
    handleTriggerClick(e){
        this.props.onClick(e);
    },
    render() {
        return (
            <div onClick={this.handleTriggerClick}>
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
        return (
            <div onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
    }
});

