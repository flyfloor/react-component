const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const Tooltip = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        content: React.PropTypes.element.isRequired,
    },

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
        const {open} = this.state;
        const {position, content, style, className, children} = this.props;
        let contentNode = this.state.open ? 
                <div className={`_wrap _${position}`}>
                    <div ref='content' className='_content'>
                        <div className="_title">
                            {content}
                        </div>
                        <span className="_arrow" ref='arrow'></span>
                    </div>
                </div> 
                : null;
        return (
            <span className='ui confirm-box popup' style={style} 
                onMouseOver={this.handleOpen} onMouseLeave={this.handleClose}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                {contentNode}
            </span>
        );
    }
});

module.exports = Tooltip;