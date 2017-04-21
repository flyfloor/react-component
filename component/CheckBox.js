const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.checkedChange = this.checkedChange.bind(this)
        this.state = {
            checked: props.checked,
        }
    }
    
    checkedChange(e){
        const {onChange, value} = this.props;
        this.setState({
            checked: e.target.checked
        });
        if(onChange) onChange(e, value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            this.setState({
                checked: nextProps.checked
            });
        }
    }

    render() {
        let {disabled, style, className, children} = this.props;
        if (disabled) {
            className = klassName('disabled', className);
        }
        className = klassName(className, 'checkbox');
        const {checked} = this.state;
        return ( 
            <label style={style} className={className}>
                <input type="checkbox" disabled={disabled} 
                    checked={checked} onChange={this.checkedChange}/>
                <span>{children}</span>
            </label>
        )
    }
}

CheckBox.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    className: PropTypes.string,
}

CheckBox.defaultProps = {
    className: '',
    checked: false,
}

module.exports = CheckBox
