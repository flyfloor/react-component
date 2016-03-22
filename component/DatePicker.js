const React = require('react');
const {dateStr2Obj, obj2DateStr} = require('./util/date');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const Calender = require('./Calender');

const DatePicker = React.createClass({
    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: React.PropTypes.func
    },
    getInitialState() {
        let value = this.initDate();
        return {
            value,
            showPicker: false,
        };
    },

    initDate(defaultValue=this.props.value){
        let {year, month, day} = dateStr2Obj(defaultValue, this.dateParams());
        return obj2DateStr(year, month, day)
    },

    dateParams(){
        return {
            begin: this.props.begin,
            end: this.props.end,
        }
    },

    handleValChange(value){
        this.setState({
            value,
            showPicker: false
        });
        if (this.props.onChange) this.props.onChange(value);
    },

    onOtherDomClick(e){
        this.setState({
            showPicker: false
        });
    },

    render() {
        return (
            <div className="ui date-picker">
                <input className="_input" onClick={ () => {this.setState({ showPicker: true }) }} value={this.state.value}readOnly/>
                {this.state.showPicker ? <div className="_picker">
                                            <Calender begin={this.props.begin} end={this.props.end} value={this.state.value} onChange={this.handleValChange}></Calender>
                                        </div> : null
                }
            </div>
        );
    }
});


module.exports = DatePicker;