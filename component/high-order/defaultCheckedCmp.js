module.exports = Cmp => {
    return class DefaultCheckedCmp extends Cmp {
        constructor(props) {
            super(props)
        }

        componentWillReceiveProps(nextProps) {
            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps)
            }

            // value change
            if (this.props.value !== nextProps.value) {
                this.setState({
                    value: nextProps.value
                }, () => this.props.onChange(this.state.value));
            }
        }

        optionsChangeReInitValue ({ defaultChecked, multi, nextProps } = { defaultChecked: false, multi: false }) {
            const {
                value,
                valueName,
            } = this.props

            if (nextProps.options !== this.props.options) {
                if (defaultChecked && (['', [], undefined, null].indexOf(value) !== -1)) {
                    this.initDefaultValue({ 
                        multi, 
                        props: nextProps
                    })
                    return
                }

                // re-init value
                const newOptions = nextProps.options
                for (let i = 0; i < newOptions.length; i++) {
                    if (multi) {
                        if (value.indexOf(newOptions[i][valueName]) !== -1) {
                            return
                        }
                    } else {
                        if (newOptions[i][valueName] === value) {
                            return
                        }
                    }
                }

                this.setState({
                    value: multi ? [] : ''
                }, () => this.props.onChange(this.state.value));
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