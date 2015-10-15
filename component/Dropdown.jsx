import DropBase from './DropBase.jsx';

export default class DropDown extends DropBase {
    constructor(props){
        super(props);
    }

    formatValue(val, callback){
        let newVal = val, 
            oldVal = this.state.value;
        if (this.props.multi) {
            let index = oldVal.indexOf(val);
            if (index > -1) {
                oldVal.splice(index, 1);
                this.setState({ value: oldVal }, callback);
                return;
            }
            newVal = oldVal.concat(val);
        } 
        this.setState({ value: newVal}, callback);
    }

    formatDrop(){
        const [LABEL_NAME = 'name', VALUE_NAME = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], selected, node,
            placeHolder = this.props.placeHolder,
            filterText = this.state.filterText,
            compVal = this.state.value,
            searchable = this.props.searchable,
            multi = this.props.multi,
            tags = [];
        
        if (multi) {
            // list node format(multi)
            for (let pair of this.state.options){
                for(let val of compVal){
                    selected = val === pair[VALUE_NAME];
                    if (selected) {
                        if(tags.indexOf([pair[LABEL_NAME]]) === -1) tags.push(pair[LABEL_NAME]);
                        break;
                    }
                }
                node = this.formatOptionCell({ label: pair[LABEL_NAME], value: pair[VALUE_NAME], selected: selected });
                if (pair[VALUE_NAME].toString().indexOf(filterText) !== -1 || pair[LABEL_NAME].toString().indexOf(filterText) !== -1) optionNodes.push(node);
            }

        } else {
            // with a searchbar
            if (searchable) optionNodes.push(this.formatSearchBar());

            // list node format
            for (let pair of this.state.options){
                selected = compVal === pair[VALUE_NAME];
                if(selected) placeHolder = pair[LABEL_NAME];
                node = this.formatOptionCell({ label: pair[LABEL_NAME], value: pair[VALUE_NAME], selected: selected });
                if (searchable) {
                    if (pair[VALUE_NAME].toString().indexOf(filterText) !== -1 || pair[LABEL_NAME].toString().indexOf(filterText) !== -1) optionNodes.push(node);
                    continue;
                }
                optionNodes.push(node);
            }
        }

        return <div>
                    { multi ? this.formatMultiInput(tags) : <DropBase.label onClick={this.toggleDropDown.bind(this)}>{placeHolder}</DropBase.label> }
                    {this.formatDropList(optionNodes)}
                </div>
    }
    
    formatOptionCell({label, value, onChange, selected}){
        return <DropBase.Option key={value} onChange={this.selectChange.bind(this)} selected={selected} storeValue={value}>{label}</DropBase.Option>
    }

    formatSearchBar(){
        return <DropDown.SearchBar onUserInputFocus={this.handleFocus.bind(this)} onUserInput={this.handleSearch.bind(this)}>this.props.placeHolder</DropDown.SearchBar>
    }

    formatDropList(nodes){
        return this.state.open ? <ul>{nodes}</ul> : null;
    }

    formatMultiInput(tags){
        return <DropBase.multiInput filterText={this.state.filterText} onSelectChange={this.multiBarValChangeByIndex.bind(this)} onUserInputFocus={this.handleFocus.bind(this)} onUserInput={this.handleSearch.bind(this)} onClick={this.toggleOpen.bind(this)} selectedTags={tags}></DropBase.multiInput>
    }

    render() {
        return (
            this.formatDrop()
        );
    }
}

