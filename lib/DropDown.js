'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Component = React.Component;
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
var defaultCheckedCmp = require('./high-order/defaultCheckedCmp');
var documentClickCmp = require('./high-order/documentClickCmp');
var dropDownCmp = require('./high-order/dropDownCmp');
var BACKSPACE_KEYCODE = require('./util/constants').BACKSPACE_KEYCODE;
var klassName = require('./util/className');
var debounce = require('./util/debounce');

var DropDown = function (_Component) {
    _inherits(DropDown, _Component);

    function DropDown(props) {
        _classCallCheck(this, DropDown);

        var _this = _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call(this, props));

        _this.toggleOpen = _this.toggleOpen.bind(_this);
        _this.multiBarValChangeByIndex = _this.multiBarValChangeByIndex.bind(_this);
        _this.handleChangeSelect = _this.handleChangeSelect.bind(_this);
        _this.handleSearch = _this.handleSearch.bind(_this);

        var multi = props.multi,
            value = props.value;

        var default_val = multi ? [] : '';
        value = [undefined, null, ''].indexOf(value) === -1 ? value : default_val;
        _this.state = {
            value: value,
            open: false,
            filterText: ''
        };
        return _this;
    }

    _createClass(DropDown, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var _props2 = this.props,
                defaultSelected = _props2.defaultSelected,
                multi = _props2.multi,
                options = _props2.options,
                value = _props2.value,
                valueName = _props2.valueName;

            if (nextProps.options !== options) {
                if (defaultSelected && (value === '' || value === [])) {
                    this.initDefaultValue({
                        multi: multi,
                        props: nextProps
                    });
                    return;
                }

                // re-init value
                var nextOptions = nextProps.options;
                for (var i = 0; i < nextOptions.length; i++) {
                    if (multi) {
                        if (value.indexOf(nextOptions[i][valueName]) !== -1) {
                            return;
                        }
                    } else {
                        if (nextOptions[i][valueName] === value) {
                            return;
                        }
                    }
                }

                this.setState({
                    value: multi ? [] : ''
                }, function () {
                    return _this2.props.onChange(_this2.state.value);
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var value = this.state.value;
            var _props3 = this.props,
                defaultSelected = _props3.defaultSelected,
                multi = _props3.multi;

            if (defaultSelected) {
                if (!multi && !value) {
                    return this.initDefaultValue({ multi: multi });
                }
                if (multi && value.length === 0) {
                    this.initDefaultValue({ multi: multi });
                }
            }
        }
        // format value judge if is multi

    }, {
        key: 'formatValue',
        value: function formatValue(val, callback) {
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
        }

        // yield child type dropdown

    }, {
        key: 'formatYieldChildren',
        value: function formatYieldChildren(children) {
            var _this3 = this;

            var _props4 = this.props,
                labelName = _props4.labelName,
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
            React.Children.map(children, function (item, index) {
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

                if (_this3.filterTextMatched(filterText, item_label, item_val)) {
                    nodes.push(React.createElement(
                        DropDownOption,
                        { key: index,
                            value: item_val,
                            label: item_label,
                            disabled: props.disabled,
                            onClick: function onClick() {
                                return _this3.handleChangeSelect(item_val);
                            },
                            selected: selected },
                        props.children
                    ));
                }
            });

            var labelNode = this.formatLabel(multi ? tags : placeHolder);

            className = klassName('dropdown', className);

            if (open) {
                className = className + ' _active';
            }

            return React.createElement(
                'div',
                { className: className, style: style },
                labelNode,
                React.createElement(
                    'span',
                    { className: '_list' },
                    open ? nodes : null,
                    this.formatLoading()
                )
            );
        }

        // add loading to list

    }, {
        key: 'formatLoading',
        value: function formatLoading() {
            var loading = this.props.loading;
            var open = this.state.open;

            if (!open) {
                return null;
            }
            return loading ? React.createElement(
                'div',
                { className: '_overlay' },
                React.createElement('div', { className: 'loader' })
            ) : null;
        }

        // dropdown label

    }, {
        key: 'formatLabel',
        value: function formatLabel(labels) {
            var _props5 = this.props,
                multi = _props5.multi,
                searchable = _props5.searchable;

            var labelNode = null;
            if (multi) {
                labelNode = this.formatMultiInput(labels);
            } else {
                labelNode = searchable ? this.formatSearchBar(labels) : this.formatDefaultLabel(labels);
            }
            return labelNode;
        }

        // generate nodes and label by options prop

    }, {
        key: 'getNodesAndLabel',
        value: function getNodesAndLabel() {
            var _this4 = this;

            var _props6 = this.props,
                labelName = _props6.labelName,
                valueName = _props6.valueName,
                searchable = _props6.searchable,
                multi = _props6.multi,
                placeHolder = _props6.placeHolder,
                options = _props6.options;
            var _state2 = this.state,
                filterText = _state2.filterText,
                value = _state2.value;

            var displayLabels = [],
                node = null,
                optionNodes = [];
            if (!multi) displayLabels = placeHolder;

            var _loop = function _loop(i) {
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

                node = React.createElement(
                    DropDownOption,
                    { key: i,
                        label: pair_label,
                        value: pair_val,
                        selected: selected,
                        onClick: function onClick() {
                            return _this4.handleChangeSelect(pair_val);
                        },
                        disabled: pair.disabled },
                    pair.children
                );

                if (multi || searchable) {
                    if (_this4.filterTextMatched(filterText, pair_val, pair_label)) optionNodes.push(node);
                } else {
                    optionNodes.push(node);
                }
            };

            for (var i = 0; i < options.length; i++) {
                _loop(i);
            }
            return { optionNodes: optionNodes, displayLabels: displayLabels };
        }

        // options type dropdown

    }, {
        key: 'formatOptions',
        value: function formatOptions() {
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
                this.formatLabel(displayLabels),
                React.createElement(
                    'span',
                    { className: '_list' },
                    open ? optionNodes : null,
                    this.formatLoading()
                )
            );
        }

        // filter if text in fields, return true

    }, {
        key: 'filterTextMatched',
        value: function filterTextMatched(text) {
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
        }

        // default label for dropdown

    }, {
        key: 'formatDefaultLabel',
        value: function formatDefaultLabel(text) {
            var _this5 = this;

            var _props8 = this.props,
                disabled = _props8.disabled,
                onFocus = _props8.onFocus,
                onBlur = _props8.onBlur,
                _onClick = _props8.onClick;
            var _state3 = this.state,
                value = _state3.value,
                open = _state3.open;

            return disabled ? React.createElement(
                DropDownLabel,
                { disabled: true },
                text
            ) : React.createElement(
                DropDownLabel,
                {
                    onFocus: onFocus,
                    onBlur: onBlur,
                    isPlaceHolder: value === '',
                    onClick: function onClick() {
                        _this5.toggleOpen(!open);
                        if (_onClick) _onClick();
                    } },
                text
            );
        }

        // searchable search bar

    }, {
        key: 'formatSearchBar',
        value: function formatSearchBar(labels) {
            var _this6 = this;

            var _state4 = this.state,
                filterText = _state4.filterText,
                value = _state4.value;
            var _props9 = this.props,
                disabled = _props9.disabled,
                _onClick2 = _props9.onClick,
                onBlur = _props9.onBlur,
                onFocus = _props9.onFocus;

            return disabled ? React.createElement(DropDownSearchBar, {
                placeHolder: labels,
                text: filterText,
                isPlaceHolder: value === '',
                disabled: disabled,
                onUserInput: function onUserInput() {
                    return void 0;
                }
            }) : React.createElement(DropDownSearchBar, {
                placeHolder: labels,
                text: filterText,
                isPlaceHolder: value === '',
                disabled: disabled,
                onClick: function onClick() {
                    _this6.toggleOpen(true);
                    if (_onClick2) _onClick2();
                },
                onBlur: onBlur,
                onFocus: onFocus,
                onUserInput: this.handleSearch
            });
        }

        // multi dropdown's input

    }, {
        key: 'formatMultiInput',
        value: function formatMultiInput(tags) {
            var _this7 = this;

            var _props10 = this.props,
                _onClick3 = _props10.onClick,
                onBlur = _props10.onBlur,
                onFocus = _props10.onFocus,
                disabled = _props10.disabled;

            return disabled ? React.createElement(MultiInput, {
                disabled: disabled,
                filterText: this.state.filterText,
                onClick: function onClick() {
                    return void 0;
                },
                selectedTags: tags
            }) : React.createElement(MultiInput, {
                disabled: disabled,
                filterText: this.state.filterText,
                onSelectChange: this.multiBarValChangeByIndex,
                onUserInputFocus: function onUserInputFocus() {
                    _this7.toggleOpen(true);
                    if (onFocus) onFocus();
                },
                onBlur: onBlur,
                onFocus: onFocus,
                onUserInput: this.handleSearch,
                onClick: function onClick() {
                    _this7.toggleOpen(true);
                    if (_onClick3) _onClick3();
                },
                selectedTags: tags
            });
        }

        // other context click to close dropdown

    }, {
        key: 'onOtherDomClick',
        value: function onOtherDomClick() {
            this.toggleOpen(false);
        }

        // multi dropdown, select value change

    }, {
        key: 'multiBarValChangeByIndex',
        value: function multiBarValChangeByIndex(index) {
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
        }

        // each option cell clicked handler

    }, {
        key: 'handleChangeSelect',
        value: function handleChangeSelect(val) {
            var _this8 = this;

            this.formatValue(val, function () {
                _this8.triggerDropValueChange();
                _this8.toggleOpen(_this8.props.multi);
            });
        }

        // value change, trigger onChange event

    }, {
        key: 'triggerDropValueChange',
        value: function triggerDropValueChange() {
            var _props11 = this.props,
                multi = _props11.multi,
                onChange = _props11.onChange;
            var value = this.state.value;

            if (multi) value = Object.assign([], value);
            onChange(value);
        }

        // dropdown open or close, clean filter text

    }, {
        key: 'toggleOpen',
        value: function toggleOpen(stat) {
            var params = {
                open: stat
            };
            if (this.state.value || this.props.autoClearText) {
                params.filterText = '';
            }
            this.setState(params);
        }
    }, {
        key: 'clearText',
        value: function clearText() {
            this.setState({
                filterText: ''
            });
        }

        // search

    }, {
        key: 'handleSearch',
        value: function handleSearch(text) {
            this.setState({
                filterText: text
            });
            var onSearch = this.props.onSearch;

            if (onSearch) {
                debounce(onSearch)(text);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;

            var node = children ? this.formatYieldChildren(children) : this.formatOptions();
            return node;
        }
    }]);

    return DropDown;
}(Component);

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
    disabled: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element)
};

