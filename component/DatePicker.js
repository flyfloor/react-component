const React = require('react')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const dateUtil = require('./util/date')
const {dateStr2Obj, obj2DateStr} = dateUtil
const DocumentClickMixin = require('./mixin/DocumentClickMixin')
const Calender = require('./Calender')
const klassName = require('./util/className')

const DatePicker = React.createClass({
    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            className: '',
        };
    },

    getInitialState() {
        const value = this.initDate();
        return { value, open: false };
    },

    initDate(defaultValue=this.props.value){
        const {year, month, day} = dateStr2Obj(defaultValue, this.dateParams());
        return obj2DateStr(year, month, day);
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: this.initDate(nextProps.value)
            });
        }
    },

    dateParams(){
        const {begin, end} = this.props;
        return { begin, end };
    },

    handleValChange(value){
        const {onChange} = this.props;
        this.setState({
            value,
            open: false
        });
        if (onChange) onChange(value);
    },

    onOtherDomClick(){
        this.setState({
            open: false
        });
    },

    render() {
        const {open, value} = this.state;
        let {begin, end, className} = this.props;
        if (open) className += ' _active';
        return (
            <div className={klassName('datepicker', className)}>
                <div className="input" onClick={() => {this.setState({ open: true }) }}>
                    <input type="text" className="_input" value={value} readOnly/>
                    <i></i>
                </div>
                <ReactCssTransitionGroup className="_picker" transitionName="datepicker"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ?
                        <Calender begin={begin} end={end} 
                            value={value} onChange={this.handleValChange}/>
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
});

module.exports = DatePicker