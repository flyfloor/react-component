const React = require('react');
const CheckBox = require('./CheckBox');

export const CheckBoxGroup = React.createClass({
    getInitialState() {
        const {value, options} = this.props;
        return { value, options };
    },
    getDefaultProps() {
        return {
            value: [],
            labelName: 'name',
            valueName: 'value',
            options: [], 
        };
    },
    propTypes: {
        vaule: React.PropTypes.string,
        options: React.PropTypes.array,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        onChange: React.PropTypes.func,
    },

    handleChange(e, val){
        e.target.checked ? this.addVal(val) : this.removeVal(val);
    },

    addVal(val){
        let flag = false;
        for (let item of this.state.value){
            if (item === val) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.setState({
                value: this.state.value.concat(val) 
            }, this.valueChange);
        }
    },

    removeVal(val){
        let index = this.state.value.indexOf(val);
        if (index > -1) {
            this.state.value.splice(index, 1);
            this.setState({
                value: this.state.value 
            }, this.valueChange);
        }
    },

    valueChange(){
        const {onChange} = this.props;
        if (onChange) onChange(this.state.value)
    },

    render() {
        const {labelName, valueName, className, style, children} = this.props;
        const {options, value} = this.state;
        let optionNodes = [];

        if (children) {
            optionNodes = React.Children.map(children, (node, i) => {
                let checked = value.indexOf(node.props.value) > -1;
                return <CheckBox key={i} checked={checked} {...node.props} onChange={this.handleChange} />;
            })
        } else {
            let itemNode = null;
            for (let item of options){
                let itemChecked = false;
                for (let val of value) {
                    if(item[valueName] === val) {
                        itemChecked = true;
                        break;
                    }
                }
                itemNode = <CheckBox key={item[valueName]} value={item[valueName]} 
                                checked={itemChecked} onChange={this.handleChange}>
                                    {item[labelName]}
                            </CheckBox>;
                optionNodes.push(itemNode);
            }
        }


        return (
            <div style={style} className={className}>
                {optionNodes}
            </div>
        );
    }
});

module.exports = CheckBoxGroup;