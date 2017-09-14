const React = require('react')
const Component = React.Component
const klassName = require('./util/className')
const timeInputCmp = require('./high-order/timeInputCmp')

class TimeInput extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
        
        let {value, displayValue} = this.initTime({ value: props.value });
        this.state = {
            value,
            displayValue,
        }
    }
    
    handleInputChange(e){
        this.setState({ displayValue: e.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            let { value, displayValue} = this.initTime({ value: nextProps.value })
            this.setState({
                value,
                displayValue
            });
        }
    }

    handleClick(e){
        let {onClick} = this.props
        if (onClick) {
            this.inputDOM.focus()
            onClick(e)
        }
    }

    handleOnBlur(){
        const {value, displayValue} = this.initTime({ displayValue: this.state.displayValue});
        let {onBlur} = this.props
        this.setState({
            displayValue
        });
        if (value !== this.state.value) {
            this.setState({ value }, () => this.props.onChange(value));
        }

        if (onBlur) {
            onBlur(value)
        }
    }

    render() {
        const {displayValue} = this.state;
        let {className, placeHolder, simple, onFocus} = this.props;
        simple = simple ? '_simple' : ''
        className = klassName(className, 'timeinput', simple);
        return (
            <div className={className}>
                <div className="_input" onClick={this.handleClick}>
                    <input type="text" className="_input" placeholder={placeHolder} 
                        ref={ input => { this.inputDOM = input } }
                        onFocus={onFocus}
                        onBlur={this.handleOnBlur} value={displayValue} 
                        onChange={this.handleInputChange}/>
                    <i></i>
                </div>
            </div>
        );
    }
}

TimeInput.defaultProps = {
    simple: false,
    className: '',
    placeHolder: 'input time',
}

module.exports = timeInputCmp(TimeInput);