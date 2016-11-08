const React = require('react')
const klassName = require('./util/className')

const Pagination = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        total: React.PropTypes.number,
        current: React.PropTypes.number,
        showRange: React.PropTypes.bool,
        showNav: React.PropTypes.bool,
        isEnd: React.PropTypes.bool,
        range: React.PropTypes.number,
    },
    getDefaultProps() {
        return {
            current: 1,
            range: 7,
            total: 30,
        };
    },
    getInitialState() {
        const {current} = this.props;
        return { current };
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

    formatFirstNode(start){
        const {showRange, showNav, prev} = this.props;
        const {current} = this.state;

        let firstNode = null;
        if (showRange && start != 1) {
            firstNode = <li key='first-page' onClick={() => this.onPageChange(1)} 
                            className={current === 1 ? '_active _range _item': '_range _item'}>
                            <span>1 </span>
                            <span> ...</span>
                        </li>
        } else if (showNav && start != 1) {
            firstNode = <li className="_item _nav _prev" key='previous-page' onClick={() => this.onPageChange(current - 1)}>
                            { prev ? prev : <span>prev</span> }
                        </li>
        }
        return firstNode;
    },

    formatLastNode(end){
        const {showRange, showNav, next, isEnd, total} = this.props;
        const {current} = this.state;

        let lastNode = null;
        if (showRange && end !== total) {
            lastNode = <li key={`last-page`} onClick={() => this.onPageChange(total)}
                            className={current === total ? '_active _range _item': '_range _item'}>
                            <span>...  </span>
                            <span>
                                {total}
                            </span>
                        </li>
        } else if(showNav && !isEnd && end !== total){
            lastNode = <li className="_item _nav _prev" key="next-page" onClick={() => this.onPageChange(current + 1)}>
                            {next ? next : <span>next</span>}
                        </li>
        }
        return lastNode;
    },

    formatStartAndEnd(){
        const {range, total} = this.props;
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

    render() {
        let {start, end} = this.formatStartAndEnd();
        let {className} = this.props;
        className = klassName(className, 'pagination')
        return (
            <ul className={className}>
                {this.formatFirstNode(start)}
                {this.formatRange(start, end)}
                {this.formatLastNode(end)}
            </ul>
        );
    }
});

module.exports = Pagination;
