const React = require('react')
const PropTypes = React.PropTypes
const ReactCssTransitionGroup = require('react-addons-css-transition-group')

const Calendar = require('./Calendar')
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
        confirm: PropTypes.element,
        placeHolder: PropTypes.string,
    },
    getDefaultProps() {
        return {
            format: 'yyyy-MM-dd',
            confirm: <button>confirm</button>,
            placeHolder: 'select date',
        };
    },
    getInitialState() {
        const {value, minute, second, hour } = this.initDateTime();
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
        if (!date) {
            // default value is undefined
            let nowDateObj = extractDate(new Date(), { showTime: true })
            let hour = nowDateObj.hour
            let minute = nowDateObj.minute
            let second = nowDateObj.second
            return { minute, second, hour }
        }
        return Object.assign(extractDate(date, { showTime: true }), { value: date })
    },

    handleDateChange(date){
        let {hour, minute, second} = this.state
        // intialize default time
        if (!hour || !minute || !second) {
            let nowDateObj = extractDate(new Date(), { showTime: true })
            hour = nowDateObj.hour
            minute = nowDateObj.minute
            second = nowDateObj.second
            this.setState({ hour, minute, second })
        }
        date.setHours(hour, minute, second)
        this.setState({
            value: date
        }, () => {
            // onChange date
            this.props.onChange(new Date(date.getTime()))
        })
    },

    handleTimeChange(type='hour', val){
        this.setState({
            [type]: val
        }, () => {
            let {hour, minute, second, value} = this.state
            if (!value) {
                value = new Date()
            }

            value.setHours(hour, minute, second)
            this.setState({
                value
            }, () => {
                // onChange date
                this.props.onChange(new Date(value.getTime()))
            })
        });
    },

    componentWillReceiveProps(nextProps) {
        if (!nextProps.value) {
            return
        }
        // not have value or value changed
        if (!this.props.value || nextProps.value.getTime() !== this.props.value.getTime()) {
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

    handleConfirm(){
        let {value, minute, hour, second} = this.state
        let {begin, end} = this.props
        let _preventClose = false
        if (!value) {
            value = new Date()
            value.setHours(hour, minute, second)
            if (begin && value < begin) {
                value = new Date(begin.getTime())
                _preventClose = true
            }
            if (end && value > end) {
                value = new Date(end.getTime())
                _preventClose = true
            }
            this.setState({
                value
            }, () => {
                // onChange date
                this.props.onChange(new Date(value.getTime()))
            });
            if (_preventClose) {
                return
            }
        }
        this.handleOpen(false)
    },

    togglePicker(){
        let {showDate} = this.state
        this.setState({
            showDate: !showDate
        });
    },

    render() {
        let {className, begin, end, format, confirm, placeHolder} = this.props
        const {hour, second, minute, value, showDate, open} = this.state
        let date = formatDate(value, `${format} hh:mm:ss`)
        let pickerNode = showDate ? 
                            <div className="_datepicker">
                                {value ? 
                                    <Calendar showPreview={false} begin={begin} 
                                        end={end} value={new Date(value.getTime())} onChange={this.handleDateChange} />
                                    : <Calendar showPreview={false} begin={begin} 
                                        end={end} onChange={this.handleDateChange} />
                                }
                                <div className="_action">
                                    <a href="javascript:;" className="_selector" onClick={this.togglePicker}>选择时间</a>
                                    <span className="_button" onClick={this.handleConfirm}>{confirm}</span>
                                </div>
                            </div>
                            : <div className="_timepicker">
                                <SelectorList hour={hour} second={second} 
                                    minute={minute} onChange={this.handleTimeChange} />
                                <div className="_action">
                                    <a href="javascript:;" className="_selector" onClick={this.togglePicker}>选择日期</a>
                                    <span className="_button" onClick={this.handleConfirm}>{confirm}</span>
                                </div>
                            </div>
        return (
            <div className={klassName('datetime-picker', className)}>
                <div className="_input" onClick={() => this.handleOpen(true)}>
                    <input type="text" placeholder={placeHolder} readOnly value={date} />
                    <i></i>
                </div>
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
