import React from 'react';
import {validateDate, formatDate, trimDate} from './util/date';
import {WEEK_LABEL} from './util/constants';


const Calender = React.createClass({
    getInitialState() {
        let {year, month, day, value} = this.initDate();
        return {year, month, day, value}
    },

    initDate(date=this.props.value){
        let {year, month, day} = validateDate(date, this.dateParams());
        let value = formatDate(year, month, day);
        return {year, month, day, value}
    },

    handleClick(date){
        let value = trimDate(date);
        this.setState({
            value,
        });
        if (this.props.onChange) this.props.onChange(value)
    },

    dateParams(){
        return {
            begin: this.props.begin,
            end: this.props.end
        }
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

    renderDisplay(){
        let { year: displayY, month: displayM, day: displayD} = validateDate(this.state.value);
        let displayW = WEEK_LABEL[new Date(displayY, displayM - 1, displayD).getDay()];

        return <div className="_label">
                    <h2>{displayY}</h2>
                    <p>
                        <span>{displayW}, </span>
                        <span>{displayM}月 </span>
                        <span>{displayD}日</span>
                    </p>
                </div>
    },

    render() {
        const TODAY = trimDate(new Date());
        let {year, month, day, value} = this.state;
        let dateCount = new Date(year, month, 0).getDate();
        let index = new Date(year, month - 1, 1).getDay();
        let matrixNodes = [[]];
        let { begin, end } = this.props;

        for(let i = 0; i < dateCount + index; i ++){
            if (i < index) {
                matrixNodes[0].push(<td key={`canlender-col-${i}`}></td>);
            } else {
                let _index = i - index + 1;
                let row = Math.floor(i / 7);
                let col = i % 7;
                let itemDateStr = formatDate(year, month, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];
                
                let isDisabled = itemDateStr < begin || itemDateStr > end;
                
                let isToday = TODAY == itemDateStr;
                let active = value == itemDateStr && !isDisabled;

                let itemVal = new Date(itemDateStr);


                matrixNodes[row].push(<td key={`canlender-col-${i}`}>
                                        <Calender.Item active={active} disabled={isDisabled} isToday={isToday} onClick={this.handleClick} value={itemVal} label={_index}/>
                                      </td>)
            }
        }

        return (
            <div className="ui calender">
                {this.renderDisplay()}
                <table>
                    <thead>
                        <tr>
                            <th>
                                <a href="javascript:;" className="_nav _pre" onClick={this.handlePreMonth}></a>
                            </th>
                            <th colSpan='5'>
                                <span className="_year-picker" onClick={this.toggleYear}>{this.state.year}年 </span>
                                <span className="_month-picker" onClick={this.toggleMonth}>{this.state.month}月</span>
                            </th>
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
    propTypes: {
        onClick: React.PropTypes.func,
    },
    handleClick(value){
        if (!this.props.disabled) this.props.onClick(value);
    },

    render() {
        let value = this.props.value;
        let disabled = this.props.disabled ? '_disabled' : '';
        let active = this.props.active ? '_active': '';
        let today = this.props.isToday ? '_today': '';
        return (
            <a href="javascript:;" className={`${active} ${disabled} ${today} _day`} onClick={() => {this.handleClick(value)}}>
                {this.props.label}
            </a>
        );
    }
});


export default Calender;