const React = require('react')
const ReactDOM = require('react-dom')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const klassName = require('./util/className')
const TimeInput = require('./TimeInput')
const TimeInputMixin = require('./mixin/TimeInputMixin')
const DocumentClickMixin = require('./mixin/DocumentClickMixin')
const timeStr2Obj = require('./util/time').timeStr2Obj
const obj2TimeStr = require('./util/time').obj2TimeStr

const TimePicker = React.createClass({
    mixins: [TimeInputMixin, DocumentClickMixin],

    getDefaultProps() {
        let _d = new Date()
        let value = `${_d.getHours()}:${_d.getMinutes()}:${_d.getSeconds()}`
        return {
            simple: false,
            value,
            className: '',
            placeHolder: 'input time',
        };
    },

    getInitialState() {
        let {value=""} = this.initTime();
        if (value !== this.props.value) {
            this.props.onChange(value)
        }
        let {hour, min, sec} = timeStr2Obj(value)
        return { 
            open: false,
            value, 
            hour,
            min,
            sec,
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
            let {hour, min, sec} = timeStr2Obj(value)
            this.setState({
                value, hour, min, sec,
            });
        }
    },

    handleValueChange(value){
       this.props.onChange(value)
    },

    handleFocus(){
        this.setState({
            open: true
        }, this.handleInitScroll);
    },

    handleInitScroll(){
        this.initScrollTo('hour')
        this.initScrollTo('min')
        this.initScrollTo('sec')
    },

    initScrollTo(type){
        let val = this.state[type]
        let dom = ReactDOM.findDOMNode(this.refs[type + 'List'])
        if (dom) {
            let selected = dom.children[0].children[parseInt(val)]
            let to = selected.offsetTop
            dom.scrollTop = to
        }
    },

    handleBlur(value){
        let {hour, min, sec} = timeStr2Obj(value)
        this.setState({
            hour, min, sec, value
        });
    },

    handleTimeChange(type='hour', val){
        this.setState({
            [type]: val
        }, () => {
            let {hour, min, sec} = this.state
            let value = obj2TimeStr({hour, min, sec})
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
        const {value, open} = this.state
        return (
            <div className={klassName('timepicker')}>
                <TimeInput onChange={this.handleValueChange} value={value} 
                    onFocus={this.handleFocus} onBlur={this.handleBlur} />
                <ReactCssTransitionGroup className="_wrap" transitionName="timepicker"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ? 
                        <div>
                            <div className="_list _hour" ref="hourList">
                                {this.formatSelectList('hour')}
                            </div>
                            <div className="_list _min" ref="minList">
                                {this.formatSelectList('min')}
                            </div>
                            <div className="_list _sec" ref="secList">
                                {this.formatSelectList('sec')}
                            </div>
                        </div>
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
})

module.exports = TimePicker
