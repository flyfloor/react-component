import React from 'react';
import {validateTime, initMaxAndMiniByNum} from './util/Time';

const TimePicker = React.createClass({
    getInitialState() {
        let value = validateTime(this.props.value, this.timeParams());
        return {
            value: value,
            showPicker: false,
        };
    },

    timeParams(){
        return {
            spacer: this.props.spacer, 
            simple: this.props.simple,
            maxHour: this.props.maxHour,
            miniHour: this.props.miniHour,
            maxMin: this.props.maxMin,
            miniMin: this.props.miniMin,
            maxSec: this.props.maxSec,
            miniSec: this.props.miniSec,
        }
    },

    getDefaultProps() {
        return {
            simple: false,
            spacer: ':',
            value: '00:00:00'
        };
    },

    handleInputChange(e){
        this.setState({
            value: e.target.value,
        });
    },

    handleBlur(e){
        let value = validateTime(e.target.value, this.timeParams());
        this.setState({
            value: value,
            // showPicker: false,
        });
    },

    handleFocus(){
        this.setState({
            showPicker: true 
        });
    },

    formatSelectorNode(){
        let hourRangeNode = [], minRangeNode = [], secRangeNode = [];
        let hourRange = initMaxAndMiniByNum(this.props.maxHour, this.props.miniHour, 23)
        let minRange = initMaxAndMiniByNum(this.props.maxMin, this.props.miniMin, 59)
        let secRange = initMaxAndMiniByNum(this.props.maxSec, this.props.miniSec, 59)

        for(let i = hourRange.mini; i <= hourRange.max; i ++ )
           hourRangeNode.push(<li key={`hour-selector-${i}`}>{i}</li>)

        for(let i = minRange.mini; i <= minRange.max; i ++ )
           minRangeNode.push(<li key={`min-selector-${i}`}>{i}</li>)

        if (this.props.simple) {
            return <div className="_content">
                        <ul>
                            {hourRangeNode}
                        </ul>
                        <ul>
                            {minRangeNode}
                        </ul>
                    </div>
        }

        for(let i = secRange.mini; i <= secRange.max; i ++ )
           secRangeNode.push(<li key={`sec-selector-${i}`}>{i}</li>)

        return <div className="_content">
                    <ul>
                        {hourRangeNode}
                    </ul>
                    <ul>
                        {minRangeNode}
                    </ul>
                    <ul>
                        {secRangeNode}
                    </ul>
                </div>
    },

    render() {
        

        return (
            <div className="ui time-picker">
                <input className="_input" type="text" defaultValue={this.state.value} value={this.state.value} 
                    onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleInputChange}/>
                <div className={this.props.simple ? '_selector _simple' : '_selector'}>
                    {this.state.showPicker ? this.formatSelectorNode() : null}
                </div>
            </div>
        );
    }
});


export default TimePicker;