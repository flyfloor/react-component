const React = require('react');

const Tab = React.createClass({
    propTypes: {
        onSelect: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            className: '',
            selectedIndex: 0,
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
        const {children, style, className} = this.props;
        return (
            <div className={`ui tab ${className}`} style={style}>
                {this.makeTabItems(children)}
            </div>
        );
    }
});

module.exports = Tab;