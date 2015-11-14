import React from 'react';
import Radio from './Radio.jsx';

export default class RadioGroup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            options: props.options || [],
            value: props.value,
        }
    }

    toggleChange(e, storeValue){
        this.setState({
            value: storeValue, 
        }, () => {
            if (this.props.onChange) this.props.onChange(this.state.value);
        });
    }

    componentDidMount() {
        if (this.props.defaultChecked && !this.state.value && this.state.options.length > 0){
            this.setState({
                value: this.state.options[0][this.props.valueName] 
            });
        };
    }

    render() {
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], itemChecked, itemNode;

        for (let item of this.state.options){
            itemChecked = item[valueName] === this.state.value;
            itemNode = <Radio key={item[valueName]} storeValue={item[valueName]} checked={itemChecked} onChange={this.toggleChange.bind(this)}>{item[labelName]}</Radio>;
            optionNodes.push(itemNode);
        }

        return (
            <div style={this.props.style} className={this.props.className}>
                {optionNodes}
            </div>
        );
    }
}

RadioGroup.propTypes = {
    options: React.PropTypes.array,
    value: React.PropTypes.string,
    labelName: React.PropTypes.string,
    valueName: React.PropTypes.string,
    onChange: React.PropTypes.func,
}
