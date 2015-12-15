import React from 'react';
import Data from './util/Data';

const Pagination = React.createClass({
    getDefaultProps() {
        return {
            currentPage: 1,
            range: 7,
        };
    },
    getInitialState() {
        return {
            currentPage: this.props.currentPage,
        };
    },
    
    onPageChange(e){
        let pageNum = Data.getData(e.target, 'page');
        console.log(pageNum)
        this.setState({
            currentPage: pageNum
        });
    },

    render() {
        let currentPage = parseInt(this.state.currentPage),
            range = this.props.range,
            start = 1, 
            half = Math.ceil(range / 2),
            nodes = [];

        if (currentPage > half) start = currentPage - half;

        for (let i = start; i < parseInt(start) + parseInt(range); i++) {
            nodes.push(<a href="javascript:;" key={`page-link-${i}`} 
                            onClick={this.onPageChange} data-page={i} 
                            className={currentPage === i ? '_active _link': '_link'}>{i}</a>);
        };
        return (
            <div className="ui pagination">
                {nodes}
            </div>
        );
    }
});

export default Pagination;
