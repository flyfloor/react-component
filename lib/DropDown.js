'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var KeyCodeMixin = require('./mixin/KeyCodeMixin');

var DropDown = React.createClass({
    displayName: 'DropDown',

    mixins: [DocumentClickMixin],

    propTypes: {
        placeHolder: React.PropTypes.string,
        options: React.PropTypes.array,
        onSelect: React.PropTypes.func,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string
    },

    getInitialState: function getInitialState() {
        var DEFAULT_VALUE = this.props.multi ? [] : '';
        return {
            options: this.props.options,
            value: this.props.value || DEFAULT_VALUE,
            open: false,
            filterText: ''
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            labelName: 'name',
            valueName: 'value',
            multi: false,
            placeHolder: 'click to select...'
        };
    },
    componentDidMount: function componentDidMount() {
        if (!this.props.multi && !this.state.value && this.props.defaultSelected && this.state.options.length > 0) {
            this.setState({
                value: this.state.options[0][this.props.valueName]
            });
        };
    },
    formatValue: function formatValue(val, callback) {
        var newVal = val,
            oldVal = this.state.value;
        if (this.props.multi) {
            var index = oldVal.indexOf(val);
            if (index > -1) {
                oldVal.splice(index, 1);
                this.setState({ value: oldVal }, callback);
                return;
            }
            newVal = oldVal.concat(val);
        }
        this.setState({ value: newVal }, callback);
    },
    formatDrop: function formatDrop() {
        var LABEL_NAME = this.props.labelName;
        var VALUE_NAME = this.props.valueName;

        var optionNodes = [],
            selected = undefined,
            node = undefined,
            placeHolder = this.props.placeHolder,
            filterText = this.state.filterText,
            compVal = this.state.value,
            searchable = this.props.searchable,
            multi = this.props.multi,
            tags = [];

        if (multi) {
            // list node format(multi)
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.state.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var pair = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = compVal[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var val = _step2.value;

                            selected = val === pair[VALUE_NAME];
                            if (selected) {
                                var index = compVal.indexOf(pair[VALUE_NAME]);
                                if (tags.indexOf([pair[LABEL_NAME]]) === -1) tags[index] = pair[LABEL_NAME];
                                break;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    node = this.formatOptionCell({ label: pair[LABEL_NAME], value: pair[VALUE_NAME], selected: selected });
                    if (pair[VALUE_NAME].toString().indexOf(filterText) !== -1 || pair[LABEL_NAME].toString().indexOf(filterText) !== -1) optionNodes.push(node);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            // list node format
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.state.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var pair = _step3.value;

                    selected = compVal === pair[VALUE_NAME];
                    if (selected) placeHolder = pair[LABEL_NAME];
                    node = this.formatOptionCell({ label: pair[LABEL_NAME], value: pair[VALUE_NAME], selected: selected });
                    if (searchable) {
                        if (pair[VALUE_NAME].toString().indexOf(filterText) !== -1 || pair[LABEL_NAME].toString().indexOf(filterText) !== -1) optionNodes.push(node);
                        continue;
                    }
                    optionNodes.push(node);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }

        return React.createElement(
            'div',
            { className: 'ui dropdown', style: this.props.style },
            multi ? this.formatMultiInput(tags) : React.createElement(
                DropDown.label,
                { onClick: this.toggleDropDown },
                placeHolder
            ),
            this.formatDropList(optionNodes)
        );
    },
    formatOptionCell: function formatOptionCell(_ref) {
        var label = _ref.label;
        var value = _ref.value;
        var selected = _ref.selected;

        return React.createElement(
            'li',
            { key: value },
            React.createElement(
                DropDown.Option,
                { onOptionSelect: this.selectChange, selected: selected, storeValue: value },
                label
            )
        );
    },
    formatSearchBar: function formatSearchBar() {
        return React.createElement(
            DropDown.SearchBar,
            { onUserInputFocus: this.handleFocus, onUserInput: this.handleSearch },
            'this.props.placeHolder'
        );
    },
    formatDropList: function formatDropList(nodes) {
        if (this.props.searchable) {
            return this.state.open ? React.createElement(
                'div',
                { className: '_list' },
                this.formatSearchBar(),
                React.createElement(
                    'ul',
                    null,
                    nodes
                )
            ) : null;
        } else {
            return this.state.open && nodes.length > 0 ? React.createElement(
                'div',
                { className: '_list' },
                React.createElement(
                    'ul',
                    null,
                    nodes
                )
            ) : null;
        }
    },
    formatMultiInput: function formatMultiInput(tags) {
        return React.createElement(DropDown.multiInput, { filterText: this.state.filterText, onSelectChange: this.multiBarValChangeByIndex, onUserInputFocus: this.handleFocus, onUserInput: this.handleSearch, onClick: this.toggleOpen, selectedTags: tags });
    },
    onOtherDomClick: function onOtherDomClick(e) {
        this.toggleOpen(false);
    },
    multiBarValChangeByIndex: function multiBarValChangeByIndex(index) {
        var storeVal = this.state.value;

        // remove specific value
        if (index != null) {
            if (index > -1) storeVal.splice(index, 1);
        } else {
            this.state.value.pop();
        }

        this.setState({
            value: storeVal
        }, this.triggerDropValueChange());
    },
    selectChange: function selectChange(val) {
        var _this = this;

        this.formatValue(val, function () {
            _this.triggerDropValueChange();
            _this.toggleOpen(false);
        });
    },
    triggerDropValueChange: function triggerDropValueChange() {
        if (this.props.onSelect) this.props.onSelect(this.state.value);
    },
    toggleOpen: function toggleOpen(stat) {
        this.setState({
            open: stat,
            filterText: ''
        });
    },
    toggleDropDown: function toggleDropDown(e) {
        this.toggleOpen(!this.state.open);
    },
    handleSearch: function handleSearch(text) {
        this.setState({
            filterText: text
        });
    },
    handleFocus: function handleFocus(e) {
        this.toggleOpen(true);
    },
    render: function render() {
        return this.formatDrop();
    }
});

// dropdown option
DropDown.Option = React.createClass({
    displayName: 'Option',
    handleClick: function handleClick() {
        this.props.onOptionSelect(this.props.storeValue);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this.props.selected ? '_active _item' : '_item', onClick: this.handleClick },
            this.props.children
        );
    }
});

