const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const Tooltip = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    onOtherDomClick(e){
        this.setState({
            open: false, 
        });
    },

    handleOpen(e){
        this.onTrigger(e, true)
    },

    handleClose(e){
        this.onTrigger(e, false)
    },

    render() {
        let content = this.state.open ? <div className={'_wrap _' + this.props.position}>
                                            <div ref='content' className='_content'>
                                                <div className="_title">
                                                    {this.props.title}
                                                </div>
                                                <span className="_arrow" ref='arrow'></span>
                                            </div>
                                        </div> : null;
        return (
            <span className='ui confirm-box popup' style={this.props.style} onMouseOver={this.handleOpen} onMouseLeave={this.handleClose}>
                <span className="_trigger" ref='trigger'>
                    {this.props.children}
                </span>
                {content}
            </span>
        );
    }
});

module.exports = Tooltip;