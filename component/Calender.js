import React from 'react';
import {validateDate, formatDate, trimDate} from './util/date';


const Calender = React.createClass({
    getInitialState() {
        let {year, month, day, value} = this.initDate()
        return {year, month, day, value}
    },

    initDate(defaultValue=this.props.value){
        let {year, month, day} = validateDate(defaultValue);
        let value = formatDate(year, month, day);
        return {year, month, day, value}
    },

    handleClick(date){
        this.setState({
            value: trimDate(date),
        });
    },

    handlePreMonth(){
        let month = this.state.month;
        if (month - 1 <= 0) {
            let year = this.state.year - 1;
            this.setState({
                month: 12,
                year: year, 
            });
        } else {
            this.setState({
                month: month - 1,
            });
        }
    },

    handleNextMonth(){
        let month = this.state.month;
        if (month + 1 > 12) {
            let year = this.state.year + 1;
            this.setState({
                month: 1,
                year: year, 
            });
        } else {
            this.setState({
                month: month + 1,
            });
        }
    },

    render() {
        let active = false;
        let isToday = false;
        const TODAY = trimDate(new Date());
        let {year, month, day, value} = this.state;
        let dateCount = new Date(year, month, 0).getDate();
        let index = new Date(year, month - 1, 1).getDay();
        let matrixNodes = [[]]

        for(let i = 0; i < dateCount + index; i ++){
            if (i < index) {
                matrixNodes[0].push(<td key={`canlender-col-${i}`}></td>);
            } else {
                let _index = i - index + 1;
                let row = Math.floor(i / 7);
                let col = i % 7;
                let itemDate = formatDate(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];
                active = value == itemDate;
                isToday = TODAY == itemDate;
                let itemVal = new Date(year, month - 1, _index);

                matrixNodes[row].push(<td key={`canlender-col-${i}`}>
                                        <Calender.Item active={active} isToday={isToday} onClick={this.handleClick} value={itemVal} label={_index}/>
                                      </td>)
            }
        }

        return (
            <div className="ui calender">
                <table>
                    <thead>
                        <tr>
                            <th>
                                <a href="javascript:;" className="_nav _pre" onClick={this.handlePreMonth}></a>
                            </th>
                            <th colSpan='5'>{this.state.year}年 {this.state.month}月</th>
                            <th>
                                <a href="javascript:;" className="_nav _next" onClick={this.handleNextMonth}></a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="_week">
                            <td>日</td>
                            <td>一</td>
                            <td>二</td>
                            <td>三</td>
                            <td>四</td>
                            <td>五</td>
                            <td>六</td>
                        </tr>
                        {matrixNodes.map((item, index) => {
                            return  <tr key={`canlender-row-${index}`}>
                                        {item}
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
});


Calender.Item = React.createClass({
    handleClick(value){
        this.props.onClick(value)
    },

    render() {
        let value = this.props.value;
        let active = this.props.active ? '_active': '';
        let today = this.props.isToday ? '_today': '';
        return (
            <a href="javascript:;" className={`${active} ${today} _day`} onClick={() => {this.handleClick(value)}}>
                {this.props.label}
            </a>
        );
    }
});


export default Calender;