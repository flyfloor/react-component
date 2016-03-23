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
        const {onSelect} = this.props;
        if (onSelect) onSelect(index);
        this.setState({
            index: index, 
        });
    },

    makeTabItems(children){
        const {index} = this.state;
        let active;
        return React.Children.map(children, (node, i) => {
            active = i == index ? '_active': '';
            return <div className={`_item ${active}`} onClick={() => this.handleItemClick(i)}>
                        {node}
                    </div>;
        })
    },

    render() {
        const {children, style, position} = this.props;
        return (
            <div className={`ui tab ${position}`} style={style}>
                {this.makeTabItems(children)}
            </div>
        );
    }
});

module.exports = Tab;