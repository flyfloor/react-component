import DocumentClickMixin from '../mixin/DocumentClickMixin';

const DropBase = React.createClass({
    mixins: [DocumentClickMixin],
    getInitialState: function() {
        return {
            options: this.props.options,
            value: this.props.value,
            open: false,
            filterText: '',
        };
    },

    getDefaultProps: function() {
        return {
            placeHolder: 'click to select...',
        };
    },

    handleOtherClick(e){
        const BASE_NODE = React.findDOMNode(this);
        if(e.target == BASE_NODE || BASE_NODE.contains(e.target)) {
            // er...
        } else {
            this.setState({
                open: false,
                filterText: '', 
            });
        }
        e.stopPropagation();
    },

    selectChange(val){
        this.setState({
            value: val, 
        }, () => {
            if (typeof this.props.onChange === 'function') this.props.onChange(val);
            this.setState({
                open: false, 
            });
        });
    },

    toggleDropDown(e){
        this.setState({
            open: !this.state.open, 
        });
        e.stopPropagation();
    },

    handleSearch(text){
        this.setState({
            filterText: text, 
        });
    },

    handleFocus(e){
        this.setState({
            open: true, 
        });
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
            <div onClick={this.handleClick.bind(this)}>
                {this.props.children}
            </div>
        );
    }
});

DropBase.multiInput = React.createClass({
    render() {
        return (
            <div></div>
        );
    }
});



DropBase.SearchBar = React.createClass({

    getDefaultProps(){
        return {
            placeHolder: 'search...'
        };
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