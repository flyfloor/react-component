const React = require('react')
const PropTypes = require('prop-types')
const Component = React.Component
const klassName = require('./util/className')
const timeInputCmp = require('./high-order/timeInputCmp')

class TimeInput extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)

        let {value=""} = this.initTime();
        this.state = {
            value,
            inputVal: value,
        }
    }
    
    handleInputChange(e){
        const {value} = e.target
        this.setState({ inputVal: value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let {value} = this.initTime(nextProps.value)
            this.setState({
                value,
                inputVal: value
            });
        }
    }

    handleClick(e){
        let {onClick} = this.props
        if (onClick) {
            this.refs.inputDOM.focus()
            onClick(e)
        }
    }

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
    }

    render() {
        const {inputVal} = this.state;
        let {className, placeHolder, simple, onFocus} = this.props;
        simple = simple ? '_simple' : ''
        className = klassName(className, 'timeinput', simple);
        return (
            <div className={className}>
                <div className="_input" onClick={this.handleClick}>
                    <input type="text" className="_input" placeholder={placeHolder} 
                        ref="inputDOM" onFocus={onFocus}
                        onBlur={this.handleOnBlur} value={inputVal} 
                        onChange={this.handleInputChange}/>
                    <i></i>
                </div>
            </div>
        );
    }
}

TimeInput.defaultProps = {
    simple: false,
    value: '',
    className: '',
    placeHolder: 'input time',
}
TimeInput.propTypes = {
    simple: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
}

module.exports = timeInputCmp(TimeInput);