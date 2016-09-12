const React = require('react');
const klassName = require('./util/className');

const Progress = React.createClass({
    propTypes: {
        value: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        status: React.PropTypes.oneOf(['active', 'failed'])
    },
    
    getDefaultProps() {
        return {
            value: 0,
            className: '',
        };
    },

    render() {
        let {value, className, status, disabled, children} = this.props;
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
