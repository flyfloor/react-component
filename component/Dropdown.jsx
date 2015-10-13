export default class DropDown extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: props.options,
            value: props.value,
            unfold: false,
            filterText: '',
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

    toggleDropDown(e){
        this.setState({
            unfold: !this.state.unfold, 
        });
        e.stopPropagation();
    }

    formatDrop(){
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], 
            selected, 
            label = this.props.placeHolder,
            filterText = this.state.filterText,
            compVal = this.state.value,
            searchable = this.props.searchable,
            node;

        for (let pair of this.state.options){
            selected = compVal === pair[valueName];
            if(selected) label = pair[labelName];
            
            node = this.formatOptionCell({ 
                label: pair[labelName], 
                value: pair[valueName], 
                onChange: this.selectChange, 
                selected: selected 
            });

            if (searchable) {
                if (pair[valueName].indexOf(filterText) !== -1 || pair[labelName].indexOf(filterText) !== -1) 
                    optionNodes.push(node);
                continue;
            }
            optionNodes.push(node);
        }

        return <div>
                    {this.formatDropBar(label)}
                    {this.formatDropList(optionNodes)}
                </div>
    }
    
    formatOptionCell({label, value, onChange, selected}){
        return <DropDown.Option key={value} onChange={onChange.bind(this)} selected={selected} storeValue={value}>{label}</DropDown.Option>
    }

    formatDropList(nodes){
        return this.state.unfold ? <ul>{nodes}</ul> : null;
    }

    handleSearch(text){
        this.setState({
            filterText: text, 
        });
    }

    formatDropBar(label){
        let node = this.props.searchable ? 
                        <DropDown.searchBar className="searchBar" onUserInput={this.handleSearch.bind(this)}>{label}</DropDown.searchBar> :
                        <DropDown.label>{label}</DropDown.label>;

        return <div onClick={this.toggleDropDown.bind(this)}>
                    {node}
                </div>
    }

	render() {
		return (
            this.formatDrop()
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

DropDown.label = React.createClass({
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});


DropDown.searchBar = React.createClass({

    getDefaultProps: () => {
        return {
            placeHolder: 'search...'
        };
    },

    handleChange(){
        this.props.onUserInput(React.findDOMNode(this.refs.userInput).value);
    },

    render() {
        return (
            <div>
                <div>
                    <input ref="userInput" type="text" style={{width: '200px', height:'20px'}} onChange={this.handleChange.bind(this)} placeholder={this.props.placeHolder}/>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

