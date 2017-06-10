const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class Notice extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        const {delay, onClose} = this.props
        if (delay !== 0) {
            this._timer = setTimeout(() => {
                this.clearTimer()
                onClose()
            }, delay)
        }
    }

    componentWillUnmount() {
        this.clearTimer()
    }

    clearTimer(){
       if (this._timer) {
           clearTimeout(this._timer)
           this._timer = null
       } 
    }

    handleClick(){
        const {onClick, onClose} = this.props
        if (onClick) {
            onClick(this.props)
            onClose()
        }
    }

    render() {
        let {title, content, className, close, onClose} = this.props
        className = klassName(className, 'notice')
        return (
            <div className={className}>
                {title 
                    ? <div className="_title" onClick={this.handleClick}>{title}</div>
                    : null}
                <div className={`_content ${close ? '_close' : ''}`} onClick={this.handleClick}>
                    {content}
                    {close ? 
                        <div className="_close" onClick={onClose}>{close}</div> 
                        : null}
                </div>
            </div>
        );
    }
}

Notice.propTypes = {
    delay: PropTypes.number,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    onClick: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    close: PropTypes.element,
}

Notice.defaultProps = {
    content: null,
    delay: 5000,
    close: <i>x</i>,
}

module.exports = Notice