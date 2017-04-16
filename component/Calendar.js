const React = require('react');
const Component = React.Component
const PropTypes = require('prop-types')
const extractDate = require('./util/datetime').extractDate;
const capitalize = require('./util/misc').capitalize

const constants = require('./util/constants')
const {WEEK_LABEL, MONTH_LABEL} = constants
const klassName = require('./util/className');

const TODAY = new Date();
TODAY.setHours(0,0,0,0);

class Calendar extends Component {
    constructor(props) {
        super(props);
        const {year, month, day, value} = this.initDate();
        let {type} = props

        this.handleClick = this.handleClick.bind(this)
        this.handlePreMonth = this.handlePreMonth.bind(this)
        this.handleNextMonth = this.handleNextMonth.bind(this)
        this.handlePreYear = this.handlePreYear.bind(this)
        this.handleNextYear = this.handleNextYear.bind(this)
        this.renderPreview = this.renderPreview.bind(this)
        this.handleYearPickerClick = this.handleYearPickerClick.bind(this)
        this.handleMonthPickerClick = this.handleMonthPickerClick.bind(this)
        this.handlePreYearRange = this.handlePreYearRange.bind(this)
        this.handleNextYearRange = this.handleNextYearRange.bind(this)
        this.pickYear = this.pickYear.bind(this)
        this.pickMonth = this.pickMonth.bind(this)
        this.renderMonthPicker = this.renderMonthPicker.bind(this)
        this.renderYearPicker = this.renderYearPicker.bind(this)
        this.renderDayPicker = this.renderDayPicker.bind(this)

        this.state = {
            year, month, day, value, current: capitalize(type)
        }
    }

    initDate(date=this.props.value){
        date = date || new Date()
        // initialize hour, minute, second
        date.setHours(0,0,0,0)
        // date, month initialize by type
        const {type} = this.props
        if (type !== 'day') {
            date.setDate(1)
        }
        if (type === 'year') {
            date.setMonth(0)
        }

        return Object.assign(extractDate(date), { value: date })
    }

    handleClick(value){
        let {year, month, day} = extractDate(value)
        this.setState({
            value,
            year,
            month,
            day,
        });
        if (this.props.onChange) this.props.onChange(value)
    }

    handlePreMonth(){
        let {month, year} = this.state;
        if (month - 1 <= 0) {
            this.setState({ month: 12, year: year - 1 });
        } else {
            this.setState({  month: month - 1 });
        }
    }

    handleNextMonth(){
        let {month, year} = this.state;
        if (month + 1 > 12) {
            this.setState({ month: 1, year: year + 1 });
        } else {
            this.setState({ month: month + 1 });
        }
    }

    handlePreYear(){
        let {year} = this.state
        this.setState({
            year: year - 1
        });
    }

    handleNextYear(){
        let {year} = this.state
        this.setState({
            year: year + 1
        });
    }

    // show preview
    renderPreview(){
        let { year, month, day } = this.state
        let displayW = WEEK_LABEL[new Date(year, month - 1, day).getDay()];

        return (
            <div className="_label">
                <a href="javascript:;" className="_year" onClick={this.pickYear}>{year}</a>
                <p className="_date">
                    <span>{displayW}, </span>
                    <a href="javascript:;" onClick={this.pickMonth}>
                        {month}月 {day}日
                    </a>
                </p>
            </div>
        )
    }

    // year picker toggle
    handleYearPickerClick(year){
        const {type} = this.props
        // if type is not year, set month picker display
        if (type !== 'year') {
            return this.setState({
                current: 'Month',
                year,
            });
        }
        // type is month, value change
        let {value} = this.state
        value.setYear(year)

        this.setState({
            year,
            value,
        });

        if (this.props.onChange) this.props.onChange(new Date(value.getTime()))
    }

    // month picker toggle
    handleMonthPickerClick(month){
        const {type} = this.props
        // if type is day, set day picker display
        if (type === 'day') {
            return this.setState({
                current: 'Day',
                month,
            });
        }
        // type is month or year, value change
        let {value, year} = this.state
        value.setMonth(month - 1)
        value.setYear(year)

        this.setState({
            month,
            value,
        });
        if (this.props.onChange) this.props.onChange(new Date(value.getTime()))
    }

    // year picker range change
    handlePreYearRange(){
        this.setState({
            year: this.state.year - 12,
        });
    }

    // year picker range change
    handleNextYearRange(){
        this.setState({
            year: this.state.year + 12,
        });
    }

    pickYear(){
        this.setState({
            current: 'Year',
        });
    }

