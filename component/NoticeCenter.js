const React = require('react')
const Notice = require('./Notice')
const klassName = require('./util/className')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')

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
        className = klassName(className, 'notice-center')
        return (
            <div>
                <ReactCssTransitionGroup className={className} transitionName="notice"
                    transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {notices.map((item) => {
                        return <Notice key={item.key} {...item} onClose={() => this.removeNotice(item.key)}/>
                    })}
                </ReactCssTransitionGroup>
            </div>
        );
    }
})

module.exports = NoticeCenter
