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
                options = _props2.options;

            if (nextProps.options !== options) {
                if (!defaultSelected) {
                    this.setState({
                        value: multi ? [] : ''
                    }, function () {
                        return _this2.props.onChange(_this2.state.value);
                    });
                } else {
                    this.initDefaultValue({
                        multi: multi,
                        props: nextProps
                    });
                }
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

                if (_this3.filterTextMatched(filterText, item_label, item_val)) {
                    nodes.push(_this3.formatOptionCell({
                        label: item_label,
                        value: item_val,
                        selected: selected,
                        children: props.children,
                        disabled: props.disabled
                    }));
                }
            });

            var labelNode = this.formatLabelNode(multi ? tags : placeHolder);

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
            var _this4 = this;

            var _props5 = this.props,
                multi = _props5.multi,
                searchable = _props5.searchable,
                _onClick = _props5.onClick,
                onBlur = _props5.onBlur,
                onFocus = _props5.onFocus;
            var _state2 = this.state,
                open = _state2.open,
                value = _state2.value;

            var labelNode = null;
            if (multi) {
                labelNode = this.formatMultiInput(labels);
            } else {
                labelNode = searchable ? this.formatSearchBar(labels) : React.createElement(
                    DropDownLabel,
                    { onFocus: onFocus, onBlur: onBlur, isPlaceHolder: value === '', onClick: function onClick() {
                            _this4.toggleOpen(!open);
                            if (_onClick) _onClick();
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
            var _this5 = this;

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
                        return _this5.handleChangeSelect(value);
                    } },
                content
            );
            return node;
        }

        // searchable search bar

    }, {
        key: 'formatSearchBar',
        value: function formatSearchBar(text) {
            var _this6 = this;

            var _state4 = this.state,
                filterText = _state4.filterText,
                value = _state4.value;
            var _props8 = this.props,
                _onClick2 = _props8.onClick,
                onBlur = _props8.onBlur,
                onFocus = _props8.onFocus;

            var className = '_text';
            if (value === '') {
                className += ' _placeHolder';
            }
            return React.createElement(
                'div',
                { className: '_search', onClick: function onClick() {
                        _this6.toggleOpen(true);
                        if (_onClick2) _onClick2();
                    } },
                filterText ? React.createElement('div', { className: '_text' }) : React.createElement(
                    'div',
                    { className: className },
                    text
                ),
                React.createElement('input', { type: 'text', className: '_input', ref: 'userInput', value: filterText,
                    onBlur: onBlur, onFocus: onFocus,
                    onChange: function onChange(e) {
                        return _this6.handleSearch(e.target.value);
                    } }),
                React.createElement('i', null)
            );
        }

        // multi dropdown's input

    }, {
        key: 'formatMultiInput',
        value: function formatMultiInput(tags) {
            var _this7 = this;

            var _props9 = this.props,
                _onClick3 = _props9.onClick,
                onBlur = _props9.onBlur,
                onFocus = _props9.onFocus;

            return React.createElement(MultiInput, { filterText: this.state.filterText,
                onSelectChange: this.multiBarValChangeByIndex,
                onUserInputFocus: function onUserInputFocus() {
                    _this7.toggleOpen(true);
                    if (onFocus) onFocus();
                },
                onBlur: onBlur, onFocus: onFocus,
                onUserInput: this.handleSearch, onClick: function onClick() {
                    _this7.toggleOpen(true);
                    if (_onClick3) _onClick3();
                }, selectedTags: tags });
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
            var _props10 = this.props,
                multi = _props10.multi,
                onChange = _props10.onChange;
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
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
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
    delete _props.onClick;
    delete _props.onBlur;
    delete _props.onFocus;
    delete _props.isPlaceHolder;
    return React.createElement(
        'div',
        _extends({ className: className }, _props),
        React.createElement('input', { type: 'text', className: '_transparent', readOnly: true, onClick: props.onClick,
            onBlur: props.onBlur, onFocus: props.onFocus }),
        _props.children
    );
};

// multi dropdown input field

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
            var _this10 = this;

            var _props11 = this.props,
                selectedTags = _props11.selectedTags,
                filterText = _props11.filterText;
            var hasInput = this.state.hasInput;

            var tagNodes = selectedTags.map(function (tag, index) {
                return React.createElement(
                    'span',
                    { className: '_tag', key: index, onClick: function onClick() {
                            return _this10.removeSelected(index);
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
                        return _this10.props.onUserInputFocus(e);
                    },
                    onChange: function onChange(e) {
                        return _this10.props.onUserInput(e.target.value);
                    }, onKeyDown: this.handleKeyDown }),
                placeHolder,
                React.createElement('i', null)
            );
        }
    }]);

    return MultiInput;
}(Component);

module.exports = documentClickCmp(defaultCheckedCmp(DropDown));