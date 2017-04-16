const React = require('react');
const Component = React.Component
const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')

class SelectorList extends Component {
    constructor(props) {
        super(props);
    }

    handleInitScroll(){
        this.initScrollTo('hour')
        this.initScrollTo('minute')
        this.initScrollTo('second')
    }

    initScrollTo(type){
        let val = this.props[type]
        let dom = ReactDOM.findDOMNode(this.refs[type + 'List'])
        if (dom) {
            let selected = dom.children[0].children[parseInt(val)]
            let to = selected.offsetTop
            dom.scrollTop = to
        }
    }

    componentDidMount() {
        this.handleInitScroll()
    }

    handleTimeChange(type='hour', val){
        this.props.onChange(type, val)
    }

    formatSelectList(type='hour'){
        let val = this.props[type]
        let max = type === 'hour' ? 24 : 60
        let nodes = []
        for (let i = 0; i < max; i++) {
            let _i = i < 10 ? `0${i}` : String(i)
            nodes.push(
                <li key={`${type}-${i}`} className={val == _i ? '_item _active' : '_item'}
                    onClick={() => this.handleTimeChange(type, i)}>
                    <span>{_i}</span>
                </li>
            )
        }
        return (
            <ul>{nodes}</ul>
        )
    }

    render() {
        const {simple} = this.props
        return (
            <div className="_section">
                <div className="_list _hour" ref="hourList">
                    {this.formatSelectList('hour')}
                </div>
                <div className="_list _minute" ref="minuteList">
                    {this.formatSelectList('minute')}
                </div>
                {simple ? 
                    null
                    : <div className="_list _second" ref="secondList">
                        {this.formatSelectList('second')}
                    </div>}
            </div>
        );
    }
}

SelectorList.defaultProps = {
    hour: 0,
    minute: 0,
    second: 0,
    simple: false
}

SelectorList.propTypes = {
    onChange: PropTypes.func.isRequired,
}

module.exports = SelectorList
