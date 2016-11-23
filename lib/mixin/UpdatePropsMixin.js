"use strict";

var UpdatePropsMixin = {
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // value change
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }
};

module.exports = UpdatePropsMixin;