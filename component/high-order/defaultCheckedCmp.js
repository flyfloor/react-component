module.exports = Cmp => {
    return class DefaultCheckedCmp extends Cmp {
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

        initDefaultValue({ multi, props} = { multi: false }){
            let {valueName, options, onChange, children} = props || this.props
            let initVal = multi ? [] : ''
            if (options && options.length > 0) {
                initVal = options[0][valueName] 
            }
            if (children && children.length > 0) {
                initVal = children[0].props[valueName]
            }
            this.setState({
                value: multi ? [initVal] : initVal,
            }, () => onChange(this.state.value));
        }
    }
}