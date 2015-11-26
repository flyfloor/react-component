const React = require('react');
const css = require('./css/popup.less');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const Tooltip = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    onOtherDomClick(e){
        this.setState({
            open: false, 
        });
    },

    render() {
        let content = this.state.open ? <div className={'_wrap _' + this.props.position}>
                                            <span className="_arrow" ref='arrow'></span>
                                            <div ref='content' className='_content'>
                                                <div className="_title">
                                                    {this.props.title}
                                                </div>
                                            </div>
                                        </div> : null;
        return (
            <span className='ui confirm-box popup' style={this.props.style} onMouseOver={this.onTrigger} onMouseLeave={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {this.props.children}
                </span>
                {content}
            </span>
        );
    }
});

module.exports = Tooltip;