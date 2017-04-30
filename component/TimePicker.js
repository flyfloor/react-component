const React = require('react')
const PropTypes = require('prop-types')
const Component = React.Component
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const klassName = require('./util/className')
const TimeInput = require('./TimeInput')
const timeInputCmp = require('./high-order/timeInputCmp')
const documentClickCmp = require('./high-order/documentClickCmp')
const SelectorList = require('./time-picker/SelectorList')
const timeStr2Obj = require('./util/time').timeStr2Obj
const obj2TimeStr = require('./util/time').obj2TimeStr

class TimePicker extends Component {
    constructor(props) {
        super(props);
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleInputClick = this.handleInputClick.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)

        let {value=""} = this.initTime();
        let {hour, minute, second} = timeStr2Obj(value)
        this.state = { 
            open: false,
            value, 
            hour,
            minute,
            second,
        }
    }
    
    onOtherDomClick(){
        this.setState({
            open: false
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let {value} = this.initTime(nextProps.value)
            let {hour, minute, second} = timeStr2Obj(value)
            this.setState({
                value, hour, minute, second,
            });
        }
    }

    handleValueChange(value){
       this.props.onChange(value)
    }

    handleInputClick(){
        const {onClick} = this.props
        this.setState({
            open: true
        });
        if (onClick) onClick()
    }

    handleBlur(value){
        const {onBlur} = this.props
        let {hour, minute, second} = timeStr2Obj(value)
        this.setState({
            hour, minute, second, value
        });
        if (onBlur) onBlur()
    }

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
    }

    render() {
        const {value, open, hour, second, minute} = this.state
        let {simple, className, onFocus} = this.props
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
                        <SelectorList simple={simple} hour={hour} second={second} minute={minute} onChange={this.handleTimeChange} />
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
TimePicker.propTypes = {
    simple: PropTypes.bool,
    className: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
}

module.exports = timeInputCmp(documentClickCmp(TimePicker))
