import DocumentClickMixin from '../mixin/DocumentClickMixin';
import KeyCodeMixin from '../mixin/KeyCodeMixin';
import DataAccessor from '../util/DataAccessor';

const DropBase = React.createClass({
    mixins: [DocumentClickMixin],
    
    getInitialState() {
        const DEFAULT_VALUE = this.props.multi ? [] : '';
        return {
            options: this.props.options,
            value: this.props.value || DEFAULT_VALUE,
            open: false,
            filterText: '',
        };
    },

    componentDidMount() {
        if (!this.props.multi && !this.state.value && this.props.defaultSelected && this.state.options.length > 0) {
            this.setState({
                value: this.state.options[0][this.props.valueName] 
            });
        };
    },

    getDefaultProps() {
        return {
            placeHolder: 'click to select...',
        };
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
        if (typeof this.props.onSelect === 'function') this.props.onSelect(this.state.value);
    },

    toggleOpen(stat){
        this.setState({
            open: stat,
            filterText: '', 
        });
    },

    toggleDropDown(e){
        this.toggleOpen(!this.state.open);
        e.stopPropagation();
    },

    handleSearch(text){
        this.setState({
            filterText: text, 
        });
    },

    handleFocus(e){
        this.toggleOpen(true);
        e.stopPropagation();
    },

    render() {
        throw new Error('no implementation');
    }
});

export default DropBase;

DropBase.Option = React.createClass({
    handleClick(){
        this.props.onOptionSelect(this.props.storeValue);
    },

    render(){
        let node = this.props.selected ? <i>√</i> : null;
        return (
            <div className={this.props.selected ? 'active' : ''} onClick={this.handleClick}>
                {this.props.children}
                {node}
            </div>
        );
    }
});

DropBase.label = React.createClass({
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

DropBase.multiInput = React.createClass({

    getInitialState() {
        return {
            hasInput: false, 
        };
    },

    handleClick(e){
        this.inputFocus();
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
        this.inputFocus();
        e.stopPropagation();
    },

    inputField(){
        return React.findDOMNode(this.refs.userInput);
    },

    inputFocus(){
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



DropBase.SearchBar = React.createClass({
    getDefaultProps(){
        return {
            placeHolder: 'search...'
        };
    },

    componentDidMount() {
        React.findDOMNode(this.refs.userInput).focus();
    },

    handleChange(){
        this.props.onUserInput(React.findDOMNode(this.refs.userInput).value);
    },

    handleFocus(e){
        this.props.onUserInputFocus(e);
    },

    render() {
        return (
            <div>
                <div className='_search'>
                    <input className='_searchbar' ref='userInput' onFocus={this.handleFocus} type='text' onChange={this.handleChange.bind(this)} placeholder={this.props.placeHolder}/>
                </div>
            </div>
        );
    }
});
