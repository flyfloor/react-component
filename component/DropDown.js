const React = require('react');
const ReactDOM = require('react-dom');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const {BACKSPACE_KC} = require('./mixin/keyCode');
const klassName = require('./util/className');

const DropDown = React.createClass({
    mixins: [DocumentClickMixin],

    propTypes: {
        placeHolder: React.PropTypes.string,
        options: React.PropTypes.array,
        onChange: React.PropTypes.func.isRequired,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        defaultSelected: React.PropTypes.bool,
        searchable: React.PropTypes.bool,
        multi: React.PropTypes.bool,
        children: React.PropTypes.arrayOf(React.PropTypes.element),
    },
    
    getInitialState() {
        let {multi, value, options} = this.props;
        const default_val = multi ? [] : '';
        value = value || default_val;
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
            className: '',
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
        }
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

    formatYieldChildren(children){
        let {labelName, searchable, valueName, placeHolder, multi, style, className} = this.props;
        const {filterText, value, open} = this.state;
        let nodes = [], tags = [];
        React.Children.map(children, item => {
            const props = item.props;
            const item_val = props[valueName];
            const item_label = props[labelName];
            let selected = false;
            if (multi) {
                const _index = value.indexOf(item_val);
                selected = _index !== -1;
                if(selected) tags[_index] = item_label;
            } else {
                selected = value === item_val;
                placeHolder = item_label;
            }
            
            if(this.getFilterStatus(filterText, item_label, item_val)) {
                nodes.push(this.formatOptionCell({ 
                    label: item_label, 
                    value: item_val, 
                    selected, 
                    children: props.children, 
                    disabled: props.disabled 
                }));
            }
        });

        let labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(tags)
        } else {
            labelNode = searchable ? 
                this.formatSearchBar(placeHolder)
                : <DropDown.label onClick={() => this.toggleOpen(!open)}>
                    {placeHolder}
                </DropDown.label>
        }

        className = klassName('dropdown', className);

        if (open) {
            className = `${className} _active`;
        }

        return <div className={className} style={style}>
                    {labelNode}
                    <ul className="_list">
                        {nodes}
                    </ul>
                </div>;
    },

    formatLabelNode(labels){
        const {multi, searchable} = this.props;
        const {open} = this.state;
        let labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(labels)
        } else {
            labelNode = searchable ? 
                this.formatSearchBar(labels)
                : <DropDown.label onClick={() => this.toggleOpen(!open)}>
                    {labels}
                </DropDown.label>;
        }
        return labelNode;
    },

    getNodesAndLabel(){
        const {labelName, valueName, searchable, multi, placeHolder} = this.props;
        const {filterText, value, options} = this.state;
        let displayLabels = [], node = null, optionNodes = [];
        if (!multi) displayLabels = placeHolder;

        for (let i = 0; i < options.length; i++) {
            const pair = options[i];
            const pair_val = pair[valueName];
            const pair_label = pair[labelName];
            let selected = false;
            if (multi) {
                for (let j = 0; j < value.length; j++) {
                    selected = value[j] === pair_val;
                    if (selected) {
                        if (displayLabels.indexOf(pair_label) === -1) displayLabels[value.indexOf(pair_val)] = pair_label;
                        break;
                    }
                }
            } else {
                selected = value === pair_val;
                if (selected) displayLabels = pair_label;
            }

            node = this.formatOptionCell({ label: pair_label, value: pair_val, selected, children: pair.children, disabled: pair.disabled });

            if (multi || searchable) {
                if (this.getFilterStatus(filterText, pair_val, pair_label)) optionNodes.push(node);
            } else {
                optionNodes.push(node);
            }
        }
        return {optionNodes, displayLabels};
    },

    formatOptions(){
        let {className, style} = this.props;
        className = klassName('dropdown', className);
        if (this.state.open) {
            className += ' _active';
        }

        const {optionNodes, displayLabels} = this.getNodesAndLabel();

        return (
            <div className={className} style={style}>
                {this.formatLabelNode(displayLabels)}
                <ul className="_list">
                    {optionNodes}
                </ul>
            </div>
        );
    },

    getFilterStatus(text, ...fields){
        let status = false;
        for (let i = 0; i < fields.length; i++) {
            if (String(fields[i]).indexOf(text) !== -1) {
                status = true;
                break;
            }
        }
        return status;
    },
    
    formatOptionCell({ label, value, selected, children, disabled }){
        const content = children ? children : label;
        let node = disabled ? 
            <DropDown.Option disabled={disabled} selected={selected}>
                {content}
            </DropDown.Option>
            : <DropDown.Option disabled={disabled} selected={selected} onClick={() => this.handleChangeSelect(value)}>
                {content}
            </DropDown.Option>
        return (
            <li key={value}>
                {node}
            </li>
        );
    },

    formatSearchBar(text){
        const {filterText} = this.state;
        return (
            <div className="_search" onClick={() => this.toggleOpen(true)}>
                {filterText ? <div className="_text"></div>
                    : <div className="_text">{text}</div>}
                <input className='_input' ref='userInput' value={filterText}
                    type='text' onChange={(e) => this.handleSearch(e.target.value)}/>
            </div>
        );
    },

    formatMultiInput(tags){
        return (
            <DropDown.multiInput filterText={this.state.filterText} 
                onSelectChange={this.multiBarValChangeByIndex} onUserInputFocus={() => this.toggleOpen(true)} 
                onUserInput={this.handleSearch} onClick={this.toggleOpen} selectedTags={tags}>
            </DropDown.multiInput>
        );
    },

    onOtherDomClick(){
        this.toggleOpen(false);
    },

    multiBarValChangeByIndex(index){
        let {value} = this.state;
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

    handleChangeSelect(val){
        this.formatValue(val, () => {
            this.triggerDropValueChange();
            this.toggleOpen(this.props.multi);
        });
    },

    triggerDropValueChange(){
        const {multi, onChange} = this.props;
        let {value} = this.state;
        if (multi) value = Object.assign([], value);
        onChange(value);
    },

    toggleOpen(stat){
        this.setState({
            open: stat,
            filterText: '', 
        });
    },

    handleSearch(text){
        this.setState({
            filterText: text, 
        });
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    },

    render() {
        const {children} = this.props;
        let node = children ? 
            this.formatYieldChildren(children) 
            : this.formatOptions();
        return (
            node
        );
    }
});


