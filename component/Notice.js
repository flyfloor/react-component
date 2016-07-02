const React = require('react')
const PropTypes = React.PropTypes
const ReactDOM = require('react-dom')

const Notice = React.createClass({
    propTypes: {
        delay: PropTypes.number,
        content: PropTypes.element,
        onClose: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            title: '',
            content: <div></div>,
            delay: 3000,
            onClose(){},
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

    render() {
        const {title, content} = this.props
        return (
            <div className="ui notice">
                <div className="_title">{title}</div>
                <div className="_content">{content}</div>
            </div>
        );
    }
})

module.exports = Notice

