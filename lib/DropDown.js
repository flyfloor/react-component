'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var BACKSPACE_KC = require('./mixin/keyCode').BACKSPACE_KC;
var klassName = require('./util/className');
var UpdatePropsMixin = require('./mixin/UpdatePropsMixin');

var DropDown = React.createClass({
    displayName: 'DropDown',

    mixins: [DocumentClickMixin, UpdatePropsMixin],
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
        var _props2 = this.props,
            multi = _props2.multi,
            value = _props2.value;

        var default_val = multi ? [] : '';
        value = value || default_val;
        return {
            value: value,
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
        var _props3 = this.props,
            multi = _props3.multi,
            defaultSelected = _props3.defaultSelected,
            valueName = _props3.valueName,
            options = _props3.options;
        var value = this.state.value;

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

        var _props4 = this.props,
            labelName = _props4.labelName,
            searchable = _props4.searchable,
            valueName = _props4.valueName,
            placeHolder = _props4.placeHolder,
            multi = _props4.multi,
            style = _props4.style,
            className = _props4.className;
        var _state = this.state,
            filterText = _state.filterText,
            value = _state.value,
            open = _state.open;

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
                if (selected) {
                    placeHolder = item_label;
                }
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
                { isPlaceHolder: value === '', onClick: function onClick() {
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
                ReactCssTransitionGroup,
                { className: '_list', transitionName: 'dropdown',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? nodes : null
            )
        );
    },
    formatLabelNode: function formatLabelNode(labels) {
        var _this2 = this;

        var _props5 = this.props,
            multi = _props5.multi,
            searchable = _props5.searchable;
        var _state2 = this.state,
            open = _state2.open,
            value = _state2.value;

        var labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(labels);
        } else {
            labelNode = searchable ? this.formatSearchBar(labels) : React.createElement(
                DropDown.label,
                { isPlaceHolder: value === '', onClick: function onClick() {
                        return _this2.toggleOpen(!open);
                    } },
                labels
            );
        }
        return labelNode;
    },
    getNodesAndLabel: function getNodesAndLabel() {
        var _props6 = this.props,
            labelName = _props6.labelName,
            valueName = _props6.valueName,
            searchable = _props6.searchable,
            multi = _props6.multi,
            placeHolder = _props6.placeHolder,
            options = _props6.options;
        var _state3 = this.state,
            filterText = _state3.filterText,
            value = _state3.value;

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
        var _props7 = this.props,
            className = _props7.className,
            style = _props7.style;
        var open = this.state.open;

        className = klassName('dropdown', className);
        if (open) {
            className += ' _active';
        }

        var _getNodesAndLabel = this.getNodesAndLabel(),
            optionNodes = _getNodesAndLabel.optionNodes,
            displayLabels = _getNodesAndLabel.displayLabels;

        return React.createElement(
            'div',
            { className: className, style: style },
            this.formatLabelNode(displayLabels),
            React.createElement(
                ReactCssTransitionGroup,
                { className: '_list', transitionName: 'dropdown',
                    transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                open ? optionNodes : null
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

        var label = _ref.label,
            value = _ref.value,
            selected = _ref.selected,
            children = _ref.children,
            disabled = _ref.disabled;

        var content = children ? children : label;
        var node = disabled ? React.createElement(
            DropDown.Option,
            { key: value, disabled: disabled, selected: selected },
            content
        ) : React.createElement(
            DropDown.Option,
            { key: value, disabled: disabled, selected: selected, onClick: function onClick() {
                    return _this3.handleChangeSelect(value);
                } },
            content
        );
        return node;
    },
    formatSearchBar: function formatSearchBar(text) {
        var _this4 = this;

        var _state4 = this.state,
            filterText = _state4.filterText,
            value = _state4.value;

        var className = '_text';
        if (value === '') {
            className += ' _placeHolder';
        }
        return React.createElement(
            'div',
            { className: '_search', onClick: function onClick() {
                    return _this4.toggleOpen(true);
                } },
            filterText ? React.createElement('div', { className: '_text' }) : React.createElement(
                'div',
                { className: className },
                text
            ),
            React.createElement('input', { type: 'text', className: '_input', ref: 'userInput', value: filterText,
                onChange: function onChange(e) {
                    return _this4.handleSearch(e.target.value);
                } }),
            React.createElement('i', null)
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
        var _props8 = this.props,
            multi = _props8.multi,
            onChange = _props8.onChange;
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
        var _props9 = this.props,
            selected = _props9.selected,
            disabled = _props9.disabled;

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
        var _props = Object.assign({}, this.props);
        var isPlaceHolder = _props.isPlaceHolder;

        var className = '_label';
        if (isPlaceHolder) {
            className += ' _placeHolder';
        }
        delete _props.isPlaceHolder;
        return React.createElement('div', _extends({ className: className }, _props));
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

        var _props10 = this.props,
            selectedTags = _props10.selectedTags,
            filterText = _props10.filterText;
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
            React.createElement('input', { type: 'text', className: '_input', ref: 'userInput', style: { 'width': '9px' },
                value: filterText,
                onBlur: this.handleBlur, onFocus: function onFocus(e) {
                    return _this7.props.onUserInputFocus(e);
                },
                onChange: function onChange(e) {
                    return _this7.props.onUserInput(e.target.value);
                }, onKeyDown: this.handleKeyDown }),
            placeHolder,
            React.createElement('i', null)
        );
    }
});

module.exports = DropDown;