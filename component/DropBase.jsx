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

    handleOtherClick(e){
        const BASE_NODE = React.findDOMNode(this);
        if(e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
            // er...
        } else {
            this.toggleOpen(false);
        }
        e.stopPropagation();
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
        if (typeof this.props.onChange === 'function') this.props.onChange(this.state.value);
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

module.exports = DropBase;

DropBase.Option = React.createClass({
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

DropBase.label = React.createClass({
    handleClick(e){
        this.props.onClick(e);
    },

    render() {
        return (
            <div onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
    }
});

DropBase.multiInput = React.createClass({

    handleClick(e){
        this.props.onClick(true);
    },

    handleKeyDown(e){
        const code = e.keyCode;
        if (KeyCodeMixin.isBackSpace(code)) this.props.onSelectChange();
    },

    handleInputChange(){
        this.props.onUserInput(React.findDOMNode(this.refs.userInput).value);
    },

    handleFocus(e){
        this.props.onUserInputFocus(e);
    },

    removeSelected(e){
        const TAG_INDEX = DataAccessor.getData(e.target, 'index');
        this.props.onSelectChange(TAG_INDEX);
        e.stopPropagation();
    },

    render() {
        const labels = this.props.selectedVals.map((val, index) => {
            return <span key={val} onClick={this.removeSelected}>
                        {val}
                        <a href="javascript:;" data-index={index}>x</a>
                    </span>;
        });

        return (
            <div onClick={this.handleClick}>
                {labels}
                <input ref='userInput' value={this.props.filterText} onFocus={this.handleFocus} onChange={this.handleInputChange} type='text' placeholder='search...' onKeyDown={this.handleKeyDown}/>
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
                <div>
                    <input ref='userInput' onFocus={this.handleFocus} type='text' style={{width: '200px', height:'20px'}} onChange={this.handleChange.bind(this)} placeholder={this.props.placeHolder}/>
                </div>
            </div>
        );
    }
});
