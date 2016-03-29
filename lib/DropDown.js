'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _require = require('./mixin/keyCode');

var BACKSPACE_KEYCODE = _require.BACKSPACE_KEYCODE;


var DropDown = React.createClass({
    displayName: 'DropDown',

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
        children: React.PropTypes.arrayOf(React.PropTypes.element)
    },

    getInitialState: function getInitialState() {
        var _props = this.props;
        var multi = _props.multi;
        var value = _props.value;
        var options = _props.options;

        var DEFAULT_VALUE = multi ? [] : '';
        value = value || DEFAULT_VALUE;
        return {
            options: options, value: value,
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
        var _props2 = this.props;
        var multi = _props2.multi;
        var defaultSelected = _props2.defaultSelected;
        var valueName = _props2.valueName;
        var _state = this.state;
        var options = _state.options;
        var value = _state.value;

        if (!multi && !value && defaultSelected && options.length > 0) {
            this.setState({
                value: options[0][valueName]
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
        var _this = this;

        var _props3 = this.props;
        var labelName = _props3.labelName;
        var valueName = _props3.valueName;
        var placeHolder = _props3.placeHolder;
        var searchable = _props3.searchable;
        var multi = _props3.multi;
        var style = _props3.style;
        var children = _props3.children;
        var _state2 = this.state;
        var filterText = _state2.filterText;
        var value = _state2.value;
        var options = _state2.options;


        var optionNodes = [],
            selected = void 0,
            node = void 0,
            tags = [];

        if (children) {
            React.Children.map(children, function (item) {
                var props = item.props;
                var _value = props[valueName];
                var _label = props[labelName];
                if (multi) {
                    var _index = value.indexOf(_value);
                    selected = _index !== -1;
                    if (selected) tags[_index] = _label;
                } else {
                    selected = value === _value;
                    placeHolder = _label;
                }

                node = _this.formatOptionCell({ label: _label, value: _value,
                    selected: selected, children: props.children });
                if (_this.getFilterStatus(filterText, _label, _value)) optionNodes.push(node);
            });
        } else {
            if (multi) {
                // list node format(multi)
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var pair = _step.value;

                        var _value = pair[valueName];
                        var _label = pair[labelName];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var val = _step2.value;

                                selected = val === _value;
                                if (selected) {
                                    var index = value.indexOf(_value);
                                    if (tags.indexOf([_label]) === -1) tags[index] = _label;
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

                        node = this.formatOptionCell({ label: _label, value: _value, selected: selected, children: pair.children });
                        if (this.getFilterStatus(filterText, _value, _label)) optionNodes.push(node);
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
                    for (var _iterator3 = options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var pair = _step3.value;

                        var _value = pair[valueName];
                        var _label = pair[labelName];
                        selected = value === _value;
                        if (selected) placeHolder = _label;
                        node = this.formatOptionCell({ label: _label, value: _value, selected: selected, children: pair.children });
                        if (searchable) {
                            if (this.getFilterStatus(filterText, _value, _label)) optionNodes.push(node);
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
        }

        return React.createElement(
            'div',
            { className: 'ui dropdown', style: style },
            multi ? this.formatMultiInput(tags) : React.createElement(
                DropDown.label,
                { onClick: this.toggleDropDown },
                placeHolder
            ),
            this.formatDropList(optionNodes)
        );
    },
    getFilterStatus: function getFilterStatus(text) {
        var status = false;

        for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            fields[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = fields[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var val = _step4.value;

                if (String(val).indexOf(text) !== -1) {
                    status = true;
                    break;
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return status;
    },
    formatOptionCell: function formatOptionCell(_ref) {
        var _this2 = this;

        var label = _ref.label;
        var value = _ref.value;
        var selected = _ref.selected;
        var children = _ref.children;

        var content = children ? children : label;
        return React.createElement(
            'li',
            { key: value },
            React.createElement(
                DropDown.Option,
                { onOptionSelect: function onOptionSelect() {
                        return _this2.selectChange(value);
                    },
                    selected: selected },
                content
            )
        );
    },
    formatSearchBar: function formatSearchBar() {
        return React.createElement(
            DropDown.SearchBar,
            { onUserInputFocus: this.handleFocus,
                onUserInput: this.handleSearch },
            this.props.placeHolder
        );
    },
    formatDropList: function formatDropList(nodes) {
        var open = this.state.open;
        var searchable = this.props.searchable;

        var node = null;

        if (open) {
            node = React.createElement(
                'div',
                { className: '_list' },
                searchable ? this.formatSearchBar() : null,
                React.createElement(
                    'ul',
                    null,
                    nodes
                )
            );
        }
        return node;
    },
    formatMultiInput: function formatMultiInput(tags) {
        return React.createElement(DropDown.multiInput, { filterText: this.state.filterText,
            onSelectChange: this.multiBarValChangeByIndex, onUserInputFocus: this.handleFocus,
            onUserInput: this.handleSearch, onClick: this.toggleOpen, selectedTags: tags });
    },
    onOtherDomClick: function onOtherDomClick(e) {
        this.toggleOpen(false);
    },
    multiBarValChangeByIndex: function multiBarValChangeByIndex(index) {
        var value = this.state.value;

        var storeVal = this.state.value;

        // remove specific value
        if (index !== undefined) {
            if (index > -1) value.splice(index, 1);
        } else {
            value.pop();
        }

        this.setState({
            value: value
        }, this.triggerDropValueChange());
    },
    selectChange: function selectChange(val) {
        var _this3 = this;

        this.formatValue(val, function () {
            _this3.triggerDropValueChange();
            _this3.toggleOpen(_this3.props.multi);
        });
    },
    triggerDropValueChange: function triggerDropValueChange() {
        this.props.onSelect(this.state.value);
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
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    },
    render: function render() {
        return this.formatDrop();
    }
});

// dropdown option
DropDown.Option = React.createClass({
    displayName: 'Option',
    handleClick: function handleClick() {
        this.props.onOptionSelect();
    },
    render: function render() {
        var _props4 = this.props;
        var selected = _props4.selected;
        var children = _props4.children;

        return React.createElement(
            'div',
            { className: selected ? '_active _item' : '_item', onClick: this.handleClick },
            children
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
        var keyCode = e.keyCode;
        var target = e.target;

        var value = this.inputField().value;
        this.setState({
            hasInput: true
        });

        if (keyCode === BACKSPACE_KEYCODE && value === '') this.props.onSelectChange();
        e.target.style.width = (value.length + 1) * 12 + 'px';
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
        var _this4 = this;

        var _props5 = this.props;
        var selectedTags = _props5.selectedTags;
        var filterText = _props5.filterText;
        var hasInput = this.state.hasInput;

        var TAGS = selectedTags.map(function (tag, index) {
            return React.createElement(
                'span',
                { className: '_tag', key: index, onClick: function onClick() {
                        return _this4.removeSelected(index);
                    } },
                React.createElement(
                    'san',
                    { className: '_text' },
                    tag
                ),
                React.createElement('a', { href: 'javascript:;', className: '_delete' })
            );
        });

        var placeHolder = selectedTags.length === 0 && !hasInput ? React.createElement(
            'span',
            { className: '_placeHolder' },
            'search...'
        ) : React.createElement('span', { className: '_placeHolder' });

        return React.createElement(
            'div',
            { className: '_multi', onClick: this.handleClick },
            TAGS,
            React.createElement('input', { className: '_input', ref: 'userInput', style: { 'width': '9px' },
                value: filterText,
                onBlur: this.handleBlur, onFocus: this.handleFocus,
                onChange: this.handleInputChange, type: 'text', onKeyDown: this.handleKeyDown }),
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
                React.createElement('input', { className: '_searchbar', ref: 'userInput', onFocus: this.handleFocus,
                    type: 'text', onChange: this.handleChange, placeholder: this.props.placeHolder })
            )
        );
    }
});

module.exports = DropDown;