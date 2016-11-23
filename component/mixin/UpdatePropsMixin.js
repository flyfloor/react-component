const UpdatePropsMixin = {
    componentWillReceiveProps: function(nextProps) {
        // value change
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    },
}

module.exports = UpdatePropsMixin;