import DropBase from './DropBase.jsx';

export default class DropDown extends DropBase {
    constructor(props){
        super(props);
    }

    formatDrop(){
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], 
            selected, 
            placeHolder = this.props.placeHolder,
            filterText = this.state.filterText,
            compVal = this.state.value,
            searchable = this.props.searchable,
            node;
        
        // with a searchbar
        if (searchable) optionNodes.push(this.formatSearchBar());

        // list node format
        for (let pair of this.state.options){
            selected = compVal === pair[valueName];
            node = this.formatOptionCell({ label: pair[labelName], value: pair[valueName], onChange: this.selectChange, selected: selected });

            if(selected) placeHolder = pair[labelName];
            if (searchable) {
                if (pair[valueName].indexOf(filterText) !== -1 || pair[labelName].indexOf(filterText) !== -1) optionNodes.push(node);
                continue;
            }
            optionNodes.push(node);
        }

        return <div>
                    <DropBase.label onClick={this.toggleDropDown.bind(this)}>{placeHolder}</DropBase.label>
                    {this.formatDropList(optionNodes)}
                </div>
    }
    
    formatOptionCell({label, value, onChange, selected}){
        return <DropBase.Option key={value} onChange={onChange.bind(this)} selected={selected} storeValue={value}>{label}</DropBase.Option>
    }

    formatSearchBar(){
        return <DropDown.SearchBar onUserInputFocus={this.handleFocus.bind(this)} onUserInput={this.handleSearch.bind(this)}>this.props.placeHolder</DropDown.SearchBar>
    }

    formatDropList(nodes){
        return this.state.open ? <ul>{nodes}</ul> : null;
    }

    render() {
        return (
            this.formatDrop()
        );
    }
}

