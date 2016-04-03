import React from 'react';
import {Pagination} from './index.js';

export default class PaginationDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            current: 6,
        };
    }

    handlePageChange(page){
        this.setState({
            current: page
        });
    }

    render() {
        return (
            <div>
                <h3>Pagination</h3>
                <ol>
                    <li>
                        <h4>Default pagination</h4>
                        <Pagination/>
                    </li>
                    <li>
                        <h4>Change event</h4>
                        <p>this will change next pagination</p>
                        <Pagination total={10} onChange={this.handlePageChange.bind(this)}/>
                    </li>
                    <li>
                        <h4>Pagination with given current page</h4>
                        <p>now on page {this.state.current}</p>
                        <Pagination current={this.state.current} onChange={this.handlePageChange.bind(this)} total={100}/>
                    </li>
                    <li>
                        <h4>Pagination with full range</h4>
                        <Pagination showRange={true} total={100}/>
                    </li>
                    <li>
                        <h4>Pagination with navigation</h4>
                        <Pagination showNav={true} current={3}/>
                    </li>
                </ol>
            </div>
        );
    }
}
