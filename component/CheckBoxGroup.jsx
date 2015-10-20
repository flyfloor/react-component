import CheckBox from './CheckBox.jsx';

export default class CheckBoxGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: props.value || [],
            options: props.options || [],
        }
    }

    handleChange(e, storeValue){
        e.target.checked ? this.addVal(storeValue) : this.removeVal(storeValue);
    }

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
    }

    removeVal(val){
        let index = this.state.value.indexOf(val);
        if (index > -1) {
            this.state.value.splice(index, 1);
            this.setState({
                value: this.state.value 
            }, this.valueChange);
        };
    }

    valueChange(){
        if (typeof this.props.onChange === 'function') this.props.onChange(this.state.value)
    }

    render() {
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], itemNode, valArr;
        for (let item of this.state.options){
            let itemChecked = false;
            for (let val of this.state.value) {
                if(item[valueName] === val) {
                    itemChecked = true;
                    break;
                }
            }
            itemNode = <CheckBox key={item[valueName]} storeValue={item[valueName]} checked={itemChecked} onChange={this.handleChange.bind(this)}>{item[labelName]}</CheckBox>;
            optionNodes.push(itemNode);
        }

        return (
            <div>
                {optionNodes}
            </div>
        );
    }
}
