const React = require('react');
const klassName = require('./util/className');

const Message = React.createClass({
    _timer: null,

    propTypes: {
        delay: React.PropTypes.number,
        content: React.PropTypes.element.isRequired,
        closeNode: React.PropTypes.element,
        onClose: React.PropTypes.func,
        position: React.PropTypes.oneOf(['top', 'center', 'bottom']),
    },
    getInitialState() {
        return {
            display: false,
        };
    },

    getDefaultProps() {
        return {
            delay: 5000,
            className: '',
            position: 'top',
            closeNode: <i>x</i>,
        };
    },


    handleDisplay(){
        const {display} = this.state;
        const {delay} = this.props;
        this.setState({
            display: !display
        });
        
        if (!display ) {
            this._timer = setTimeout(() => this.setState({ display: false}), delay);
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
            display: false
        });
    },
    
    render() {
        let {children, content, className, position, closeNode, style, onClose} = this.props;
        const {display} = this.state;
        className = klassName(className, `_${position}`);
        if (display) {
            className += ' _active';
        }

        let msgNode = <div className="_message">
                        {content}
                    </div>
        if (onClose) {
            msgNode = <div className="_message">
                        <div className="_wrap">
                            {content}
                        </div>
                        <div className="_close" onClick={this.handleClose}>
                            {closeNode}
                        </div>
                    </div>;
        }
        return (
            <div className={`ui message ${className}`} style={style}>
                <div className="_trigger" onClick={this.handleDisplay}>
                    {children}
                </div>
                {msgNode}
            </div>
        );
    }
});

module.exports = Message;