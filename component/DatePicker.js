const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const formatDate = require('./util/datetime').formatDate
const documentClickCmp = require('./high-order/documentClickCmp')
const dropDownCmp = require('./high-order/dropDownCmp')
const Calendar = require('./Calendar')
const klassName = require('./util/className')

const _DATE_FORMAT = {
    day: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    year: 'yyyy',
}

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.handleValChange = this.handleValChange.bind(this)

        const value = this.initDate();
        this.state = {
            value, 
            open: false,
        }
    }

    initDate(date=this.props.value){
        if (!date) {
            return 
        }
        return new Date(date.getTime())
    }

    onOtherDomClick(){
        this.setState({
            open: false
        });
    }

    handleValChange(value){
        this.setState({
            value,
            open: false
        });
        this.props.onChange(new Date(value.getTime()))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: this.initDate(nextProps.value)
            });
        }
    }

    render() {
        const {open, value} = this.state;
        let {
            begin, end, className, placeHolder, 
            showPreview, format, type,
            onClick, onBlur, onFocus,
        } = this.props;
        format = format || _DATE_FORMAT[type]
        let valueStr = value ? formatDate(value, format) : ''
        if (open) className += ' _active';
        return (
            <div className={klassName('datepicker', className)}>
                <div className="input" onClick={() => {
                    this.setState({ open: true }) 
                    if (onClick) onClick()
                }}>
                    <input type="text" className="_input" onFocus={onFocus} onBlur={onBlur} 
                        value={valueStr} readOnly placeholder={placeHolder} />
                    <i></i>
                </div>
                <ReactCssTransitionGroup className="_picker" transitionName="datepicker"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ?
                        <Calendar begin={begin} end={end} 
                            type={type} showPreview={showPreview}
                            value={value} onChange={this.handleValChange}/>
                        : null
                    }
                </ReactCssTransitionGroup>
            </div>
        );
    }
}

DatePicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    showPreview: PropTypes.bool,
    format: PropTypes.string,
    value: PropTypes.instanceOf(Date),
    type: PropTypes.oneOf(['day', 'month', 'year']),
}

DatePicker.defaultProps = {
    className: '',
    placeHolder: 'select date',
    showPreview: true,
    type: 'day',
}

module.exports = dropDownCmp(documentClickCmp(DatePicker))