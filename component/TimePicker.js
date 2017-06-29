const React = require('react')
const Component = React.Component
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const klassName = require('./util/className')
const TimeInput = require('./TimeInput')
const timeInputCmp = require('./high-order/timeInputCmp')
const documentClickCmp = require('./high-order/documentClickCmp')
const dropDownCmp = require('./high-order/dropDownCmp')
const SelectorList = require('./time-picker/SelectorList')
const timeUtil = require('./util/time')
const {seconds2Obj, obj2Seconds} = timeUtil

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleInputClick = this.handleInputClick.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)

        let {value} = this.initTime({value: props.value});
        this.state = { 
            open: false,
            value,
        }
    }
    
    onOtherDomClick(){
        this.setState({
            open: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let {value} = this.initTime({ value: nextProps.value })
            this.setState({
                value
            }, () => this.props.onChange(value));
        }
    }

    handleValueChange(val){
        let {value} = this.initTime({ value: val })
        if (value !== this.state.value) {
            this.setState({
                value
            });
            this.props.onChange(value)
        }
    }

    handleInputClick(){
        const {onClick} = this.props
        this.setState({
            open: true
        });
        if (onClick) onClick()
    }

    handleBlur(){
        const {onBlur} = this.props
        if (onBlur) onBlur()
    }

    handleTimeChange(type='hour', val){
        let {value} = this.state
        let valueObj = seconds2Obj(value)
        valueObj[type] = val
        value = obj2Seconds(valueObj)

        this.setState({
            value,
        }, () => this.props.onChange(value));
    }

    render() {
        let {simple, className, onFocus} = this.props
        const {value, open} = this.state
        const {hour, second, minute} = seconds2Obj(value)

        className = klassName(className, 'timepicker', simple ? '_simple': '')
        return (
            <div className={className}>
                <TimeInput simple={simple} 
                    onChange={this.handleValueChange} 
                    value={value} 
                    onFocus={onFocus}
                    onClick={this.handleInputClick} 
                    onBlur={this.handleBlur} />
                <ReactCssTransitionGroup className="_wrap" transitionName="timepicker"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ? 
                        <SelectorList simple={simple} hour={hour} 
                         second={second} minute={minute} 
                            onChange={this.handleTimeChange} />
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
}

TimePicker.defaultProps = {
    simple: false,
    className: '',
    placeHolder: 'input time',
}

module.exports = dropDownCmp(timeInputCmp(documentClickCmp(TimePicker)))
