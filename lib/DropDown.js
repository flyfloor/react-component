'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _require = require('./mixin/keyCode');

var BACKSPACE_KC = _require.BACKSPACE_KC;

var klassName = require('./util/className');

var DropDown = React.createClass({
    displayName: 'DropDown',

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
        children: React.PropTypes.arrayOf(React.PropTypes.element)
    },

    getInitialState: function getInitialState() {
        var _props = this.props;
        var multi = _props.multi;
        var value = _props.value;
        var options = _props.options;

        var default_val = multi ? [] : '';
        value = value || default_val;
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
            className: '',
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
        }
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
    formatYieldChildren: function formatYieldChildren(children) {
        var _this = this;

        var _props3 = this.props;
        var labelName = _props3.labelName;
        var searchable = _props3.searchable;
        var valueName = _props3.valueName;
        var placeHolder = _props3.placeHolder;
        var multi = _props3.multi;
        var style = _props3.style;
        var className = _props3.className;
        var _state2 = this.state;
        var filterText = _state2.filterText;
        var value = _state2.value;
        var open = _state2.open;

        var nodes = [],
            tags = [];
        React.Children.map(children, function (item) {
            var props = item.props;
            var item_val = props[valueName];
            var item_label = props[labelName];
            var selected = false;
            if (multi) {
                var _index = value.indexOf(item_val);
                selected = _index !== -1;
                if (selected) tags[_index] = item_label;
            } else {
                selected = value === item_val;
                placeHolder = item_label;
            }

            if (_this.getFilterStatus(filterText, item_label, item_val)) {
                nodes.push(_this.formatOptionCell({
                    label: item_label,
                    value: item_val,
                    selected: selected,
                    children: props.children,
                    disabled: props.disabled
                }));
            }
        });

        var labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(tags);
        } else {
            labelNode = searchable ? this.formatSearchBar(placeHolder) : React.createElement(
                DropDown.label,
                { onClick: function onClick() {
                        return _this.toggleOpen(!open);
                    } },
                placeHolder
            );
        }

        className = klassName('dropdown', className);

        if (open) {
            className = className + ' _active';
        }

        return React.createElement(
            'div',
            { className: className, style: style },
            labelNode,
            React.createElement(
                'ul',
                { className: '_list' },
                nodes
            )
        );
    },
    formatLabelNode: function formatLabelNode(labels) {
        var _this2 = this;

        var _props4 = this.props;
        var multi = _props4.multi;
        var searchable = _props4.searchable;
        var open = this.state.open;

        var labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(labels);
        } else {
            labelNode = searchable ? this.formatSearchBar(labels) : React.createElement(
                DropDown.label,
                { onClick: function onClick() {
                        return _this2.toggleOpen(!open);
                    } },
                labels
            );
        }
        return labelNode;
    },
    getNodesAndLabel: function getNodesAndLabel() {
        var _props5 = this.props;
        var labelName = _props5.labelName;
        var valueName = _props5.valueName;
        var searchable = _props5.searchable;
        var multi = _props5.multi;
        var placeHolder = _props5.placeHolder;
        var _state3 = this.state;
        var filterText = _state3.filterText;
        var value = _state3.value;
        var options = _state3.options;

        var displayLabels = [],
            node = null,
            optionNodes = [];
        if (!multi) displayLabels = placeHolder;

        for (var i = 0; i < options.length; i++) {
            var pair = options[i];
            var pair_val = pair[valueName];
            var pair_label = pair[labelName];
            var selected = false;
            if (multi) {
                for (var j = 0; j < value.length; j++) {
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

            node = this.formatOptionCell({ label: pair_label, value: pair_val, selected: selected, children: pair.children, disabled: pair.disabled });

            if (multi || searchable) {
                if (this.getFilterStatus(filterText, pair_val, pair_label)) optionNodes.push(node);
            } else {
                optionNodes.push(node);
            }
        }
        return { optionNodes: optionNodes, displayLabels: displayLabels };
    },
    formatOptions: function formatOptions() {
        var _props6 = this.props;
        var className = _props6.className;
        var style = _props6.style;

        className = klassName('dropdown', className);
        if (this.state.open) {
            className += ' _active';
        }

        var _getNodesAndLabel = this.getNodesAndLabel();

        var optionNodes = _getNodesAndLabel.optionNodes;
        var displayLabels = _getNodesAndLabel.displayLabels;


        return React.createElement(
            'div',
            { className: className, style: style },
            this.formatLabelNode(displayLabels),
            React.createElement(
                'ul',
                { className: '_list' },
                optionNodes
            )
        );
    },
    getFilterStatus: function getFilterStatus(text) {
        var status = false;

        for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            fields[_key - 1] = arguments[_key];
        }

        for (var i = 0; i < fields.length; i++) {
            if (String(fields[i]).indexOf(text) !== -1) {
                status = true;
                break;
            }
        }
        return status;
    },
    formatOptionCell: function formatOptionCell(_ref) {
        var _this3 = this;

        var label = _ref.label;
        var value = _ref.value;
        var selected = _ref.selected;
        var children = _ref.children;
        var disabled = _ref.disabled;

        var content = children ? children : label;
        var node = disabled ? React.createElement(
            DropDown.Option,
            { disabled: disabled, selected: selected },
            content
        ) : React.createElement(
            DropDown.Option,
            { disabled: disabled, selected: selected, onClick: function onClick() {
                    return _this3.handleChangeSelect(value);
                } },
            content
        );
        return React.createElement(
            'li',
            { key: value },
            node
        );
    },
    formatSearchBar: function formatSearchBar(text) {
        var _this4 = this;

        var filterText = this.state.filterText;

        return React.createElement(
            'div',
            { className: '_search', onClick: function onClick() {
                    return _this4.toggleOpen(true);
                } },
            filterText ? React.createElement('div', { className: '_text' }) : React.createElement(
                'div',
                { className: '_text' },
                text
            ),
            React.createElement('input', { className: '_input', ref: 'userInput', value: filterText,
                type: 'text', onChange: function onChange(e) {
                    return _this4.handleSearch(e.target.value);
                } })
        );
    },
    formatMultiInput: function formatMultiInput(tags) {
        var _this5 = this;

        return React.createElement(DropDown.multiInput, { filterText: this.state.filterText,
            onSelectChange: this.multiBarValChangeByIndex, onUserInputFocus: function onUserInputFocus() {
                return _this5.toggleOpen(true);
            },
            onUserInput: this.handleSearch, onClick: this.toggleOpen, selectedTags: tags });
    },
    onOtherDomClick: function onOtherDomClick() {
        this.toggleOpen(false);
    },
    multiBarValChangeByIndex: function multiBarValChangeByIndex(index) {
        var value = this.state.value;
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
    handleChangeSelect: function handleChangeSelect(val) {
        var _this6 = this;

        this.formatValue(val, function () {
            _this6.triggerDropValueChange();
            _this6.toggleOpen(_this6.props.multi);
        });
    },
    triggerDropValueChange: function triggerDropValueChange() {
        var _props7 = this.props;
        var multi = _props7.multi;
        var onChange = _props7.onChange;
        var value = this.state.value;

        if (multi) value = Object.assign([], value);
        onChange(value);
    },
    toggleOpen: function toggleOpen(stat) {
        this.setState({
            open: stat,
            filterText: ''
        });
    },
    handleSearch: function handleSearch(text) {
        this.setState({
            filterText: text
        });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({
                value: nextProps.value
            });
        }
    },
    render: function render() {
        var children = this.props.children;

        var node = children ? this.formatYieldChildren(children) : this.formatOptions();
        return node;
    }
});

