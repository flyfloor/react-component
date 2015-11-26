const React = require('react');
const ReactDOM = require('react-dom');
const css = require('../css/dropdown.less');
const DocumentClickMixin = require('../mixin/DocumentClickMixin');
const KeyCodeMixin = require('../mixin/KeyCodeMixin');
const DataAccessor = require('../util/DataAccessor');

const DropDown = React.createClass({
    mixins: [DocumentClickMixin],

    propTypes: {
        placeHolder: React.PropTypes.string,
        options: React.PropTypes.array,
        onSelect: React.PropTypes.func,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
    },
    
    getInitialState() {
        const DEFAULT_VALUE = this.props.multi ? [] : '';
        return {
            options: this.props.options,
            value: this.props.value || DEFAULT_VALUE,
            open: false,
            filterText: '',
        };
    },

    getDefaultProps() {
        return {
            multi: false,
            placeHolder: 'click to select...',
        };
    },

    componentDidMount() {
        if (!this.props.multi && !this.state.value && this.props.defaultSelected && this.state.options.length > 0) {
            this.setState({
                value: this.state.options[0][this.props.valueName] 
            });
        };
    },

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
    },

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
                        const index = compVal.indexOf(pair[VALUE_NAME]);
                        if(tags.indexOf([pair[LABEL_NAME]]) === -1) tags[index] = pair[LABEL_NAME];
                        break;
                    }
                }
                node = this.formatOptionCell({ label: pair[LABEL_NAME], value: pair[VALUE_NAME], selected: selected });
                if (pair[VALUE_NAME].toString().indexOf(filterText) !== -1 || pair[LABEL_NAME].toString().indexOf(filterText) !== -1) optionNodes.push(node);
            }
        } else {
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

        return <div className='ui dropdown' style={this.props.style}>
                    { multi ? this.formatMultiInput(tags) : <DropDown.label onClick={this.toggleDropDown}>{placeHolder}</DropDown.label> }
                    { this.formatDropList(optionNodes) }
                </div>
    },
    
    formatOptionCell({label, value, selected}){
        return <li key={value}>
                    <DropDown.Option onOptionSelect={this.selectChange} selected={selected} storeValue={value}>{label}</DropDown.Option>
                </li>;
    },

    formatSearchBar(){
        return <DropDown.SearchBar onUserInputFocus={this.handleFocus} onUserInput={this.handleSearch}>this.props.placeHolder</DropDown.SearchBar>
    },

    formatDropList(nodes){
        if (this.props.searchable) {
            return this.state.open ? <div className='_list'>
                                        {this.formatSearchBar()}
                                        <ul>{nodes}</ul> 
                                    </div> : null;
        } else {
            return this.state.open && nodes.length > 0 ? <div className='_list'>
                                                            <ul>{nodes}</ul> 
                                                        </div> : null;
        }
    },

    formatMultiInput(tags){
        return <DropDown.multiInput filterText={this.state.filterText} onSelectChange={this.multiBarValChangeByIndex} onUserInputFocus={this.handleFocus} onUserInput={this.handleSearch} onClick={this.toggleOpen} selectedTags={tags}></DropDown.multiInput>
    },

    onOtherDomClick(e){
        this.toggleOpen(false);
    },

    multiBarValChangeByIndex(index){
        let storeVal = this.state.value;
        
        // remove specific value
        if (index) {
            if (index > -1) storeVal.splice(index, 1);
        } else {
            this.state.value.pop();
        }

        this.setState({
            value: storeVal, 
        }, this.triggerDropValueChange());
    },

    selectChange(val){
        this.formatValue(val, () => {
            this.triggerDropValueChange();
            this.toggleOpen(false);
        });
    },

    triggerDropValueChange(){
        if (this.props.onSelect) this.props.onSelect(this.state.value);
    },

    toggleOpen(stat){
        this.setState({
            open: stat,
            filterText: '', 
        });
    },

    toggleDropDown(e){
        this.toggleOpen(!this.state.open);
    },

    handleSearch(text){
        this.setState({
            filterText: text, 
        });
    },

    handleFocus(e){
        this.toggleOpen(true);
    },

    render() {
        return (
            this.formatDrop()
        );
    }
});


// dropdown option
DropDown.Option = React.createClass({
    handleClick(){
        this.props.onOptionSelect(this.props.storeValue);
    },

    render(){
        let node = this.props.selected ? <i>√</i> : null;
        return (
            <div className={this.props.selected ? 'active _item' : '_item'} onClick={this.handleClick}>
                {this.props.children}
                {node}
            </div>
        );
    }
});

// dropdown label
DropDown.label = React.createClass({
    handleClick(e){
        this.props.onClick(e);
    },

    render() {
        return (
            <div className="_label" onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
    }
});

// multi dropdown input field
DropDown.multiInput = React.createClass({

    getInitialState() {
        return {
            hasInput: false, 
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (nextProps.selectedTags.length !== this.props.selectedTags.length) {
            this.inputFieldFocus();
        };
    },

    handleClick(e){
        this.inputFieldFocus();
        this.props.onClick(true);
    },

    handleKeyDown(e){
        const [CODE, TARGET, VALUE] = [e.keyCode, e.target, this.inputField().value];
        this.setState({
            hasInput: true, 
        });        

        if (KeyCodeMixin.isBackSpace(CODE) && VALUE === '') this.props.onSelectChange();
        e.target.style.width = (VALUE.length + 1) * 12 + 'px';
    },

    handleInputChange(){
        this.props.onUserInput(this.inputField().value);
    },

    handleBlur(e){
        this.setState({
            hasInput: false, 
        });
        this.inputField().style.width = '9px';
    },

    handleFocus(e){
        this.props.onUserInputFocus(e);
    },

    removeSelected(e){
        const TAG_INDEX = DataAccessor.getData(e.target, 'index');
        this.props.onSelectChange(TAG_INDEX);
        this.inputFieldFocus();
    },

    inputField(){
        return ReactDOM.findDOMNode(this.refs.userInput);
    },

    inputFieldFocus(){
        this.inputField().focus();
    },

    render() {
        const TAGS = this.props.selectedTags.map((tag, index) => {
            return <span className='_tag' key={index} onClick={this.removeSelected}>
                        <san className="_text">{tag}</san>
                        <a href="javascript:;" data-index={index}>x</a>
                    </span>;
        });

        let placeHolder = this.props.selectedTags.length === 0 && !this.state.hasInput ? <span className='_placeHolder'>search...</span> : <span className='_placeHolder'></span>;

        return (
            <div className='_multi' onClick={this.handleClick}>
                {TAGS}
                <input className='_input' ref='userInput' style={{'width': '9px'}} value={this.props.filterText} onBlur={this.handleBlur} onFocus={this.handleFocus} onChange={this.handleInputChange} type='text' onKeyDown={this.handleKeyDown}/>
                {placeHolder}
            </div>
        );
    }
});

// dropdown search bar
DropDown.SearchBar = React.createClass({

    getDefaultProps(){
        return {
            placeHolder: 'search...'
        };
    },

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.userInput).focus();
    },

    handleChange(){
        this.props.onUserInput(ReactDOM.findDOMNode(this.refs.userInput).value);
    },

    handleFocus(e){
        this.props.onUserInputFocus(e);
    },

    render() {
        return (
            <div>
                <div className='_search'>
                    <input className='_searchbar' ref='userInput' onFocus={this.handleFocus} type='text' onChange={this.handleChange} placeholder={this.props.placeHolder}/>
                </div>
            </div>
        );
    }
});

module.exports = DropDown;

