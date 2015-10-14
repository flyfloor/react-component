import DocumentClickMixin from '../mixin/DocumentClickMixin';

const DropDown = React.createClass({
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
            });
        }
        e.stopPropagation();
    },

    formatDrop(){
        const [labelName = 'name', valueName = 'value'] = [this.props.labelName, this.props.valueName];
        let optionNodes = [], 
            selected, 
            label = this.props.placeHolder,
            filterText = this.state.filterText,
            compVal = this.state.value,
            searchable = this.props.searchable,
            node;

        for (let pair of this.state.options){
            selected = compVal === pair[valueName];
            if(selected) label = pair[labelName];
            
            node = this.formatOptionCell({ 
                label: pair[labelName], 
                value: pair[valueName], 
                onChange: this.selectChange, 
                selected: selected 
            });

            if (searchable) {
                if (pair[valueName].indexOf(filterText) !== -1 || pair[labelName].indexOf(filterText) !== -1) 
                    optionNodes.push(node);
                continue;
            }
            optionNodes.push(node);
        }

        return <div>
                    {this.formatSearchBar(label)}
                    {this.formatDropList(optionNodes)}
                </div>
    },
    
    formatOptionCell({label, value, onChange, selected}){
        return <DropDown.Option key={value} onChange={onChange.bind(this)} selected={selected} storeValue={value}>{label}</DropDown.Option>
    },

    formatDropList(nodes){
        return this.state.open ? <ul>{nodes}</ul> : null;
    },

    formatSearchBar(label){
        let node = this.props.searchable ? 
                    <DropDown.SearchBar ref='searchBar' onUserInputFocus={this.handleFocus.bind(this)} onUserInput={this.handleSearch.bind(this)}>{label}</DropDown.SearchBar> :
                    <DropDown.label onClick={this.toggleDropDown.bind(this)} ref='dropLabel'>{label}</DropDown.label>;
        return <div ref='dropList'>{node}</div>;
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
        return (
            this.formatDrop()
        );
    }
});

module.exports = DropDown;

DropDown.Option = React.createClass({
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

DropDown.label = React.createClass({
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


DropDown.SearchBar = React.createClass({

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
                    {this.props.children}
                </div>
            </div>
        );
    }
});

