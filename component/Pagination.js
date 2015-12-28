import React from 'react';

const Pagination = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
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
    
    onPageChange(page){
        this.setState({
            currentPage: page
        });
        if (this.props.onChange) {this.props.onChange(page)}
    },

    render() {
        let currentPage = parseInt(this.state.currentPage),
            totalPage = parseInt(this.props.totalPage),
            range = parseInt(this.props.range),
            start = 1,
            end = 1,
            left_half = Math.ceil(range / 2),
            nodes = [],
            showRange = this.props.showRange;


        if (currentPage > left_half) start = currentPage - left_half;
        
        end = start + range;

        if (totalPage - start <= range) {
            start = totalPage - range;
            end = totalPage;
        }

        let firstNode = showRange && start != 1 ? <li className='_first' key={`first-page`} className={currentPage === 1 ? '_active _item': '_item'}>
                                                        <a href="javascript:;" onClick={() => this.onPageChange(1)}>1</a>
                                                        <span> ...</span>
                                                    </li>
                                                : null;

        let lastNode =  showRange && end != totalPage ? <li className='_last' key={`last-page`} className={currentPage === totalPage ? '_active _item': '_item'}>
                                                            <span>... </span>
                                                            <a href="javascript:;" onClick={() => this.onPageChange(totalPage)}>
                                                                {totalPage}
                                                            </a>
                                                        </li>
                                                        : null;

        for (let i = start; i <= end; i++) {
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

export default Pagination;
