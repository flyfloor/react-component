const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')

const Radio = require('./Radio')
const klassName = require('./util/className')
const updatePropsCmp = require('./high-order/updatePropsCmp')

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.toggleChange = this.toggleChange.bind(this)

        const { value } = props;
        this.state = {
            value
        }
    }

    toggleChange(e, value){
        this.setState({ value }, () => {
            const {onChange} = this.props
            if (onChange) onChange(this.state.value)
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.options !== this.props.options) {
            if (!this.props.defaultChecked) {
                this.setState({
                    value: ''
                });
            } else {
                this.handleDefaultChecked(nextProps)
            }
        }
    }

    componentDidMount() {
        let {value} = this.state
        let {defaultChecked} = this.props
        if (!value && defaultChecked) {
            this.handleDefaultChecked()
        }
    }

    handleDefaultChecked(nextProps){
        let {valueName, options, onChange, children} = nextProps || this.props
        if (options && options.length > 0) {
            this.setState({
                value: options[0][valueName],
            }, () => onChange(this.state.value));
        }
        if (children && children.length > 0) {
            this.setState({
                value: children[0].props[valueName],
            }, () => onChange(this.state.value));
        }
    }

    render() {
        let {labelName, valueName, options, className, style, children} = this.props;
        className = klassName(className, 'radio-group');
        const {value} = this.state;
        let optionNodes = [], itemChecked;

        if (children) {
            React.Children.map(children, (node, i) => {
                itemChecked = node.props.value === value;
                if ((value === null || value === undefined ) && node.props.checked) itemChecked = true;
                optionNodes.push(<Radio key={i} {...node.props} checked={itemChecked} onChange={this.toggleChange}>
                                </Radio>);
            })
        } else {
            for (let i = 0; i < options.length; i++) {
                let item = options[i];
                itemChecked = item[valueName] === value;
                optionNodes.push(<Radio key={item[valueName]} value={item[valueName]} disabled={item.disabled}
                                    checked={itemChecked} onChange={this.toggleChange}>
                                        {item[labelName]}
                                    </Radio>);
            }
        }


        return (
            <div style={style} className={className}>
                {optionNodes}
            </div>
        );
    }
}

RadioGroup.propTypes = {
    options: PropTypes.array,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.bool,
}

RadioGroup.defaultProps = {
    labelName: 'name',
    valueName: 'value',
}

module.exports = updatePropsCmp(RadioGroup);