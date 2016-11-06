const React = require('react')
const PropTypes = React.PropTypes
const klassName = require('./util/className')

const FlashMessage = React.createClass({
    _timer: null,

    propTypes: {
        delay: PropTypes.number,
        close: PropTypes.element,
        onClose: PropTypes.func,
        position: PropTypes.oneOf(['top', 'center', 'bottom']),
    },
    getInitialState() {
        return {
            open: false,
        };
    },

    getDefaultProps() {
        return {
            delay: 5000,
            className: '',
            position: 'top',
            close: <i>x</i>,
        };
    },


    open(){
        const {open} = this.state;
        const {delay} = this.props;
        this.setState({
            open: !open
        });
        
        if (!open ) {
            this._timer = setTimeout(() => this.setState({ open: false}), delay);
        } else {
            this.clearTimer()
        }
    },

    clearTimer(){
        if (this._timer) {
            clearTimeout(this._timer)
            this._timer = null
        }
    },

    handleClose(){
        const {onClose} = this.props;
        onClose();
        this.clearTimer()
        this.setState({
            open: false
        });
    },
    
    render() {
        let {children, className, position, close, style, onClose} = this.props;
        const {open} = this.state;
        className = klassName(className, `_${position}`);

        if (open) {
            className += ' _active';
        }

        let msgNode = <div className="_content">
                        {children}
                    </div>
        if (onClose) {
            msgNode = <div className="_content">
                        <div className="_wrap">
                            {children}
                        </div>
                        <div className="_close" onClick={this.handleClose}>
                            {close}
                        </div>
                    </div>;
        }
        return (
            <div className={`flash-message ${className}`} style={style}>
                {msgNode}
            </div>
        );
    }
});

module.exports = FlashMessage