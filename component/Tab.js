const React = require('react');
const css = require('./css/tab.less');
const Item = require('./Item');

const Tab = React.createClass({
    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
        onSelect: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            selectedIndex: 0,
            position: 'bottom',
        };
    },
    getInitialState() {
        return {
            index: this.props.selectedIndex,
        };
    },
    handleItemClick(index){
        if (this.props.onSelect) this.props.onSelect(index);
        this.setState({
            index: index, 
        });
    },

    makeTabItems(content){
        const NODES = content.props.children,
            INDEX = this.state.index;
        let itemNodes = [];
        if (NODES instanceof Array) {
            itemNodes = NODES.map((node, index) => {
                return <Item key={index} selected={ index == INDEX } itemIndex={index} onItemClick={this.handleItemClick}>{node.props.children}</Item>;
            })
        }
        return itemNodes;
    },

    render() {
        let content = this.makeTabItems(this.props.items);
        return (
            <div className={'ui tab ' + this.props.position} style={this.props.style}>
                {content}
            </div>
        );
    }
});

Tab.Item = Item;

module.exports = Tab;
