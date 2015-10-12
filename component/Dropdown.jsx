export default class DropDown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: props.options,
            value: props.value,
            unfold: false,
        }
    }

    selectChange(val){
        this.setState({
            value: val, 
        }, () => {
            if (typeof this.props.onChange === 'function') this.props.onChange(val);
            this.setState({
                unfold: false, 
            });
        });
    }

    toggleDropDown(){
        this.setState({
            unfold: !this.state.unfold, 
        });
    }

	render() {
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], selected, label = this.props.placeHolder, content = null;

        for (let pair of this.state.options){
            selected = this.state.value === pair[valueName];
            if(selected) label = pair[labelName];
            optionNodes.push(<DropDown.Option key={pair[valueName]} onChange={this.selectChange.bind(this)} selected={selected} storeValue={pair[valueName]}>{pair[labelName]}</DropDown.Option>)
        }
        
        if (this.state.unfold) content = <ul>{optionNodes}</ul>;

		return (
            <div>
                <div onClick={this.toggleDropDown.bind(this)}>{label}</div>
                {content}
            </div>
		);
	}
}

DropDown.defaultProps = { placeHolder: 'click to select...' }

DropDown.Option = React.createClass({
    handleClick(){
        this.props.onChange(this.props.storeValue);
    },

    render(){
        let node = this.props.selected ? <i>√</i> : null;
        return (
            <div onClick={this.handleClick}>
                {this.props.children}
                {node}
            </div>
        );
    }
});

