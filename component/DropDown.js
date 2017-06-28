const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')
const defaultCheckedCmp = require('./high-order/defaultCheckedCmp')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const documentClickCmp = require('./high-order/documentClickCmp')
const BACKSPACE_KEYCODE = require('./util/constants').BACKSPACE_KEYCODE
const klassName = require('./util/className')
const debounce = require('./util/debounce')

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.toggleOpen = this.toggleOpen.bind(this)
        this.multiBarValChangeByIndex = this.multiBarValChangeByIndex.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.handleSearch = this.handleSearch.bind(this)

        let { multi, value } = props;
        const default_val = multi ? [] : '';
        value = [undefined, null].indexOf(value) === -1 ? value : default_val;
        this.state = {
            value,
            open: false,
            filterText: '',
        }
    }
    
    componentWillReceiveProps(nextProps) {
        const {defaultSelected, multi, options} = this.props
        if (nextProps.options !== options) {
            if (!defaultSelected) {
                this.setState({
                    value: multi ? [] : ''
                }, () => this.props.onChange(this.state.value));
            } else {
                this.initDefaultValue({ 
                    multi, 
                    props: nextProps
                })
            }
        }
    }

    componentDidMount() {
        let {value} = this.state
        let {defaultSelected, multi} = this.props
        if (defaultSelected) {
            if (!multi && !value) {
                return this.initDefaultValue({ multi })
            }
            if (multi && value.length === 0) {
                this.initDefaultValue({ multi })
            }
        }
    }
    // format value judge if is multi
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
    }
    
    // yield child type dropdown
    formatYieldChildren(children){
        let {labelName, valueName, 
                placeHolder, multi, style, className} = this.props;
        const {filterText, value, open} = this.state;

        let nodes = [], tags = [];
        React.Children.map(children, (item, index) => {
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
                if (selected) {
                    placeHolder = item_label;
                }
            }
            
            if(this.filterTextMatched(filterText, item_label, item_val)) {
                nodes.push(
                    <DropDownOption key={index}
                        value={item_val} 
                        label={item_label}
                        disabled={props.disabled}
                        onClick={() => this.handleChangeSelect(item_val)}
                        selected={selected}>
                        {props.children}
                    </DropDownOption>
                )
            }
        });

        let labelNode = this.formatLabelNode(multi ? tags : placeHolder)

        className = klassName('dropdown', className);

        if (open) {
            className = `${className} _active`;
        }

        return <div className={className} style={style}>
                    {labelNode}
                    <ReactCssTransitionGroup className="_list" transitionName="dropdown"
                        transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        {open ? nodes : null}
                        {this.formatLoading()}
                    </ReactCssTransitionGroup>
                </div>;
    }

    // add loading to list
    formatLoading(){
        const { loading } = this.props
        const { open } = this.state
        if (!open) {
            return null
        }
        return (
            loading ? 
                <div className="_overlay">
                    <div className="loader">
                    </div>
                </div> 
                : null
        )
    }
    
    // dropdown label
    formatLabelNode(labels){
        const {multi, searchable, onClick, onBlur, onFocus} = this.props;
        const {open, value} = this.state;
        let labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(labels)
        } else {
            labelNode = searchable ? 
                this.formatSearchBar(labels)
                : <DropDownLabel onFocus={onFocus} 
                    onBlur={onBlur} 
                    isPlaceHolder={value === ''} 
                    onClick={() => {
                        this.toggleOpen(!open)
                        if (onClick) onClick()
                    }}>
                    {labels}
                </DropDownLabel>;
        }
        return labelNode;
    }
    
    // generate nodes and label by options prop
    getNodesAndLabel(){
        const { labelName, valueName, searchable, multi, placeHolder, options } = this.props;
        const { filterText, value } = this.state;
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

            node = <DropDownOption key={i}
                        label={pair_label} 
                        value={pair_val} 
                        selected={selected} 
                        onClick={() => this.handleChangeSelect(pair_val)}
                        disabled={pair.disabled}>
                        {pair.children}
                    </DropDownOption>

            if (multi || searchable) {
                if (this.filterTextMatched(filterText, pair_val, pair_label)) optionNodes.push(node);
            } else {
                optionNodes.push(node);
            }
        }
        return {optionNodes, displayLabels};
    }
    
    // options type dropdown
    formatOptions(){
        let {className, style} = this.props;
        const {open} = this.state
        className = klassName('dropdown', className);
        if (open) {
            className += ' _active';
        }

        const {optionNodes, displayLabels} = this.getNodesAndLabel();

        return (
            <div className={className} style={style}>
                {this.formatLabelNode(displayLabels)}
                <ReactCssTransitionGroup className="_list" transitionName="dropdown"
                    transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {open ? optionNodes : null}
                    {this.formatLoading()}
                </ReactCssTransitionGroup>
            </div>
        );
    }
    
    // filter if text in fields, return true
    filterTextMatched(text, ...fields){
        let status = false;
        for (let i = 0; i < fields.length; i++) {
            if (String(fields[i]).indexOf(text) !== -1) {
                status = true;
                break;
            }
        }
        return status;
    }
        
    // searchable search bar
    formatSearchBar(text){
        const {filterText, value} = this.state;
        const {onClick, onBlur, onFocus} = this.props
        let className = '_text'
        if (value === '') {
            className += ' _placeHolder'
        }
        return (
            <div className="_search" onClick={() => {
                    this.toggleOpen(true)
                    if (onClick) onClick()
                }}>

                {filterText ? 
                    <div className="_text"></div>
                    : <div className={className}>{text}</div>}
                <input type='text' className='_input' 
                    ref='userInput' value={filterText} 
                    onBlur={onBlur} onFocus={onFocus}
                     onChange={e => this.handleSearch(e.target.value)}/>
                <i></i>
            </div>
        );
    }
    
    // multi dropdown's input
    formatMultiInput(tags){
        const {onClick, onBlur, onFocus} = this.props
        return (
            <MultiInput filterText={this.state.filterText} 
                onSelectChange={this.multiBarValChangeByIndex} 
                onUserInputFocus={() => {
                    this.toggleOpen(true)
                    if (onFocus) onFocus()
                }} 
                onBlur={onBlur} onFocus={onFocus}
                onUserInput={this.handleSearch} onClick={() => {
                    this.toggleOpen(true)
                    if (onClick) onClick()
                }} selectedTags={tags}>
            </MultiInput>
        );
    }
    
    // other context click to close dropdown
    onOtherDomClick(){
        this.toggleOpen(false);
    }
    
    // multi dropdown, select value change
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
    }
    
    // each option cell clicked handler
    handleChangeSelect(val){
        this.formatValue(val, () => {
            this.triggerDropValueChange();
            this.toggleOpen(this.props.multi);
        });
    }
    
    // value change, trigger onChange event
    triggerDropValueChange(){
        const {multi, onChange} = this.props;
        let {value} = this.state;
        if (multi) value = Object.assign([], value);
        onChange(value);
    }
    
    // dropdown open or close, clean filter text
    toggleOpen(stat){
        let params = {
            open: stat,
        }
        if (this.state.value || this.props.autoClearText) {
            params.filterText = ''
        }
        this.setState(params);
    }

    clearText(){
        this.setState({
            filterText: ''
        });
    }
    
    // search
    handleSearch(text){
        this.setState({
            filterText: text, 
        });
        const {onSearch} = this.props
        if (onSearch) {
            debounce(onSearch)(text)
        }
    }

    render() {
        const {children} = this.props;
        let node = children ? 
            this.formatYieldChildren(children) 
            : this.formatOptions();
        return (
            node
        );
    }
}

