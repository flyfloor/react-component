const React = require('react');

const Pagination = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
        totalPage: React.PropTypes.number,
        currentPage: React.PropTypes.number,
        showRange: React.PropTypes.bool,
        showNav: React.PropTypes.bool,
        isEnd: React.PropTypes.bool,
        range: React.PropTypes.number,
    },
    getDefaultProps() {
        return {
            currentPage: 1,
            range: 7,
            totalPage: 30,
        };
    },
    getInitialState() {
        return {
            currentPage: this.props.currentPage,
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPage != this.props.currentPage) {
            this.setState({
                currentPage: nextProps.currentPage || 1,
            });
        }
    },
    
    onPageChange(page){
        if (page > this.props.totalPage) return;
        this.setState({
            currentPage: page
        });
        if (this.props.onChange) this.props.onChange(page)
    },

    render() {
        let {totalPage, range, showRange, showNav, prevNode, nextNode, isEnd} = this.props;
        let { currentPage } = this.state;
        let start = 1, end = 1, nodes = [],
            left_half = Math.ceil(range / 2);

        // current large than half
        if (currentPage > left_half) start = currentPage - left_half;
        
        // calc end
        end = start + range;

        if (totalPage - start <= range) {
            start = totalPage - range;
            end = totalPage;
        }

        // first node
        let firstNode = null;
        if (showRange && start != 1) {
            firstNode = <li key='first-page' className={currentPage === 1 ? '_active _item': '_item'}>
                            <a href="javascript:;" onClick={() => this.onPageChange(1)}>1</a>
                            <span> ...</span>
                        </li>
        } else if (showNav && start != 1) {
            firstNode = <li className="_item _nav _prev" key='previous-page' onClick={() => this.onPageChange(currentPage - 1)}>
                            { prevNode ? prevNode : <a href="javascript:;">previous</a> }
                        </li>
        }

        // last node
        let lastNode = null;
        if (showRange && end != totalPage) {
            lastNode = <li key={`last-page`} className={currentPage === totalPage ? '_active _item': '_item'}>
                            <span>... </span>
                            <a href="javascript:;" onClick={() => this.onPageChange(totalPage)}>
                                {totalPage}
                            </a>
                        </li>
        } else if(showNav && !isEnd && end !== totalPage){
            lastNode = <li className="_item _nav _prev" key="next-page" onClick={() => this.onPageChange(currentPage + 1)}>
                            {nextNode ? nextNode : <a href="javascript:;">next</a>}
                        </li>
        }

        // node
        for (let i = start; i <= end; i++) {
            if (isEnd && currentPage === i - 1) break;
            nodes.push(<li key={`page-link-${i}`} className={currentPage === i ? '_active _item': '_item'}>
                            <a href="javascript:;" onClick={() => this.onPageChange(i)}>
                                {i}
                            </a>
                        </li>);
        };
        return (
            <ul className="ui pagination">
                {firstNode}
                {nodes}
                {lastNode}
            </ul>
        );
    }
});

module.exports = Pagination;