DropDown.defaultProps = {
    labelName: 'name',
    valueName: 'value',
    autoClearText: false,
    multi: false,
    disabled: false,
    className: '',
    placeHolder: 'click to select...'
};

var DropDownOption = function DropDownOption(props) {
    var newProps = Object.assign({}, props);
    var selected = newProps.selected,
        disabled = newProps.disabled,
        children = newProps.children;

    var className = '_item';
    if (disabled) {
        className += ' _disabled';
        delete newProps.onClick;
    }
    if (selected) {
        className += ' _active';
    }

    return React.createElement(
        'div',
        _extends({ className: className }, newProps),
        children ? children : newProps.label
    );
};

// dropdown label
var DropDownLabel = function DropDownLabel(props) {
    var _props = Object.assign({}, props);
    var isPlaceHolder = _props.isPlaceHolder,
        disabled = _props.disabled;

    var className = klassName('_label', isPlaceHolder ? '_placeHolder' : '', disabled ? '_disabled' : '');

    delete _props.onClick;
    delete _props.disabled;
    delete _props.onBlur;
    delete _props.onFocus;
    delete _props.isPlaceHolder;
    return React.createElement(
        'div',
        _extends({}, _props, {
            className: className,
            onClick: props.onClick }),
        React.createElement('input', { type: 'text',
            className: '_transparent',
            readOnly: true,
            disabled: disabled,
            onBlur: props.onBlur,
            onFocus: props.onFocus }),
        React.createElement('i', null),
        React.createElement(
            'div',
            { className: '_text' },
            _props.children
        )
    );
};

