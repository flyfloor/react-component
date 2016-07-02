const React = require('react')
const PropTypes = React.PropTypes

const Notice = React.createClass({
    propTypes: {
        delay: PropTypes.number,
        content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onClick: PropTypes.func,
        onClose: PropTypes.func.isRequired,
        closeIcon: PropTypes.element,
    },

    getDefaultProps() {
        return {
            content: null,
            delay: 5000,
            closeIcon: <i>x</i>,
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

    handleContentClick(){
        const {onClick, onClose} = this.props
        if (onClick) {
            onClick(this.props)
            onClose()
        }
    },

    render() {
        const {title, content, closeIcon, onClose} = this.props
        return (
            <div className="ui notice">
                {title 
                    ? <div className="_title">{title}</div>
                    : null}
                <div className="_content" onClick={this.handleContentClick}>{content}</div>
                <div className="_close" onClick={onClose}>{closeIcon}</div>
            </div>
        );
    }
})

module.exports = Notice

