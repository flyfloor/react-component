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
                    <p className="_year">{displayY}</p>
                    <p className="_date">
                        <span>{displayW}, </span>
                        <span>{displayM}月 </span>
                        <span>{displayD}日</span>
                    </p>
                </div>
    },

    handleYearPicker(year){
        this.setState({
            year,
            showYear: false,
        });
    },

    handlePreYearRange(){
        this.setState({
            year: this.state.year - 12,
        });
    },

    handleNextYearRange(){
        this.setState({
            year: this.state.year + 12,
        });
    },

    renderYearPicker(){
        let beginY = this.state.year - 6;
        let endY = this.state.year + 5;
        let yearRangeNodes = [];
        for (let i = beginY; i < endY; i++) {
            let active = this.state.year === i ? '_active' : '';
            let isDisabled = i < 1900 ? '_disabled' : '';
            let yearItem = isDisabled ? <a href="javascript:;" className={isDisabled}>{i}</a>
                                      : <a href="javascript:;" className={active} onClick={() => {this.handleYearPicker(i)}}>{i}</a>
            yearRangeNodes.push(<li key={`year-picker-${i}`}>
                                    {yearItem}
                                </li>)
        };
        let yearPickerNodes = this.state.showYear ? 
                            <div className="_year-picker">
                                <div className="_picker-label">
                                    <a href="javascript:;" className="_nav _pre" onClick={() => {this.handlePreYearRange(beginY)}}>
                                        <i></i>
                                    </a>
                                    <div className="_link">
                                        <span onClick={this.pickYear}>{beginY} ~ </span>
                                        <span onClick={this.pickMonth}>{endY}</span>
                                    </div>
                                    <a href="javascript:;" className="_nav _next" onClick={this.handleNextYearRange}>
                                        <i></i>
                                    </a>
                                </div>
                                <ul>
                                    {yearRangeNodes}
                                </ul>
                            </div> 
                           : null;

        return yearPickerNodes;
    },

    pickYear(){
        this.setState({
            showYear: true,
        });
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

        let dayNodes = this.state.showYear ? null 
                                            : <div className="_day-picker">
                                                <div className="_picker-label">
                                                    <a href="javascript:;" className="_nav _pre" onClick={this.handlePreMonth}>
                                                        <i></i>
                                                    </a>
                                                    <div className="_link">
                                                        <span className="_year-link" onClick={this.pickYear}>{this.state.year}年 </span>
                                                        <span className="_month-link" onClick={this.pickMonth}>{this.state.month}月</span>
                                                    </div>
                                                    <a href="javascript:;" className="_nav _next" onClick={this.handleNextMonth}>
                                                        <i></i>
                                                    </a>
                                                </div>
                                                <table>
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

        return (
            <div className="ui calender">
                {this.renderDisplay()}
                {this.renderYearPicker()}
                {dayNodes}
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