DropDown.propTypes = {
    placeHolder: PropTypes.string,
    options: PropTypes.array,
    autoClearText: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onSearch: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    defaultSelected: PropTypes.bool,
    searchable: PropTypes.bool,
    multi: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element),
}

DropDown.defaultProps = {
    labelName: 'name',
    valueName: 'value',
    autoClearText: false,
    multi: false,
    className: '',
    placeHolder: 'click to select...',
}

const DropDownOption = props => {
    let newProps = Object.assign({}, props)
    const {selected, disabled, children} = newProps;
    let className = '_item';
    if (disabled) {
        className += ' _disabled';
        delete newProps.onClick
    }
    if (selected) {
        className += ' _active';
    }

    return (
        <div className={className} {...newProps}>
            {children ? children : newProps.label}
        </div>
    )
}

// dropdown label
const DropDownLabel = props => {
    let _props = Object.assign({}, props)
    let {isPlaceHolder} = _props
    let className = '_label'
    if (isPlaceHolder) {
        className += ' _placeHolder'
    }
    delete _props.onClick
    delete _props.onBlur
    delete _props.onFocus
    delete _props.isPlaceHolder
    return (
        <div className={className} {..._props}>
            <input type="text" className="_transparent" readOnly onClick={props.onClick} 
                onBlur={props.onBlur} onFocus={props.onFocus}/>
            {_props.children}
        </div>
    );
}

// multi dropdown input field
class MultiInput extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.removeSelected = this.removeSelected.bind(this)

        this.state = {
            hasInput: false,
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTags.length !== this.props.selectedTags.length) {
            this.inputFieldFocus();
        }
    }

    handleClick(){
        this.inputFieldFocus();
        this.props.onClick(true);
    }

    handleKeyDown(e){
        const {keyCode} = e;
        const value = this.inputField().value;
        this.setState({
            hasInput: true, 
        });        
        
        if (keyCode === BACKSPACE_KEYCODE && value === '') this.props.onSelectChange();
        e.target.style.width = (value.length + 1) * 12 + 'px';
    }

    handleBlur(){
        const {onBlur} = this.props
        this.setState({
            hasInput: false, 
        });
        this.inputField().style.width = '9px';
        if (onBlur) onBlur()
    }

    removeSelected(index){
        this.props.onSelectChange(index);
        this.inputFieldFocus();
    }

    inputField(){
        return ReactDOM.findDOMNode(this.refs.userInput);
    }

    inputFieldFocus(){
        this.inputField().focus();
    }

    render() {
        const {selectedTags, filterText} = this.props;
        const {hasInput} = this.state;
        const tagNodes = selectedTags.map((tag, index) => {
            return (
                <span className='_tag' key={index} onClick={() => this.removeSelected(index)}>
                    <san className="_text">{tag}</san>
                    <a href="javascript:;" className="_delete"></a>
                </span>
            )
        });

        let placeHolder = selectedTags.length === 0 && !hasInput ? 
                <span className='_placeHolder'>search...</span> 
                : <span className='_placeHolder'></span>;

        return (
            <div className='_multi' onClick={this.handleClick}>
                {tagNodes}
                <input type="text" className='_input' ref='userInput' style={{'width': '9px'}} 
                    value={filterText} 
                    onBlur={this.handleBlur} onFocus={(e) => this.props.onUserInputFocus(e)} 
                    onChange={(e) => this.props.onUserInput(e.target.value) } onKeyDown={this.handleKeyDown}/>
                {placeHolder}
                <i></i>
            </div>
        );
    }
}

module.exports = documentClickCmp(defaultCheckedCmp(DropDown))
