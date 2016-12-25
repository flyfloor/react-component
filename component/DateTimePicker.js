const React = require('react')
const PropTypes = React.PropTypes
const ReactCssTransitionGroup = require('react-addons-css-transition-group')

const Calender = require('./Calender')
const klassName = require('./util/className')
const SelectorList = require('./time-picker/SelectorList')
const DocumentClickMixin = require('./mixin/DocumentClickMixin')
const datetime = require('./util/datetime')
const {formatDate, extractDate} = datetime

const DateTimePicker = React.createClass({
    mixins: [DocumentClickMixin],
    propTypes: {
        format: PropTypes.string.isRequired,
        value: PropTypes.instanceOf(Date),
        onChange: PropTypes.func.isRequired,
    },
    getDefaultProps() {
        return {
            format: 'yyyy-MM-dd',
            value: new Date(),
        };
    },
    getInitialState() {
        const {value, minute, second, hour } = this.initDateTime();
        if (value !== this.props.value) {
            this.props.onChange(value)
        }
        return { 
            value, 
            minute, 
            second, 
            hour, 
            open: false,
            showDate: true,
        };
    },

    initDateTime(date = this.props.value){
        return Object.assign(extractDate(date, { showTime: true }), { value: date })
    },

    handleDateChange(date){
        let {hour, minute, second} = this.state
        date.setHours(hour, minute, second)
        this.setState({
            value: date
        }, () => this.props.onChange(date));
    },

    handleTimeChange(type='hour', val){
        this.setState({
            [type]: val
        }, () => {
            let {hour, minute, second, value} = this.state
            if (value) {
                value.setHours(hour, minute, second)
                this.setState({
                    value
                }, () => this.props.onChange(value));
            }
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value.getTime() !== this.props.value.getTime()) {
            this.setState(this.initDateTime(nextProps.value));
        }
    },

    onOtherDomClick(){
        this.handleOpen(false)
    },

    handleOpen(open){
        this.setState({
            open,
            showDate: open,
        });
    },

    togglePicker(){
        let {showDate} = this.state
        this.setState({
            showDate: !showDate
        });
    },

    render() {
        let {className, begin, end, format} = this.props
        const {hour, second, minute, value, showDate, open} = this.state
        let date = formatDate(value, `${format} hh:mm:ss`)
        let pickerNode = showDate ? 
                            <div className="_datepicker">
                                <Calender showPreview={false} begin={begin} 
                                    end={end} value={new Date(value.getTime())} onChange={this.handleDateChange} />
                                <div className="_action">
                                    <a href="javascript:;" className="_selector" onClick={this.togglePicker}>选择时间</a>
                                    <button className="_button" onClick={() => this.handleOpen(false)}>确认</button>
                                </div>
                            </div>
                            : <div className="_timepicker">
                                <SelectorList hour={hour} second={second} 
                                    minute={minute} onChange={this.handleTimeChange} />
                                <div className="_action">
                                    <a href="javascript:;" className="_selector" onClick={this.togglePicker}>选择日期</a>
                                    <button className="_button" onClick={() => this.handleOpen(false)}>确认</button>
                                </div>
                            </div>
        return (
            <div className={klassName('datetime-picker', className)}>
                <input type="text" className="_input" readOnly value={date} onClick={() => this.handleOpen(true)} />
                <ReactCssTransitionGroup className="_wrap" transitionName="datetime"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ? 
                        pickerNode
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
})

module.exports = DateTimePicker