    pickMonth(){
        this.setState({
            current: 'Month',
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState(this.initDate(nextProps.value));
        }
    }

    renderMonthPicker(){
        const { year, month } = this.state;
        return (
            <div className="_month-picker">
                <div className="_picker-label">
                    <a href="javascript:;" className="_nav _prev _year" onClick={this.handlePreYear}>
                        <i></i>
                    </a>
                    <div className="_link">
                        <a href="javascript:;" onClick={this.pickYear}>{year} </a>
                        <span>年 {month} 月</span>
                    </div>
                    <a href="javascript:;" className="_nav _next _year" onClick={this.handleNextYear}>
                        <i></i>
                    </a>
                </div>
                <ul className="_picker-list">
                    {MONTH_LABEL.map((label, index) => {
                        let active = index + 1 === month ? '_active' : ''
                        return (<li key={`month-picker-${index + 1}`}>
                                    <a href="javascript:;" className={active}
                                        onClick={() => this.handleMonthPickerClick(index + 1)}>
                                        {label}
                                    </a>
                                </li>)
                    })}
                </ul>
            </div>
        )
    }

    renderYearPicker(){
        const { year } = this.state;
        const beginY = year - 6;
        const endY = year + 5;

        let yearRangeNodes = [];
        for (let i = beginY; i <= endY; i++) {
            let active = year === i ? '_active' : '';
            let isDisabled = i < 1900 ? '_disabled' : '';
            let yearItem = isDisabled ? 
                    <a href="javascript:;" className={isDisabled}>{i}</a>
                    : <a href="javascript:;" className={active} onClick={() => this.handleYearPickerClick(i)}>{i}</a>

            yearRangeNodes.push(<li key={`year-picker-${i}`}>
                                    {yearItem}
                                </li>)
        }

        return (
            <div className="_year-picker">
                <div className="_picker-label">
                    <a href="javascript:;" className="_nav _prev" onClick={() => this.handlePreYearRange(beginY)}>
                        <i></i>
                    </a>
                    <div className="_link">
                        <span>{beginY} ~ {endY}</span>
                    </div>
                    <a href="javascript:;" className="_nav _next" onClick={this.handleNextYearRange}>
                        <i></i>
                    </a>
                </div>
                <ul className="_picker-list">
                    {yearRangeNodes}
                </ul>
            </div>
        )
    }

    renderDayPicker(){
        const { year, month, value } = this.state;

        // date count in that month
        const dateCount = new Date(year, month, 0).getDate();

        // week index
        const index = new Date(year, month - 1, 1).getDay();
        let matrixNodes = [[]];
        let { begin, end } = this.props;

        for(let i = 0; i < dateCount + index; i ++){
            if (i < index) {
                matrixNodes[0].push(<td key={`canlender-col-${i}`}></td>);
            } else {
                const _index = i - index + 1;
                const row = Math.floor(i / 7);
                const itemDate = new Date(year, month - 1, _index);
                if (!matrixNodes[row]) matrixNodes[row] = [];

                let isDisabled = itemDate < begin || itemDate > end;

                matrixNodes[row].push(<td key={`canlender-col-${i}`}>
                                        <CalendarItem active={value.getTime() == itemDate.getTime() && !isDisabled} 
                                            disabled={isDisabled} isToday={TODAY.getDate() == itemDate.getDate()} 
                                            onClick={this.handleClick} value={itemDate} label={_index}/>
                                      </td>)
            }
        }

        return (
            <div className="_day-picker">
                <div className="_picker-label">
                    <a href="javascript:;" className="_nav _prev _year" onClick={this.handlePreYear}>
                        <i></i>
                    </a>
                    <a href="javascript:;" className="_nav _prev" onClick={this.handlePreMonth}>
                        <i></i>
                    </a>
                    <div className="_link">
                        <span className="_year-link" onClick={this.pickYear}> {year} </span>
                        <span>年 </span>
                        <span className="_month-link" onClick={this.pickMonth}> {month} </span>
                        <span>月</span>
                    </div>
                    <a href="javascript:;" className="_nav _next" onClick={this.handleNextMonth}>
                        <i></i>
                    </a>
                    <a href="javascript:;" className="_nav _next _year" onClick={this.handleNextYear}>
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
                        {matrixNodes.map((n, i) => {
                            return  <tr key={`canlender-row-${i}`}>
                                        {n}
                                    </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    render() {
        const {showPreview, type} = this.props
        const {current} = this.state
        let currentPicker = this[`render${current}Picker`]()
        return (
            <div className={klassName(this.props.className, 'calendar')}>
                {showPreview && type === 'day' ? this.renderPreview() : null}
                {currentPicker}
            </div>
        );
    }
}

Calendar.defaultProps = {
    className: "",
    showPreview: true,
    type: 'day',
}

Calendar.propTypes = {
    className: PropTypes.string,
    showPreview: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['day', 'month', 'year']),
}

class CalendarItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(value){
        if (!this.props.disabled) this.props.onClick(value);
    }

    render() {
        let {value, disabled, active, isToday} = this.props
        let className = ['_day']
        if (isToday) className.push('_today')
        if (disabled) className.push('_disabled')
        if (active) className.push('_active')
        className = className.join(' ')
        return (
            <a href="javascript:;" className={className} 
                onClick={() => this.handleClick(value)}>
                {this.props.label}
            </a>
        )
    }
}

CalendarItem.propTypes = {
    onClick: React.PropTypes.func,
}

module.exports = Calendar