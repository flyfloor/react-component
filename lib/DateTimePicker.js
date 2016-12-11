'use strict';

var React = require('react');
var Calender = require('./Calender');

var DateTimePicker = React.createClass({
    displayName: 'DateTimePicker',
    render: function render() {
        var props = this.props;

        return React.createElement(
            'div',
            null,
            React.createElement(Calender, props)
        );
    }
});

module.exports = DateTimePicker;