const React = require('react');
const ReactDOM = require('react-dom');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const {BACKSPACE_KC} = require('./mixin/keyCode');

const DropDown = React.createClass({
    mixins: [DocumentClickMixin],

    propTypes: {
        placeHolder: React.PropTypes.string,
        options: React.PropTypes.array,
        onSelect: React.PropTypes.func.isRequired,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        defaultSelected: React.PropTypes.bool,
        searchable: React.PropTypes.bool,
        multi: React.PropTypes.bool,
        children: React.PropTypes.arrayOf(React.PropTypes.element),
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
        let newVal = val, oldVal = this.state.value;

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
        let {labelName, valueName, placeHolder, searchable, multi, style, children} = this.props;
        const {filterText, value, options} = this.state;

        let optionNodes = [], selected, node, tags = [];

        if (children) {
            React.Children.map(children, item => {
                const props = item.props;
                const _value = props[valueName];
                const _label = props[labelName];
                if (multi) {
                    const _index = value.indexOf(_value);
                    selected = _index !== -1;
                    if(selected) tags[_index] = _label;
                } else {
                    selected = value === _value;
                    placeHolder = _label;
                }
                
                node = this.formatOptionCell({ label: _label, value: _value, 
                    selected, children: props.children });
                if(this.getFilterStatus(filterText, _label, _value)) optionNodes.push(node);
            });
        } else {
            if (multi) {
                // list node format(multi)
                for (let pair of options){
                    const _value = pair[valueName];
                    const _label = pair[labelName];
                    for(let val of value){
                        selected = val === _value;
                        if (selected) {
                            const index = value.indexOf(_value);
                            if(tags.indexOf([_label]) === -1) tags[index] = _label;
                            break;
                        }
                    }
                    node = this.formatOptionCell({ label: _label, value: _value, selected, children: pair.children });
                    if (this.getFilterStatus(filterText, _value, _label)) optionNodes.push(node);
                }
            } else {
                // list node format
                for (let pair of options){
                    const _value = pair[valueName];
                    const _label = pair[labelName];
                    selected = value === _value;
                    if(selected) placeHolder = _label;
                    node = this.formatOptionCell({ label: _label, value: _value, selected, children: pair.children });
                    if (searchable) {
                        if (this.getFilterStatus(filterText, _value, _label)) optionNodes.push(node);
                        continue;
                    }
                    optionNodes.push(node);
                }
            }
        }

        return <div className='ui dropdown' style={style}>
                    { multi ? 
                        this.formatMultiInput(tags) 
                        : <DropDown.label onClick={this.toggleDropDown}>
                            {placeHolder}
                        </DropDown.label> }
                    {this.formatDropList(optionNodes)}
                </div>
    },

    getFilterStatus(text, ...fields){
        let status = false;
        for(let val of fields){
            if (String(val).indexOf(text) !== -1) {
                status = true;
                break;
            }
        }
        return status;
    },
    
    formatOptionCell({ label, value, selected, children }){
        const content = children ? children : label;
        return <li key={value}>
                    <DropDown.Option onOptionSelect={() => this.selectChange(value)}
                        selected={selected}>{content}
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
        let node = null;

        if (open) {
            node = <div className='_list'>
                        {searchable ? this.formatSearchBar() : null}
                        <ul>{nodes}</ul> 
                    </div>
        }
        return node;
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
        const {value} = this.state;
        let storeVal = this.state.value;

        // remove specific value
        if (index !== undefined) {
            if (index > -1) value.splice(index, 1);
        } else {
            value.pop();
        }

        this.setState({
            value, 
        }, this.triggerDropValueChange());
    },

    selectChange(val){
        this.formatValue(val, () => {
            this.triggerDropValueChange();
            this.toggleOpen(this.props.multi);
        });
    },

    triggerDropValueChange(){
        const {multi, onSelect} = this.props;
        let {value} = this.state;
        if (multi) value = Object.assign([], value);
        onSelect(value);
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

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
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
        this.props.onOptionSelect();
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
        
        if (keyCode === BACKSPACE_KC && value === '') this.props.onSelectChange();
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

