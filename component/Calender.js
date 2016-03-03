const React = require('react');
const {dateStr2Obj, obj2DateStr, date2DateStr} = require('./util/date');
const {WEEK_LABEL, MONTH_LABEL} = require('./util/constants');


const Calender = React.createClass({
    getInitialState() {
        let {year, month, day, value} = this.initDate();
        return {year, month, day, value, showYear: false, showMonth: false}
    },

    initDate(date=this.props.value){
        let {year, month, day} = dateStr2Obj(date, this.dateParams());
        let value = obj2DateStr(year, month, day);
        return {year, month, day, value}
    },

    handleClick(date){
        let value = date2DateStr(date);
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
        let { year: displayY, month: displayM, day: displayD} = dateStr2Obj(this.state.value);
        let displayW = WEEK_LABEL[new Date(displayY, displayM - 1, displayD).getDay()];

        return <div className="_label">
                    <a href="javascript:;" className="_year" onClick={this.pickYear}>{displayY}</a>
                    <p className="_date">
                        <span>{displayW}, </span>
                        <a href="javascript:;" onClick={this.pickMonth}>{displayM}月 {displayD}日</a>
                    </p>
                </div>
    },

    handleYearPickerClick(year){
        this.setState({
            year,
            showYear: false,
        });
    },

    handleMonthPickerClick(month){
        this.setState({
            month,
            showMonth: false, 
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

    pickYear(){
        this.setState({
            showYear: true,
            showMonth: false,
        });
    },

    pickMonth(){
        this.setState({
            showMonth: true, 
            showYear: false,
        });
    },

    renderMonthPicker(){
        let monthNodes = this.state.showMonth ? 
                        <div className="_month-picker">
                            <div className="_picker-label">
                                <div className="_link">
                                    <span onClick={this.pickYear}>{this.state.year}年 </span>
                                    <span>{this.state.month}月</span>
                                </div>
                            </div>
                            <ul>
                                {MONTH_LABEL.map((label, index) => {
                                    return <li key={`month-picker-${index + 1}`}>
                                                <a href="javascript:;" onClick={() => this.handleMonthPickerClick(index + 1)}>{label}</a>
                                            </li>
                                })}
                            </ul>
                        </div>
                        : null;

        return monthNodes;
    },

    renderYearPicker(){
        let beginY = this.state.year - 6;
        let endY = this.state.year + 5;
        let yearRangeNodes = [];
        for (let i = beginY; i < endY; i++) {
            let active = this.state.year === i ? '_active' : '';
            let isDisabled = i < 1900 ? '_disabled' : '';
            let yearItem = isDisabled ? <a href="javascript:;" className={isDisabled}>{i}</a>
                                      : <a href="javascript:;" className={active} onClick={() => this.handleYearPickerClick(i)}>{i}</a>
            yearRangeNodes.push(<li key={`year-picker-${i}`}>
                                    {yearItem}
                                </li>)
        };
        let yearPickerNodes = this.state.showYear ? 
                            <div className="_year-picker">
                                <div className="_picker-label">
                                    <a href="javascript:;" className="_nav _pre" onClick={() => this.handlePreYearRange(beginY)}>
                                        <i></i>
                                    </a>
                                    <div className="_link">
                                        <span>{beginY} ~ {endY}</span>
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

    renderDayPicker(){
        const TODAY = date2DateStr(new Date());
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
                let itemDateStr = obj2DateStr(year, month, _index);
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

        let dayNodes = this.state.showYear || this.state.showMonth ? null 
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
                        </div>;

        return dayNodes;
    },

    render() {
        return (
            <div className="ui calender">
                {this.renderDisplay()}
                {this.renderYearPicker()}
                {this.renderMonthPicker()}
                {this.renderDayPicker()}
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
            <a href="javascript:;" className={`${active} ${disabled} ${today} _day`} onClick={() => this.handleClick(value)}>
                {this.props.label}
            </a>
        );
    }
});


module.exports = Calender;