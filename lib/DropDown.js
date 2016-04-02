'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var DocumentClickMixin = require('./mixin/DocumentClickMixin');

var _require = require('./mixin/keyCode');

var BACKSPACE_KC = _require.BACKSPACE_KC;


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
    formatYieldChildren: function formatYieldChildren(children) {
        var _this = this;

        var _props3 = this.props;
        var labelName = _props3.labelName;
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
                nodes.push(_this.formatOptionCell({ label: item_label, value: item_val, selected: selected, children: props.children }));
            }
        });
        return React.createElement(
            'div',
            { className: 'ui dropdown', style: style },
            multi ? this.formatMultiInput(tags) : React.createElement(
                DropDown.label,
                { onClick: function onClick() {
                        return _this.toggleOpen(!open);
                    } },
                placeHolder
            ),
            this.formatDropList(nodes)
        );
    },
    formatChildren: function formatChildren(children) {
        var _this2 = this;

        var _props4 = this.props;
        var labelName = _props4.labelName;
        var valueName = _props4.valueName;
        var searchable = _props4.searchable;
        var multi = _props4.multi;
        var style = _props4.style;
        var placeHolder = this.props.placeHolder;
        var _state3 = this.state;
        var filterText = _state3.filterText;
        var value = _state3.value;
        var options = _state3.options;
        var open = _state3.open;

        var tags = [],
            node = null,
            nodes = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var pair = _step.value;

                var pair_val = pair[valueName];
                var pair_label = pair[labelName];
                var selected = false;
                if (multi) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var el = _step2.value;

                            selected = el === pair_val;
                            if (selected) {
                                if (tags.indexOf(pair_label) === -1) tags[value.indexOf(pair_val)] = pair_label;
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
                } else {
                    selected = value === pair_val;
                    if (selected) placeHolder = pair_label;
                }

                node = this.formatOptionCell({ label: pair_label, value: pair_val, selected: selected, children: pair.children });
                if (multi || searchable) {
                    if (this.getFilterStatus(filterText, pair_val, pair_label)) nodes.push(node);
                } else {
                    nodes.push(node);
                }
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

        return React.createElement(
            'div',
            { className: 'ui dropdown', style: style },
            multi ? this.formatMultiInput(tags) : React.createElement(
                DropDown.label,
                { onClick: function onClick() {
                        return _this2.toggleOpen(!open);
                    } },
                placeHolder
            ),
            this.formatDropList(nodes)
        );
    },
    getFilterStatus: function getFilterStatus(text) {
        var status = false;

        for (var _len = arguments.length, fields = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            fields[_key - 1] = arguments[_key];
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = fields[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var val = _step3.value;

                if (String(val).indexOf(text) !== -1) {
                    status = true;
                    break;
                }
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

        return status;
    },
    formatOptionCell: function formatOptionCell(_ref) {
        var _this3 = this;

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
                { onClick: function onClick() {
                        return _this3.handleChangeSelect(value);
                    },
                    selected: selected },
                content
            )
        );
    },
    formatSearchBar: function formatSearchBar() {
        var _this4 = this;

        var _state4 = this.state;
        var filterText = _state4.filterText;
        var open = _state4.open;
        var placeHolder = this.props.placeHolder;

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: '_search' },
                React.createElement('input', { className: '_searchbar', value: filterText, ref: 'userInput',
                    type: 'text', onChange: function onChange(e) {
                        return _this4.handleSearch(e.target.value);
                    }, placeholder: placeHolder })
            )
        );
    },
    formatDropList: function formatDropList(nodes) {
        var open = this.state.open;
        var searchable = this.props.searchable;

        var className = '_list';
        if (open) className = className + ' _active';

        return React.createElement(
            'div',
            { className: className },
            searchable ? this.formatSearchBar() : null,
            React.createElement(
                'ul',
                null,
                nodes
            )
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
    onOtherDomClick: function onOtherDomClick(e) {
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
        var _props5 = this.props;
        var multi = _props5.multi;
        var onSelect = _props5.onSelect;
        var value = this.state.value;

        if (multi) value = Object.assign([], value);
        onSelect(value);
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

        var node = children ? this.formatYieldChildren(children) : this.formatChildren(children);
        return node;
    }
});

// dropdown option
DropDown.Option = React.createClass({
    displayName: 'Option',
    render: function render() {
        var selected = this.props.selected;

        return React.createElement('div', _extends({ className: selected ? '_active _item' : '_item'
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

        if (keyCode === BACKSPACE_KC && value === '') this.props.onSelectChange();
        e.target.style.width = (value.length + 1) * 12 + 'px';
    },
    handleBlur: function handleBlur(e) {
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

        var _props6 = this.props;
        var selectedTags = _props6.selectedTags;
        var filterText = _props6.filterText;
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