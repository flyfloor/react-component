const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class Progress extends Component {
    render() {
        let {value, className, status, size, disabled, children} = this.props;
        if (value < 0) value = 0;
        if (value > 100) value = 100;
        className = klassName(className, 'progress');

        if (status) {
            className += ` _${status}`;
        }
        if (disabled) {
            className += ` _disabled`;
        }
        if (value === 100) {
            className += ' _completed';
        }
        if (children) {
            className += ' _context';
        }

        if (size) {
            className += ` _${size}`
        }


        return (
            <div className={className}>
                <div className="_progress" style={{'width': `${value}%`}}>
                    {children}
                </div>
            </div>
        );
    }
}


Progress.propTypes = {
    value: PropTypes.number,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['large', 'normal', 'small']),
    status: PropTypes.oneOf(['warning', 'failed', 'success', 'active'])
}

Progress.defaultProps = {
    value: 0,
    className: '',
}

module.exports = Progress;
