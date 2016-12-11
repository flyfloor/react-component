const React = require('react')
const Calender = require('./Calender')

const DateTimePicker = React.createClass({
    render() {
        const {props} = this
        return (
            <div>
                <Calender {...props} />
            </div>
        );
    }
})

module.exports = DateTimePicker
