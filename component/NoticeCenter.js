const React = require('react')
const ReactDOM = require('react-dom')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const Notice = require('./Notice')
const klassName = require('./util/className')
const DEFAULT_PREFIX = 'notice-center'

let __key = 0

const generateNoticeKey = () => {
    let str = `notice_${__key}`
    __key += 1
    return str
}

const NoticeCenter = React.createClass({
    getInitialState() {
        return {
            notices: []
        }
    },

    addNotice(notice){
        notice.key = generateNoticeKey()
        this.setState((state) => {
            return {
                notices: state.notices.concat(notice)
            }
        })
    },

    removeNotice(key){
        this.setState((state) => {
            return {
                notices: state.notices.filter(item => item.key !== key)
            }
        })
    },

    render() {
        const {notices} = this.state
        let {className} = this.props
        className = klassName(className || DEFAULT_PREFIX)
        return (
            <ReactCssTransitionGroup className={className} transitionName={className}
                transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                {notices.map((item) => {
                    return <Notice key={item.key} {...item} onClose={() => this.removeNotice(item.key, item)}/>
                })}
            </ReactCssTransitionGroup>
        );
    }
})

NoticeCenter.init = function(props){
    props = props || {}
    let className = props.className || DEFAULT_PREFIX
    let domId = `dot_${className}_center`
    if (!document.getElementById(domId)) {
        let dom = document.createElement('div')
        dom.setAttribute('id', domId)
        document.body.appendChild(dom)
    }
    let notification = ReactDOM.render(<NoticeCenter {...props} />, document.getElementById(domId))
    return {
        addNotice(notice){
            notification.addNotice(notice)
        },
        removeNotice(key){
            notification.removeNotice(key)
        }
    }
}

module.exports = NoticeCenter
