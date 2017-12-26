const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const CheckBox = require('./CheckBox')
const klassName = require('./util/className')
const defaultCheckedCmp = require('./high-order/defaultCheckedCmp')

class CheckBoxGroup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.addVal = this.addVal.bind(this)
        this.removeVal = this.removeVal.bind(this)
        this.valueChange = this.valueChange.bind(this)

        const { value } = props;
        this.state = {
            value
        }
    }

    componentDidMount() {
        let {value} = this.state
        let {defaultChecked} = this.props
        if (value.length === 0 && defaultChecked) {
            this.initDefaultCheckedValue({ multi: true })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { defaultChecked } = this.props
        this.optionsChangeReInitValue({
            nextProps,
            defaultChecked,
            multi: true
        })
    }

    handleChange(e, val){
        e.target.checked ? this.addVal(val) : this.removeVal(val);
    }

    addVal(val){
        let flag = false;
        const {value} = this.state;
        for (let i = 0; i < value.length; i++) {
            if (val === value[i]){
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.setState({
                value: value.concat(val) 
            }, this.valueChange);
        }
    }

    removeVal(val){
        let index = this.state.value.indexOf(val);
        if (index > -1) {
            this.state.value.splice(index, 1);
            this.setState({
                value: this.state.value 
            }, this.valueChange);
        }
    }

    valueChange(){
        this.props.onChange(this.state.value)
    }

    render() {
        const { labelName, valueName, className, options, style, children } = this.props;
        const { value } = this.state;
        let optionNodes = [];

        if (children) {
            optionNodes = React.Children.map(children, (node, i) => {
                let checked = value.indexOf(node.props.value) > -1;
                return <CheckBox key={i} {...node.props} checked={checked} onChange={this.handleChange} />;
            })
        } else {
            let itemNode = null;
            for (let i = 0; i < options.length; i++) {
                let itemChecked = false;
                let item = options[i];
                for (let j = 0; j < value.length; j++) {
                    if (value[j] === item[valueName]){
                        itemChecked = true;
                        break;
                    }
                }
                itemNode = <CheckBox key={item[valueName]} value={item[valueName]} disabled={item.disabled}
                                checked={itemChecked} onChange={this.handleChange}>
                                    {item[labelName]}
                            </CheckBox>;
                optionNodes.push(itemNode);
            }
        }

        return (
            <div style={style} className={klassName(className, 'checkbox-group')}>
                {optionNodes}
            </div>
        );
    }
}

CheckBoxGroup.defaultProps = {
    value: [],
    labelName: 'name',
    valueName: 'value',
    options: [], 
}

CheckBoxGroup.propTypes = {
    options: PropTypes.array,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.bool,
}

module.exports = defaultCheckedCmp(CheckBoxGroup)