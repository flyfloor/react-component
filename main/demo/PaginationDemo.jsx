import React from 'react';
import {Pagination} from './index.js';

export default class PaginationDemo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            current: 1
        }
    }

    handlePageChange(page){
        this.setState({
            current: page
        });
    }

    render() {
        return (
            <ol>
                <li>
                    <h4>default pagination</h4>
                    <p>now are on page {this.state.current}</p>
                    <Pagination totalCount='1000' onChange={this.handlePageChange.bind(this)}/>
                </li>
                <li>
                    <h4>no count pagination</h4>
                    <Pagination/>
                </li>
                <li>
                    <h4>with given current page</h4>
                    <Pagination currentPage='6' totalCount='1000'/>
                </li>
            </ol>
        );
    }
}
