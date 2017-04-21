const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class Radio extends Component {
    constructor(props) {
        super(props);
        this.checkedChange = this.checkedChange.bind(this)
    }

    checkedChange(e){
        const {value, onChange} = this.props;
        if(onChange) onChange(e, value);
    }

    render() {
        let {className, checked, disabled, style, children} = this.props;
        className = klassName(className, 'radio');
        if (disabled) {
            className = `${className} _disabled`;
        }
        return (
            <label style={style} className={className}>
                <input type="radio" ref="radioInput" disabled={disabled} checked={checked} onChange={this.checkedChange} />
                <span>{children}</span>
            </label>
        );
    }
}

Radio.propTypes = {
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
}

Radio.defaultProps = {
    className: '',
}

module.exports = Radio;