// dropdown label
DropDown.label = React.createClass({
    displayName: 'label',
    handleClick: function handleClick(e) {
        this.props.onClick(e);
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: '_label', onClick: this.handleClick },
            this.props.children
        );
    }
});

// multi dropdown input field
DropDown.multiInput = React.createClass({
    displayName: 'multiInput',
    getInitialState: function getInitialState() {
        return {
            hasInput: false
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTags.length !== this.props.selectedTags.length) {
            this.inputFieldFocus();
        };
    },

    handleClick: function handleClick(e) {
        this.inputFieldFocus();
        this.props.onClick(true);
    },
    handleKeyDown: function handleKeyDown(e) {
        var CODE = e.keyCode;
        var TARGET = e.target;
        var VALUE = this.inputField().value;

        this.setState({
            hasInput: true
        });

        if (KeyCodeMixin.isBackSpace(CODE) && VALUE === '') this.props.onSelectChange();
        e.target.style.width = (VALUE.length + 1) * 12 + 'px';
    },
    handleInputChange: function handleInputChange() {
        this.props.onUserInput(this.inputField().value);
    },
    handleBlur: function handleBlur(e) {
        this.setState({
            hasInput: false
        });
        this.inputField().style.width = '9px';
    },
    handleFocus: function handleFocus(e) {
        this.props.onUserInputFocus(e);
    },
    removeSelected: function removeSelected(index) {
        this.props.onSelectChange(index);
        this.inputFieldFocus();
    },
    inputField: function inputField() {
        return ReactDOM.findDOMNode(this.refs.userInput);
    },
    inputFieldFocus: function inputFieldFocus() {
        this.inputField().focus();
    },
    render: function render() {
        var _this2 = this;

        var TAGS = this.props.selectedTags.map(function (tag, index) {
            return React.createElement(
                'span',
                { className: '_tag', key: index, onClick: function onClick() {
                        return _this2.removeSelected(index);
                    } },
                React.createElement(
                    'san',
                    { className: '_text' },
                    tag
                ),
                React.createElement('a', { href: 'javascript:;', className: '_delete' })
            );
        });

        var placeHolder = this.props.selectedTags.length === 0 && !this.state.hasInput ? React.createElement(
            'span',
            { className: '_placeHolder' },
            'search...'
        ) : React.createElement('span', { className: '_placeHolder' });

        return React.createElement(
            'div',
            { className: '_multi', onClick: this.handleClick },
            TAGS,
            React.createElement('input', { className: '_input', ref: 'userInput', style: { 'width': '9px' }, value: this.props.filterText, onBlur: this.handleBlur, onFocus: this.handleFocus, onChange: this.handleInputChange, type: 'text', onKeyDown: this.handleKeyDown }),
            placeHolder
        );
    }
});

// dropdown search bar
DropDown.SearchBar = React.createClass({
    displayName: 'SearchBar',
    getDefaultProps: function getDefaultProps() {
        return {
            placeHolder: 'search...'
        };
    },
    componentDidMount: function componentDidMount() {
        ReactDOM.findDOMNode(this.refs.userInput).focus();
    },
    handleChange: function handleChange() {
        this.props.onUserInput(ReactDOM.findDOMNode(this.refs.userInput).value);
    },
    handleFocus: function handleFocus(e) {
        this.props.onUserInputFocus(e);
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: '_search' },
                React.createElement('input', { className: '_searchbar', ref: 'userInput', onFocus: this.handleFocus, type: 'text', onChange: this.handleChange, placeholder: this.props.placeHolder })
            )
        );
    }
});

module.exports = DropDown;