const React = require('react')
const PropTypes = React.PropTypes
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const formatDate = require('./util/datetime').formatDate
const DocumentClickMixin = require('./mixin/DocumentClickMixin')
const Calender = require('./Calender')
const klassName = require('./util/className')

const DatePicker = React.createClass({
    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: PropTypes.func.isRequired,
        showPreview: PropTypes.bool,
        format: PropTypes.string.isRequired,
        value: PropTypes.instanceOf(Date),
    },

    getDefaultProps() {
        return {
            className: '',
            placeHolder: 'select date',
            showPreview: true,
            format: 'yyyy-MM-dd',
        };
    },

    getInitialState() {
        const value = this.initDate();
        if (value !== this.props.value) {
            this.props.onChange(value)
        }
        return { value, open: false };
    },

    initDate(date=this.props.value){
        if (!date) {
            return 
        }
        date = date ? new Date(date.getTime()) : new Date()
        date.setHours(0,0,0,0)

        return date
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
        this.setState({
            value,
            open: false
        });
        this.props.onChange(new Date(value.getTime()))
    },

    onOtherDomClick(){
        this.setState({
            open: false
        });
    },

    render() {
        const {open, value} = this.state;
        let {begin, end, className, placeHolder, showPreview, format} = this.props;
        let valueStr = value ? formatDate(value, format) : ''
        if (open) className += ' _active';
        return (
            <div className={klassName('datepicker', className)}>
                <div className="input" onClick={() => {this.setState({ open: true }) }}>
                    <input type="text" className="_input" value={valueStr} readOnly placeholder={placeHolder} />
                    <i></i>
                </div>
                <ReactCssTransitionGroup className="_picker" transitionName="datepicker"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ?
                        <Calender begin={begin} end={end} showPreview={showPreview}
                            value={value} onChange={this.handleValChange}/>
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
});

module.exports = DatePicker