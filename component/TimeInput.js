const React = require('react')
const klassName = require('./util/className')
const TimeInputMixin = require('./mixin/TimeInputMixin')

const TimeInput = React.createClass({
    mixins: [TimeInputMixin],

    handleInputChange(e){
        const {value} = e.target
        this.setState({ inputVal: value })
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
        return { value, inputVal: value };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let {value} = this.initTime(nextProps.value)
            this.setState({
                value,
                inputVal: value
            });
        }
    },

    handleClick(e){
        let {onClick} = this.props
        if (onClick) {
            onClick(e)
        }
    },

    handleOnBlur(){
        const {value} = this.initTime(this.state.inputVal);
        let {onBlur} = this.props
        this.setState({
            inputVal: value
        });
        if (value !== this.state.value) {
            this.setState({ value }, () => this.props.onChange(value));
        }

        if (onBlur) {
            onBlur(value)
        }
    },

    render() {
        const {inputVal} = this.state;
        let {className, placeHolder, simple} = this.props;
        simple = simple ? '_simple' : ''
        className = klassName(className, 'timeinput', simple);
        return (
            <div className={className}>
                <div className="_input">
                    <input type="text" className="_input" placeholder={placeHolder} 
                    onClick={this.handleClick}
                    onBlur={this.handleOnBlur} value={inputVal} 
                        onChange={this.handleInputChange}/>
                    <i></i>
                </div>
            </div>
        );
    }
});


module.exports = TimeInput;