var DropDownSearchBar = function DropDownSearchBar(props) {
    var onClick = props.onClick,
        onBlur = props.onBlur,
        onFocus = props.onFocus,
        text = props.text,
        isPlaceHolder = props.isPlaceHolder,
        placeHolder = props.placeHolder,
        disabled = props.disabled;

    var className = klassName('_text', isPlaceHolder ? '_placeHolder' : '');
    return React.createElement(
        'div',
        {
            className: klassName('_search', disabled ? '_disabled' : ''),
            onClick: onClick },
        text ? React.createElement('div', { className: '_text' }) : React.createElement(
            'div',
            { className: className },
            placeHolder
        ),
        React.createElement('input', { type: 'text',
            className: '_input',
            value: text,
            disabled: disabled,
            onBlur: onBlur,
            onFocus: onFocus,
            onChange: function onChange(e) {
                return props.onUserInput(e.target.value);
            }
        }),
        React.createElement('i', null)
    );
};

DropDownSearchBar.propTypes = {
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    text: PropTypes.string,
    placeHolder: PropTypes.string,
    isPlaceHolder: PropTypes.bool,
    onUserInput: PropTypes.func.isRequired
};

DropDownSearchBar.defaultProps = {
    text: '',
    placeHolder: '',
    isPlaceHolder: false

    // multi dropdown input field
};
var MultiInput = function (_Component2) {
    _inherits(MultiInput, _Component2);

    function MultiInput(props) {
        _classCallCheck(this, MultiInput);

        var _this9 = _possibleConstructorReturn(this, (MultiInput.__proto__ || Object.getPrototypeOf(MultiInput)).call(this, props));

        _this9.handleClick = _this9.handleClick.bind(_this9);
        _this9.handleKeyDown = _this9.handleKeyDown.bind(_this9);
        _this9.handleBlur = _this9.handleBlur.bind(_this9);
        _this9.removeSelected = _this9.removeSelected.bind(_this9);

        _this9.state = {
            hasInput: false
        };
        return _this9;
    }

    _createClass(MultiInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedTags.length !== this.props.selectedTags.length) {
                this.inputFieldFocus();
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick() {
            this.inputFieldFocus();
            this.props.onClick(true);
        }
    }, {
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var keyCode = e.keyCode;

            var value = this.inputField().value;
            this.setState({
                hasInput: true
            });

            if (keyCode === BACKSPACE_KEYCODE && value === '') this.props.onSelectChange();
            e.target.style.width = (value.length + 1) * 12 + 'px';
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            var onBlur = this.props.onBlur;

            this.setState({
                hasInput: false
            });
            this.inputField().style.width = '9px';
            if (onBlur) onBlur();
        }
    }, {
        key: 'removeSelected',
        value: function removeSelected(index) {
            this.props.onSelectChange(index);
            this.inputFieldFocus();
        }
    }, {
        key: 'inputField',
        value: function inputField() {
            return ReactDOM.findDOMNode(this.userInput);
        }
    }, {
        key: 'inputFieldFocus',
        value: function inputFieldFocus() {
            this.inputField().focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this10 = this;

            var _props12 = this.props,
                selectedTags = _props12.selectedTags,
                filterText = _props12.filterText,
                disabled = _props12.disabled;
            var hasInput = this.state.hasInput;

            var tagNodes = selectedTags.map(function (tag, index) {
                return disabled ? React.createElement(
                    'span',
                    {
                        className: '_tag _disabled',
                        key: index },
                    React.createElement(
                        'san',
                        { className: '_text' },
                        tag
                    ),
                    React.createElement('a', { href: 'javascript:;',
                        className: '_delete' })
                ) : React.createElement(
                    'span',
                    {
                        className: '_tag',
                        key: index,
                        onClick: function onClick() {
                            return _this10.removeSelected(index);
                        } },
                    React.createElement(
                        'san',
                        { className: '_text' },
                        tag
                    ),
                    React.createElement('a', { href: 'javascript:;',
                        className: '_delete' })
                );
            });

            var placeHolder = selectedTags.length === 0 && !hasInput ? React.createElement(
                'span',
                { className: '_placeHolder' },
                'search...'
            ) : React.createElement('span', { className: '_placeHolder' });

            return React.createElement(
                'div',
                {
                    className: klassName('_multi', disabled ? '_disabled' : ''),
                    onClick: this.handleClick },
                tagNodes,
                disabled ? React.createElement('input', {
                    type: 'text',
                    className: '_input',
                    ref: function ref(_ref) {
                        _this10.userInput = _ref;
                    },
                    style: { 'width': '9px' },
                    value: filterText,
                    disabled: true
                }) : React.createElement('input', { type: 'text',
                    className: '_input',
                    ref: function ref(_ref2) {
                        _this10.userInput = _ref2;
                    },
                    style: { 'width': '9px' },
                    value: filterText,
                    onBlur: this.handleBlur,
                    onFocus: function onFocus(e) {
                        return _this10.props.onUserInputFocus(e);
                    },
                    onChange: function onChange(e) {
                        return _this10.props.onUserInput(e.target.value);
                    },
                    onKeyDown: this.handleKeyDown
                }),
                placeHolder,
                React.createElement('i', null)
            );
        }
    }]);

    return MultiInput;
}(Component);

MultiInput.propTypes = {
    onUserInputFocus: PropTypes.func,
    onUserInput: PropTypes.func,
    filterText: PropTypes.string,
    disabled: PropTypes.bool
};

module.exports = dropDownCmp(documentClickCmp(defaultCheckedCmp(DropDown)), ['top', 'bottom']);