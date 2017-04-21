module.exports = Cmp => {
    return class UpdatePropsCmp extends Cmp {
        constructor(props) {
            super(props)
        }

        componentWillReceiveProps(nextProps) {
            // value change
            if (this.props.value !== nextProps.value) {
                this.setState({
                    value: nextProps.value
                });
            }
            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps)
            }
        }
    }
}