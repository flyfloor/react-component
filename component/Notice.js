const React = require('react')
const klassName = require('./util/className')

const PropTypes = React.PropTypes

const Notice = React.createClass({
    propTypes: {
        delay: PropTypes.number,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onClick: PropTypes.func,
        onClose: PropTypes.func.isRequired,
        close: PropTypes.element,
    },

    getDefaultProps() {
        return {
            content: null,
            delay: 5000,
            close: <i>x</i>,
            onClose(){return},
        }
    },

    componentDidMount() {
        const {delay, onClose} = this.props
        if (delay !== 0) {
            this._timer = setTimeout(() => {
                this.clearTimer()
                onClose()
            }, delay)
        }
    },

    componentWillUnmount() {
        this.clearTimer()
    },

    clearTimer(){
       if (this._timer) {
           clearTimeout(this._timer)
           this._timer = null
       } 
    },

    handleClick(){
        const {onClick, onClose} = this.props
        if (onClick) {
            onClick(this.props)
            onClose()
        }
    },

    render() {
        let {title, content, className, close, onClose} = this.props
        className = klassName(className, 'notice')
        return (
            <div className={className}>
                {title 
                    ? <div className="_title" onClick={this.handleClick}>{title}</div>
                    : null}
                <div className="_content" onClick={this.handleClick}>{content}</div>
                <div className="_close" onClick={onClose}>{close}</div>
            </div>
        );
    }
})

module.exports = Notice