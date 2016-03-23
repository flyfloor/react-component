const React = require('react');
const ReactDOM = require('react-dom');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const {BACKSPACE_KEYCODE} = require('./mixin/keyCode');

const DropDown = React.createClass({
    mixins: [DocumentClickMixin],

    propTypes: {
        placeHolder: React.PropTypes.string,
        options: React.PropTypes.array,
        onSelect: React.PropTypes.func,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        defaultSelected: React.PropTypes.bool,
        searchable: React.PropTypes.bool,
        multi: React.PropTypes.bool,
    },
    
    getInitialState() {
        let {multi, value, options} = this.props;
        const DEFAULT_VALUE = multi ? [] : '';
        value = value || DEFAULT_VALUE;
        return {
            options, value,
            open: false,
            filterText: '',
        };
    },

    getDefaultProps() {
        return {
            labelName: 'name',
            valueName: 'value',
            multi: false,
            placeHolder: 'click to select...',
        };
    },

    componentDidMount() {
        const {multi, defaultSelected, valueName} = this.props;
        const {options, value} = this.state;
        if (!multi && !value && defaultSelected && options.length > 0) {
            this.setState({
                value: options[0][valueName] 
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
        let {labelName, valueName, placeHolder, searchable, multi, style} = this.props;
        const {filterText, value, options} = this.state;

        let optionNodes = [], 
            selected, node, 
            tags = [];
        
        if (multi) {
            // list node format(multi)
            for (let pair of options){
                for(let val of value){
                    selected = val === pair[valueName];
                    if (selected) {
                        const index = value.indexOf(pair[valueName]);
                        if(tags.indexOf([pair[labelName]]) === -1) tags[index] = pair[labelName];
                        break;
                    }
                }
                node = this.formatOptionCell({ label: pair[labelName], value: pair[valueName], selected });
                if (String(pair[valueName]).indexOf(filterText) !== -1 || String(pair[labelName]).indexOf(filterText) !== -1) optionNodes.push(node);
            }
        } else {
            // list node format
            for (let pair of options){
                selected = value === pair[valueName];
                if(selected) placeHolder = pair[labelName];
                node = this.formatOptionCell({ label: pair[labelName], value: pair[valueName], selected });
                if (searchable) {
                    if (String(pair[valueName]).indexOf(filterText) !== -1 || String(pair[labelName]).indexOf(filterText) !== -1) optionNodes.push(node);
                    continue;
                }
                optionNodes.push(node);
            }
        }

        return <div className='ui dropdown' style={style}>
                    { multi ? 
                        this.formatMultiInput(tags) 
                        : <DropDown.label onClick={this.toggleDropDown}>
                            {placeHolder}
                        </DropDown.label> }
                    { this.formatDropList(optionNodes) }
                </div>
    },
    
    formatOptionCell({label, value, selected}){
        return <li key={value}>
                    <DropDown.Option onOptionSelect={this.selectChange} 
                        selected={selected} storeValue={value}>{label}
                    </DropDown.Option>
                </li>;
    },

    formatSearchBar(){
        return <DropDown.SearchBar onUserInputFocus={this.handleFocus} 
                    onUserInput={this.handleSearch}>
                    {this.props.placeHolder}
                </DropDown.SearchBar>
    },

    formatDropList(nodes){
        const {open} = this.state;
        const {searchable} = this.props;
        if (searchable) {
            return open ? 
                    <div className='_list'>
                        {this.formatSearchBar()}
                        <ul>{nodes}</ul> 
                    </div> 
                    : null;
        } else {
            return open && nodes.length > 0 ? 
                    <div className='_list'>
                        <ul>{nodes}</ul> 
                    </div> 
                    : null;
        }
    },

    formatMultiInput(tags){
        return <DropDown.multiInput filterText={this.state.filterText} 
                    onSelectChange={this.multiBarValChangeByIndex} onUserInputFocus={this.handleFocus} 
                    onUserInput={this.handleSearch} onClick={this.toggleOpen} selectedTags={tags}>
                </DropDown.multiInput>
    },

    onOtherDomClick(e){
        this.toggleOpen(false);
    },

    multiBarValChangeByIndex(index){
        let storeVal = this.state.value;
        
        // remove specific value
        if (index != null) {
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
            this.toggleOpen(this.props.multi);
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
        const {selected, children} = this.props;
        return (
            <div className={selected ? '_active _item' : '_item'} onClick={this.handleClick}>
                {children}
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
        const {keyCode, target} = e;
        const value = this.inputField().value;
        this.setState({
            hasInput: true, 
        });        
        
        if (keyCode === BACKSPACE_KEYCODE && value === '') this.props.onSelectChange();
        e.target.style.width = (value.length + 1) * 12 + 'px';
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

    removeSelected(index){
        this.props.onSelectChange(index);
        this.inputFieldFocus();
    },

    inputField(){
        return ReactDOM.findDOMNode(this.refs.userInput);
    },

    inputFieldFocus(){
        this.inputField().focus();
    },

    render() {
        const {selectedTags, filterText} = this.props;
        const {hasInput} = this.state;
        const TAGS = selectedTags.map((tag, index) => {
            return <span className='_tag' key={index} onClick={() => this.removeSelected(index)}>
                        <san className="_text">{tag}</san>
                        <a href="javascript:;" className="_delete"></a>
                    </span>;
        });

        let placeHolder = selectedTags.length === 0 && !hasInput ? 
                <span className='_placeHolder'>search...</span> 
                : <span className='_placeHolder'></span>;

        return (
            <div className='_multi' onClick={this.handleClick}>
                {TAGS}
                <input className='_input' ref='userInput' style={{'width': '9px'}} 
                    value={filterText} 
                    onBlur={this.handleBlur} onFocus={this.handleFocus} 
                    onChange={this.handleInputChange} type='text' onKeyDown={this.handleKeyDown}/>
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
                    <input className='_searchbar' ref='userInput' onFocus={this.handleFocus} 
                        type='text' onChange={this.handleChange} placeholder={this.props.placeHolder}/>
                </div>
            </div>
        );
    }
});

module.exports = DropDown;

