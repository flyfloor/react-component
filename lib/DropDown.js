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
var updatePropsCmp = require('./high-order/updatePropsCmp');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var documentClickCmp = require('./high-order/documentClickCmp');
var BACKSPACE_KEYCODE = require('./util/constants').BACKSPACE_KEYCODE;
var klassName = require('./util/className');

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
        value = value || default_val;
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
                valueName = _props2.valueName;
            var options = nextProps.options,
                children = nextProps.children;
            // not multi, have no value，defaultSelected

            if (!multi && defaultSelected && !this.state.value) {
                // options
                if (options && this.props.options !== options && options.length > 0) {
                    this.setState({
                        value: options[0][valueName]
                    }, function () {
                        return _this2.props.onChange(_this2.state.value);
                    });
                    return;
                }
                // yield children
                if (children && this.props.children !== children && children.length > 0) {
                    this.setState({
                        value: children[0].props[valueName]
                    }, function () {
                        return _this2.props.onChange(_this2.state.value);
                    });
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            var _props3 = this.props,
                multi = _props3.multi,
                defaultSelected = _props3.defaultSelected,
                valueName = _props3.valueName,
                options = _props3.options,
                children = _props3.children;

            if (!multi && !this.state.value && defaultSelected) {
                if (options && options.length > 0) {
                    this.setState({
                        value: options[0][valueName]
                    }, function () {
                        return _this3.props.onChange(_this3.state.value);
                    });
                    return;
                }
                if (children && children.length > 0) {
                    this.setState({
                        value: children[0].props[valueName]
                    }, function () {
                        return _this3.props.onChange(_this3.state.value);
                    });
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
            var _this4 = this;

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

                if (_this4.filterTextMatched(filterText, item_label, item_val)) {
                    nodes.push(_this4.formatOptionCell({
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
                    DropDownLabel,
                    { isPlaceHolder: value === '', onClick: function onClick() {
                            return _this4.toggleOpen(!open);
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
        }

        // dropdown label

    }, {
        key: 'formatLabelNode',
        value: function formatLabelNode(labels) {
            var _this5 = this;

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
                    DropDownLabel,
                    { isPlaceHolder: value === '', onClick: function onClick() {
                            return _this5.toggleOpen(!open);
                        } },
                    labels
                );
            }
            return labelNode;
        }

        // generate nodes and label by options prop

    }, {
        key: 'getNodesAndLabel',
        value: function getNodesAndLabel() {
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
                    if (this.filterTextMatched(filterText, pair_val, pair_label)) optionNodes.push(node);
                } else {
                    optionNodes.push(node);
                }
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
                this.formatLabelNode(displayLabels),
                React.createElement(
                    ReactCssTransitionGroup,
                    { className: '_list', transitionName: 'dropdown',
                        transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
                    open ? optionNodes : null
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

        // format option each cell

    }, {
        key: 'formatOptionCell',
        value: function formatOptionCell(_ref) {
            var _this6 = this;

            var label = _ref.label,
                value = _ref.value,
                selected = _ref.selected,
                children = _ref.children,
                disabled = _ref.disabled;

            var content = children ? children : label;
            var node = disabled ? React.createElement(
                DropDownOption,
                { key: value, disabled: disabled, selected: selected },
                content
            ) : React.createElement(
                DropDownOption,
                { key: value, disabled: disabled, selected: selected, onClick: function onClick() {
                        return _this6.handleChangeSelect(value);
                    } },
                content
            );
            return node;
        }

        // searchable search bar

    }, {
        key: 'formatSearchBar',
        value: function formatSearchBar(text) {
            var _this7 = this;

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
                        return _this7.toggleOpen(true);
                    } },
                filterText ? React.createElement('div', { className: '_text' }) : React.createElement(
                    'div',
                    { className: className },
                    text
                ),
                React.createElement('input', { type: 'text', className: '_input', ref: 'userInput', value: filterText,
                    onChange: function onChange(e) {
                        return _this7.handleSearch(e.target.value);
                    } }),
                React.createElement('i', null)
            );
        }

        // multi dropdown's input

    }, {
        key: 'formatMultiInput',
        value: function formatMultiInput(tags) {
            var _this8 = this;

            return React.createElement(MultiInput, { filterText: this.state.filterText,
                onSelectChange: this.multiBarValChangeByIndex, onUserInputFocus: function onUserInputFocus() {
                    return _this8.toggleOpen(true);
                },
                onUserInput: this.handleSearch, onClick: this.toggleOpen, selectedTags: tags });
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
            var _this9 = this;

            this.formatValue(val, function () {
                _this9.triggerDropValueChange();
                _this9.toggleOpen(_this9.props.multi);
            });
        }

        // value change, trigger onChange event

    }, {
        key: 'triggerDropValueChange',
        value: function triggerDropValueChange() {
            var _props8 = this.props,
                multi = _props8.multi,
                onChange = _props8.onChange;
            var value = this.state.value;

            if (multi) value = Object.assign([], value);
            onChange(value);
        }

        // dropdown open or close, clean filter text

    }, {
        key: 'toggleOpen',
        value: function toggleOpen(stat) {
            this.setState({
                open: stat,
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
    onChange: PropTypes.func.isRequired,
    labelName: PropTypes.string,
    valueName: PropTypes.string,
    defaultSelected: PropTypes.bool,
    searchable: PropTypes.bool,
    multi: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element)
};

DropDown.defaultProps = {
    labelName: 'name',
    valueName: 'value',
    multi: false,
    className: '',
    placeHolder: 'click to select...'
};

var DropDownOption = function DropDownOption(props) {
    var selected = props.selected,
        disabled = props.disabled;

    var className = '_item';
    if (disabled) {
        className += ' _disabled';
    }
    if (selected) {
        className += ' _active';
    }
    return React.createElement('div', _extends({ className: className
    }, props));
};

// dropdown label
var DropDownLabel = function DropDownLabel(props) {
    var _props = Object.assign({}, props);
    var isPlaceHolder = _props.isPlaceHolder;

    var className = '_label';
    if (isPlaceHolder) {
        className += ' _placeHolder';
    }
    delete _props.isPlaceHolder;
    return React.createElement('div', _extends({ className: className }, _props));
};

// multi dropdown input field

var MultiInput = function (_Component2) {
    _inherits(MultiInput, _Component2);

    function MultiInput(props) {
        _classCallCheck(this, MultiInput);

        var _this10 = _possibleConstructorReturn(this, (MultiInput.__proto__ || Object.getPrototypeOf(MultiInput)).call(this, props));

        _this10.handleClick = _this10.handleClick.bind(_this10);
        _this10.handleKeyDown = _this10.handleKeyDown.bind(_this10);
        _this10.handleBlur = _this10.handleBlur.bind(_this10);
        _this10.removeSelected = _this10.removeSelected.bind(_this10);

        _this10.state = {
            hasInput: false
        };
        return _this10;
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
            this.setState({
                hasInput: false
            });
            this.inputField().style.width = '9px';
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
            return ReactDOM.findDOMNode(this.refs.userInput);
        }
    }, {
        key: 'inputFieldFocus',
        value: function inputFieldFocus() {
            this.inputField().focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this11 = this;

            var _props9 = this.props,
                selectedTags = _props9.selectedTags,
                filterText = _props9.filterText;
            var hasInput = this.state.hasInput;

            var tagNodes = selectedTags.map(function (tag, index) {
                return React.createElement(
                    'span',
                    { className: '_tag', key: index, onClick: function onClick() {
                            return _this11.removeSelected(index);
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
                        return _this11.props.onUserInputFocus(e);
                    },
                    onChange: function onChange(e) {
                        return _this11.props.onUserInput(e.target.value);
                    }, onKeyDown: this.handleKeyDown }),
                placeHolder,
                React.createElement('i', null)
            );
        }
    }]);

    return MultiInput;
}(Component);

module.exports = documentClickCmp(updatePropsCmp(DropDown));