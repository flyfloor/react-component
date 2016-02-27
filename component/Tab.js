const React = require('react');

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
        let itemNodes = React.Children.map(NODES, (node, index) => {
            let active = index == INDEX ? '_active': '';
            return <div className={`_item ${active}`} onClick={() => this.handleItemClick(index)}>
                        {node}
                    </div>
        })
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

module.exports = Tab;