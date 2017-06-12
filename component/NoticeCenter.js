const React = require('react')
const Component = React.Component
const ReactDOM = require('react-dom')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const Notice = require('./Notice')
const DEFAULT_PREFIX = 'notice'

let __key = 0

const generateNoticeKey = () => {
    let str = `notice_${__key}`
    __key += 1
    return str
}

class NoticeCenter extends Component {
    constructor(props) {
        super(props);
        this.addNotice = this.addNotice.bind(this)
        this.removeNotice = this.removeNotice.bind(this)

        this.state = {
            notices: []
        }
    }
    addNotice(notice){
        notice.key = generateNoticeKey()
        this.setState((state) => {
            return {
                notices: state.notices.concat(notice)
            }
        })
    }

    removeNotice(key){
        this.setState((state) => {
            return {
                notices: state.notices.filter(item => item.key !== key)
            }
        })
    }

    render() {
        const {notices} = this.state
        let {className, prefix} = this.props
        return (
            <ReactCssTransitionGroup className={className} transitionName={prefix}
                transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {notices.map((item) => {
                    return <Notice key={item.key} {...item} onClose={() => {
                        this.removeNotice(item.key, item)
                        if (typeof item.onClose === 'function') {
                            item.onClose(item)
                        }
                    }}/>
                })}
            </ReactCssTransitionGroup>
        );
    }
}

NoticeCenter.defaultProps = {
    prefix: DEFAULT_PREFIX,
    className: 'notice-center',
}

NoticeCenter.init = function(props){
    props = props || {}
    let prefix = props.prefix || DEFAULT_PREFIX
    let domId = `dot_${prefix}_center`
    if (!document.getElementById(domId)) {
        let dom = document.createElement('div')
        dom.setAttribute('id', domId)
        document.body.appendChild(dom)
    }
    let notification = ReactDOM.render(<NoticeCenter {...props} />, document.getElementById(domId))
    return {
        key: prefix,
        addNotice(notice){
            // close icon
            if (props.close) {
                notice.close = props.close
            }
            notification.addNotice(notice)
        },
        removeNotice(key){
            notification.removeNotice(key)
        }
    }
}

module.exports = NoticeCenter
