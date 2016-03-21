const React = require('react');
const CheckBox = require('./CheckBox');

export const CheckBoxGroup = React.createClass({
    getInitialState() {
        return {
            value: this.props.value,
            options: this.props.options,
        };
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
    handleChange(e, storeValue){
        e.target.checked ? this.addVal(storeValue) : this.removeVal(storeValue);
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
        };
    },

    removeVal(val){
        let index = this.state.value.indexOf(val);
        if (index > -1) {
            this.state.value.splice(index, 1);
            this.setState({
                value: this.state.value 
            }, this.valueChange);
        };
    },

    valueChange(){
        if (this.props.onChange) this.props.onChange(this.state.value)
    },

    render() {
        const [labelName, valueName] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], itemNode, valArr;
        for (let item of this.state.options){
            let itemChecked = false;
            for (let val of this.state.value) {
                if(item[valueName] === val) {
                    itemChecked = true;
                    break;
                }
            }
            itemNode = <CheckBox key={item[valueName]} storeValue={item[valueName]} 
                            checked={itemChecked} onChange={this.handleChange}>{item[labelName]}</CheckBox>;
            optionNodes.push(itemNode);
        }

        return (
            <div style={this.props.style} className={this.props.className}>
                {optionNodes}
            </div>
        );
    }
});

module.exports = CheckBoxGroup;