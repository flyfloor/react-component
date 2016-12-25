const React = require('react')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const klassName = require('./util/className')
const TimeInput = require('./TimeInput')
const TimeInputMixin = require('./mixin/TimeInputMixin')
const DocumentClickMixin = require('./mixin/DocumentClickMixin')
const SelectorList = require('./time-picker/SelectorList')
const timeStr2Obj = require('./util/time').timeStr2Obj
const obj2TimeStr = require('./util/time').obj2TimeStr

const TimePicker = React.createClass({
    mixins: [TimeInputMixin, DocumentClickMixin],

    getDefaultProps() {
        return {
            simple: false,
            className: '',
            placeHolder: 'input time',
        };
    },

    getInitialState() {
        let {value=""} = this.initTime();
        if (value !== this.props.value) {
            this.props.onChange(value)
        }
        let {hour, minute, second} = timeStr2Obj(value)
        return { 
            open: false,
            value, 
            hour,
            minute,
            second,
        };
    },

    onOtherDomClick(){
        this.setState({
            open: false
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let {value} = this.initTime(nextProps.value)
            let {hour, minute, second} = timeStr2Obj(value)
            this.setState({
                value, hour, minute, second,
            });
        }
    },

    handleValueChange(value){
       this.props.onChange(value)
    },

    handleFocus(){
        this.setState({
            open: true
        });
    },

    handleBlur(value){
        let {hour, minute, second} = timeStr2Obj(value)
        this.setState({
            hour, minute, second, value
        });
    },

    handleTimeChange(type='hour', val){
        this.setState({
            [type]: val
        }, () => {
            let {hour, minute, second} = this.state
            let value = obj2TimeStr({hour, minute, second})
            this.setState({
                value
            });
            this.props.onChange(value)
        });
    },

    formatSelectList(type='hour'){
        let val = this.state[type]
        let max = type === 'hour' ? 24 : 60
        let nodes = []
        for (let i = 0; i < max; i++) {
            let _i = i < 10 ? `0${i}` : String(i)
            nodes.push(
                <li key={`${type}-${i}`} className={val == _i ? '_item _active' : '_item'}
                    onClick={() => this.handleTimeChange(type, _i)}>
                    <span>{_i}</span>
                </li>
            )
        }
        return (
            <ul>{nodes}</ul>
        )
    },

    render() {
        const {value, open, hour, second, minute} = this.state
        let {simple, className} = this.props
        className = klassName(className, 'timepicker', simple ? '_simple': '')
        return (
            <div className={className}>
                <TimeInput simple={simple} onChange={this.handleValueChange} value={value} 
                    onFocus={this.handleFocus} onBlur={this.handleBlur} />
                <ReactCssTransitionGroup className="_wrap" transitionName="timepicker"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ? 
                        <SelectorList simple={simple} hour={hour} second={second} minute={minute} onChange={this.handleTimeChange} />
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
})

module.exports = TimePicker
