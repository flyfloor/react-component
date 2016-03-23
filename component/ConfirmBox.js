const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
        force: React.PropTypes.bool,
        content: React.PropTypes.element.isRequired,
        confirmBtn: React.PropTypes.element,
        cancelBtn: React.PropTypes.element,
    },

    closeConfirm(){
        this.setState({
            open: false 
        });
    },

    onOtherDomClick(e){
        if (!this.props.force) this.closeConfirm();
    },

    handleCancel(){
        const {onCancel} = this.props;
        if (!onCancel) return this.closeConfirm();
        if(onCancel()) this.closeConfirm();
    },

    handleConfirm(){
        const {onConfirm} = this.props;
        if (!onConfirm) return this.closeConfirm();
        if (onConfirm()) this.closeConfirm();
    },

    render() {
        const {confirmBtn, cancelBtn, position, content, style, children} = this.props;

        let contentNode = this.state.open ? 
            <div className={'_wrap _' + position}>
                <div ref='content' className='_content'>
                    <div className="_title">{content}</div>
                    <div className="_action">
                        <div className="_confirm" onClick={this.handleConfirm}>
                            {confirmBtn ?
                                confirmBtn
                                : <a href="javascript:;">ok</a>}
                        </div>
                        <div className="_cancel" onClick={this.handleCancel}>
                            {cancelBtn ?
                                cancelBtn
                                : <a href="javascript:;">cancel</a>}
                        </div>
                    </div>
                    <span className="_arrow" ref='arrow'></span>
                </div>
            </div> 
            : null;
        return (
            <span className='ui confirm-box popup' style={style} onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                {contentNode}
            </span>
        );
    }
});

module.exports = ConfirmBox;
