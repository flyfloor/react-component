const Tooltip = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

export default Tooltip;