const React = require('react')
const timeStr2Obj = require('./util/time').timeStr2Obj
const klassName = require('./util/className')
const PropTypes = React.PropTypes

const TimeInput = React.createClass({
    propTypes: {
        simple: PropTypes.bool,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        className: PropTypes.string,
        placeHolder: PropTypes.string,
    },

    getDefaultProps() {
        return {
            simple: false,
            value: '',
            className: '',
            placeHolder: 'input time',
        };
    },

    getInitialState() {
        let {value=""} = this.initTime();
        if (value !== this.props.value) {
            this.props.onChange(value)
        }
        return { value };
    },

    initTime(val = this.props.value){
        const {simple} = this.props;
        let {hour, min, sec} = timeStr2Obj(val, { simple });
        let value = this.formatValue(hour, min, sec);
        if (!val) {
            return {}
        }
        return {value}
    },

    formatValue(hour, min, sec){
        return this.props.simple ? `${hour}:${min}` : `${hour}:${min}:${sec}`
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState(this.initTime(nextProps.value));
        }
    },

    handleInputChange(e){
        const {value} = e.target
        this.setState({ value })
    },

    handleOnBlur(){
        const {value} = this.initTime(this.state.value);
        if (value !== this.state.value) {
            this.setState({ value }, () => this.props.onChange(value));
        }
    },

    render() {
        const {value} = this.state;
        let {className, placeHolder} = this.props;
        className = klassName(className, 'timeinput');
        return (
            <div className={className}>
                <input type="text" className="_input" placeholder={placeHolder} onBlur={this.handleOnBlur} value={value} 
                    onChange={this.handleInputChange}/>
            </div>
        );
    }
});


module.exports = TimeInput;