// dropdown option
DropDown.Option = React.createClass({
    displayName: 'Option',
    render: function render() {
        var _props8 = this.props;
        var selected = _props8.selected;
        var disabled = _props8.disabled;

        var className = '_item';
        if (disabled) {
            className += ' _disabled';
        }
        if (selected) {
            className += ' _active';
        }
        return React.createElement('div', _extends({ className: className
        }, this.props));
    }
});

// dropdown label
DropDown.label = React.createClass({
    displayName: 'label',
    render: function render() {
        return React.createElement(
            'div',
            _extends({ className: '_label' }, this.props),
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
        }
    },

    handleClick: function handleClick() {
        this.inputFieldFocus();
        this.props.onClick(true);
    },
    handleKeyDown: function handleKeyDown(e) {
        var keyCode = e.keyCode;

        var value = this.inputField().value;
        this.setState({
            hasInput: true
        });

        if (keyCode === BACKSPACE_KC && value === '') this.props.onSelectChange();
        e.target.style.width = (value.length + 1) * 12 + 'px';
    },
    handleBlur: function handleBlur() {
        this.setState({
            hasInput: false
        });
        this.inputField().style.width = '9px';
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
        var _this7 = this;

        var _props9 = this.props;
        var selectedTags = _props9.selectedTags;
        var filterText = _props9.filterText;
        var hasInput = this.state.hasInput;

        var tagNodes = selectedTags.map(function (tag, index) {
            return React.createElement(
                'span',
                { className: '_tag', key: index, onClick: function onClick() {
                        return _this7.removeSelected(index);
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
            tagNodes,
            React.createElement('input', { className: '_input', ref: 'userInput', style: { 'width': '9px' },
                value: filterText,
                onBlur: this.handleBlur, onFocus: function onFocus(e) {
                    return _this7.props.onUserInputFocus(e);
                },
                onChange: function onChange(e) {
                    return _this7.props.onUserInput(e.target.value);
                }, type: 'text', onKeyDown: this.handleKeyDown }),
            placeHolder
        );
    }
});

module.exports = DropDown;