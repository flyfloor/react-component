const React = require('react')
const ReactDOM = require('react-dom')
const klassName = require('./util/className')
const PropTypes = React.PropTypes
const ENTER_KC = require('./mixin/keyCode').ENTER_KC

const Pagination = React.createClass({
    propTypes: {
        onChange: PropTypes.func,
        total: PropTypes.number,
        current: PropTypes.number,
        showRange: PropTypes.bool,
        showNav: PropTypes.bool,
        isEnd: PropTypes.bool,
        range: PropTypes.number,
        start: PropTypes.element,
        end: PropTypes.element,
        prev: PropTypes.element,
        next: PropTypes.element,
        showJump: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            current: 1,
            range: 7,
            total: 30,
            showJump: false,
        };
    },
    getInitialState() {
        const {current} = this.props;
        return { current }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.current != this.props.current) {
            this.setState({
                current: nextProps.current || 1,
            });
        }
    },
    
    onPageChange(page){
        const {total, onChange} = this.props;
        if (page > total) return;
        this.setState({
            current: page
        });
        if (onChange) onChange(page);
    },

    formatFirstNode(begin){
        const {showRange, showNav, prev, start} = this.props;
        const {current} = this.state;

        let firstNode = null;
        if (showRange && begin != 1) {
            firstNode = <li key='first-page' onClick={() => this.onPageChange(1)} 
                            className={current === 1 ? '_active _range _item': '_range _item'}>
                            {start ? start : <span>1 </span>}
                            <span> ...</span>
                        </li>
        } else if (showNav && begin != 1) {
            firstNode = <li className="_item _nav _prev" key='previous-page' onClick={() => this.onPageChange(current - 1)}>
                            { prev ? prev : <span>prev</span> }
                        </li>
        }
        return firstNode;
    },

    formatLastNode(last){
        const {showRange, showNav, next, end, isEnd, total} = this.props;
        const {current} = this.state;

        let lastNode = null;
        if (showRange && last !== total) {
            lastNode = <li key={`last-page`} onClick={() => this.onPageChange(total)}
                            className={current === total ? '_active _range _item': '_range _item'}>
                            <span>...  </span>
                            {end ? end : <span>{total}</span>}
                        </li>
        } else if(showNav && !isEnd && last !== total){
            lastNode = <li className="_item _nav _prev" key="next-page" onClick={() => this.onPageChange(current + 1)}>
                            {next ? next : <span>next</span>}
                        </li>
        }
        return lastNode;
    },

    formatStartAndEnd(){
        let {range, total} = this.props;
        const { current } = this.state;
        let start = 1, 
            end = 1, 
            left_half = Math.ceil(range / 2);
        
        // current large than half
        if (current > left_half) start = current - left_half;

        // calc end
        end = start + range;
        if (total - start <= range) {
            start = total - range;
            end = total;
        }

        if (start < 1) {
            start = 1
        }
        
        if (range >= total) {
            range = total - 1
        }

        if (end > total) {
            end = total
        }

        return {
            start, end
        }
    },

    formatRange(start, end){
        let {isEnd} = this.props;
        const {current} = this.state;
        let nodes = [];
        for (let i = start; i <= end; i++) {
            if (isEnd && current === i - 1) break;
            nodes.push(<li key={`page-link-${i}`} onClick={() => this.onPageChange(i)}
                            className={current === i ? '_active _item': '_item'}>
                            <span>{i}</span>
                        </li>);
        }
        return nodes;
    },

    handlePageJump(e){
        let {total} = this.props
        // blur || keyDown
        if (e.keyCode === undefined || e.keyCode === ENTER_KC) {
            let value = parseInt(e.target.value) || 1
            if (value < 1) {
                value = 1
            }
            if (value > total) {
                value = total
            }
            this.setState({
                current: value
            });
            let {onChange} = this.props
            if (onChange) {
                onChange(value)
            }
            if (value != e.target.value) {
                let jumpInput = ReactDOM.findDOMNode(this.refs.jumpInput)
                jumpInput.value = value
            }
        }
    },

    formatJump(){
        const {showJump} = this.props
        const {current} = this.state
        if (showJump) {
            return (
                <li key={'jump-page'} className="_item _jump">
                    <span>Go </span>
                    <input type="number" ref="jumpInput" defaultValue={current + 1} 
                        onBlur={this.handlePageJump} 
                        onKeyDown={this.handlePageJump}/>
                </li>
            )
        }
    },

    render() {
        let {start, end} = this.formatStartAndEnd();
        let {className} = this.props;
        className = klassName(className, 'pagination')
        return (
            <ul className={className}>
                {this.formatFirstNode(start)}
                {this.formatRange(start, end)}
                {this.formatLastNode(end)}
                {this.formatJump()}
            </ul>
        );
    }
});

module.exports = Pagination;
