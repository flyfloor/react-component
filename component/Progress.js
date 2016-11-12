const React = require('react')
const klassName = require('./util/className')
const PropTypes = React.PropTypes

const Progress = React.createClass({
    propTypes: {
        value: PropTypes.number,
        disabled: PropTypes.bool,
        size: PropTypes.oneOf(['large', 'normal', 'small']),
        status: PropTypes.oneOf(['warning', 'failed', 'success'])
    },
    
    getDefaultProps() {
        return {
            value: 0,
            className: '',
        };
    },

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
});

module.exports = Progress;
