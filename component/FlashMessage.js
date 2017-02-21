const NoticeCenter = require('./NoticeCenter')
const DEFAULT_PREFIX = 'flash-message'
const DEFAULT_CONTENT = 'this is a flash message'
const DEFAULT_DELAY = 5000
const POSITIONS = ['top', 'center', 'bottom']

let instance = null

const generateNotice = function({ content, position, delay, onClick, close }){
    position = POSITIONS.indexOf(position) !== -1 ? position : POSITIONS[0]
    content = content || DEFAULT_CONTENT
    delay = delay || DEFAULT_DELAY
    instance = instance || NoticeCenter.init({
        className: DEFAULT_PREFIX,
        prefix: DEFAULT_PREFIX,
    })
    return instance.addNotice({
        content,
        delay,
        close,
        className: position,
        onClick,
    })
}

const FlashMessage = function(){
    return {
        show(msgObj){
            return generateNotice(msgObj)
        }
    }
}()

module.exports = FlashMessage
