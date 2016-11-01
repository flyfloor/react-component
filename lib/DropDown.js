'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _DocumentClickMixin2 = _interopRequireDefault(_DocumentClickMixin);

var _keyCode = require('./mixin/keyCode');

var _className = require('./util/className');

var _className2 = _interopRequireDefault(_className);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropDown = _react2.default.createClass({
    displayName: 'DropDown',

    mixins: [_DocumentClickMixin2.default],

    propTypes: {
        placeHolder: _react2.default.PropTypes.string,
        options: _react2.default.PropTypes.array,
        onChange: _react2.default.PropTypes.func.isRequired,
        labelName: _react2.default.PropTypes.string,
        valueName: _react2.default.PropTypes.string,
        defaultSelected: _react2.default.PropTypes.bool,
        searchable: _react2.default.PropTypes.bool,
        multi: _react2.default.PropTypes.bool,
        children: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.element)
    },

    getInitialState: function getInitialState() {
        var _props2 = this.props,
            multi = _props2.multi,
            value = _props2.value,
            options = _props2.options;

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
        var _props3 = this.props,
            multi = _props3.multi,
            defaultSelected = _props3.defaultSelected,
            valueName = _props3.valueName;
        var _state = this.state,
            options = _state.options,
            value = _state.value;

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
        var _state2 = this.state,
            filterText = _state2.filterText,
            value = _state2.value,
            open = _state2.open;

        var nodes = [],
            tags = [];
        _react2.default.Children.map(children, function (item) {
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
            labelNode = searchable ? this.formatSearchBar(placeHolder) : _react2.default.createElement(
                DropDown.label,
                { isPlaceHolder: value === '', onClick: function onClick() {
                        return _this.toggleOpen(!open);
                    } },
                placeHolder
            );
        }

        className = (0, _className2.default)('dropdown', className);

        if (open) {
            className = className + ' _active';
        }

        return _react2.default.createElement(
            'div',
            { className: className, style: style },
            labelNode,
            _react2.default.createElement(
                'ul',
                { className: '_list' },
                nodes
            )
        );
    },
    formatLabelNode: function formatLabelNode(labels) {
        var _this2 = this;

        var _props5 = this.props,
            multi = _props5.multi,
            searchable = _props5.searchable;
        var _state3 = this.state,
            open = _state3.open,
            value = _state3.value;

        var labelNode = null;
        if (multi) {
            labelNode = this.formatMultiInput(labels);
        } else {
            labelNode = searchable ? this.formatSearchBar(labels) : _react2.default.createElement(
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
            placeHolder = _props6.placeHolder;
        var _state4 = this.state,
            filterText = _state4.filterText,
            value = _state4.value,
            options = _state4.options;

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

        className = (0, _className2.default)('dropdown', className);
        if (this.state.open) {
            className += ' _active';
        }

        var _getNodesAndLabel = this.getNodesAndLabel(),
            optionNodes = _getNodesAndLabel.optionNodes,
            displayLabels = _getNodesAndLabel.displayLabels;

        return _react2.default.createElement(
            'div',
            { className: className, style: style },
            this.formatLabelNode(displayLabels),
            _react2.default.createElement(
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

        var label = _ref.label,
            value = _ref.value,
            selected = _ref.selected,
            children = _ref.children,
            disabled = _ref.disabled;

        var content = children ? children : label;
        var node = disabled ? _react2.default.createElement(
            DropDown.Option,
            { disabled: disabled, selected: selected },
            content
        ) : _react2.default.createElement(
            DropDown.Option,
            { disabled: disabled, selected: selected, onClick: function onClick() {
                    return _this3.handleChangeSelect(value);
                } },
            content
        );
        return _react2.default.createElement(
            'li',
            { key: value },
            node
        );
    },
    formatSearchBar: function formatSearchBar(text) {
        var _this4 = this;

        var _state5 = this.state,
            filterText = _state5.filterText,
            value = _state5.value;

        var className = '_text';
        if (value === '') {
            className += ' _placeHolder';
        }
        return _react2.default.createElement(
            'div',
            { className: '_search', onClick: function onClick() {
                    return _this4.toggleOpen(true);
                } },
            filterText ? _react2.default.createElement('div', { className: '_text' }) : _react2.default.createElement(
                'div',
                { className: className },
                text
            ),
            _react2.default.createElement('input', { type: 'text', className: '_input', ref: 'userInput', value: filterText,
                onChange: function onChange(e) {
                    return _this4.handleSearch(e.target.value);
                } }),
            _react2.default.createElement('i', null)
        );
    },
    formatMultiInput: function formatMultiInput(tags) {
        var _this5 = this;

        return _react2.default.createElement(DropDown.multiInput, { filterText: this.state.filterText,
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
DropDown.Option = _react2.default.createClass({
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
        return _react2.default.createElement('div', _extends({ className: className
        }, this.props));
    }
});

// dropdown label
DropDown.label = _react2.default.createClass({
    displayName: 'label',
    render: function render() {
        var _props = Object.assign({}, this.props);
        var isPlaceHolder = _props.isPlaceHolder;

        var className = '_label';
        if (isPlaceHolder) {
            className += ' _placeHolder';
        }
        delete _props.isPlaceHolder;
        return _react2.default.createElement('div', _extends({ className: className }, _props));
    }
});

// multi dropdown input field
DropDown.multiInput = _react2.default.createClass({
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

        if (keyCode === _keyCode.BACKSPACE_KC && value === '') this.props.onSelectChange();
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
        return _reactDom2.default.findDOMNode(this.refs.userInput);
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
            return _react2.default.createElement(
                'span',
                { className: '_tag', key: index, onClick: function onClick() {
                        return _this7.removeSelected(index);
                    } },
                _react2.default.createElement(
                    'san',
                    { className: '_text' },
                    tag
                ),
                _react2.default.createElement('a', { href: 'javascript:;', className: '_delete' })
            );
        });

        var placeHolder = selectedTags.length === 0 && !hasInput ? _react2.default.createElement(
            'span',
            { className: '_placeHolder' },
            'search...'
        ) : _react2.default.createElement('span', { className: '_placeHolder' });

        return _react2.default.createElement(
            'div',
            { className: '_multi', onClick: this.handleClick },
            tagNodes,
            _react2.default.createElement('input', { type: 'text', className: '_input', ref: 'userInput', style: { 'width': '9px' },
                value: filterText,
                onBlur: this.handleBlur, onFocus: function onFocus(e) {
                    return _this7.props.onUserInputFocus(e);
                },
                onChange: function onChange(e) {
                    return _this7.props.onUserInput(e.target.value);
                }, onKeyDown: this.handleKeyDown }),
            placeHolder,
            _react2.default.createElement('i', null)
        );
    }
});

exports.default = DropDown;