module.exports = Cmp => {
    return class DefaultCheckedCmp extends Cmp {
        constructor(props) {
            super(props)
        }

        componentWillReceiveProps(nextProps) {
            if (super.componentWillReceiveProps) {
                super.componentWillReceiveProps(nextProps)
            }

            if (this.props.value !== nextProps.value && ['', [], undefined, null].indexOf(nextProps.value) === -1) {
                this.setState({
                    value: nextProps.value
                }, () => this.props.onChange(this.state.value));
            }
        }

        optionsChangeReInitValue({
            defaultChecked,
            multi,
            nextProps
        }) {
            const {
                value,
                valueName,
                onChange
            } = this.props

            if (nextProps.options !== this.props.options) {
                // re-init value if value exist, but not fit options value
                if (['', [], undefined, null].indexOf(value) === -1) {
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
                }

                if (defaultChecked) {
                    this.initDefaultCheckedValue({ 
                        multi, 
                        props: nextProps
                    })
                } else {
                    this.setState({
                        value: multi ? [] : ''
                    }, () => onChange(this.state.value));
                }
            }
        }

        initDefaultCheckedValue({ multi, props} = { multi: false }){
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