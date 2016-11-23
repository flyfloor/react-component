const UpdatePropsMixin = {
    componentWillReceiveProps: function(nextProps) {
        // options change
        if (nextProps.options) {
            if (this.props.options !== nextProps.options) {
                this.setState({
                    options: nextProps.options
                });
            }
        } else {
            if (this.props.children !== nextProps.children) {
                this.setState({
                    children: nextProps.children
                });
            }
        }
        // value change
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    },
}

module.exports = UpdatePropsMixin;