// dropdown option
DropDown.Option = React.createClass({
    render(){
        const {selected, disabled} = this.props;
        let className = '_item';
        if (disabled) {
            className += ' _disabled';
        }
        if (selected) {
            className += ' _active';
        }
        return (
            <div className={className}
                {...this.props}>
            </div>
        );
    }
});

// dropdown label
DropDown.label = React.createClass({
    render() {
        return (
            <div className="_label" {...this.props}>
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
        }
    },

    handleClick(){
        this.inputFieldFocus();
        this.props.onClick(true);
    },

    handleKeyDown(e){
        const {keyCode} = e;
        const value = this.inputField().value;
        this.setState({
            hasInput: true, 
        });        
        
        if (keyCode === BACKSPACE_KC && value === '') this.props.onSelectChange();
        e.target.style.width = (value.length + 1) * 12 + 'px';
    },


    handleBlur(){
        this.setState({
            hasInput: false, 
        });
        this.inputField().style.width = '9px';
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
        const tagNodes = selectedTags.map((tag, index) => {
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
                {tagNodes}
                <input className='_input' ref='userInput' style={{'width': '9px'}} 
                    value={filterText} 
                    onBlur={this.handleBlur} onFocus={(e) => this.props.onUserInputFocus(e)} 
                    onChange={(e) => this.props.onUserInput(e.target.value) } type='text' onKeyDown={this.handleKeyDown}/>
                {placeHolder}
            </div>
        );
    }
});

module.exports = DropDown;

