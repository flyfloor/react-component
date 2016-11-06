const React = require('react')
const ReactCssTransitionGroup = require('react-addons-css-transition-group')
const DocumentClickMixin = require('./mixin/DocumentClickMixin')
const PopUpMixin = require('./mixin/PopUpMixin')
const klassName = require('./util/className')

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        onCancel: React.PropTypes.func,
        onConfirm: React.PropTypes.func,
        force: React.PropTypes.bool,
        content: React.PropTypes.element.isRequired,
        confirm: React.PropTypes.element,
        cancel: React.PropTypes.element,
    },

    closeConfirm(){
        this.setState({
            open: false 
        });
    },

    getDefaultProps() {
        return {
            className: '',
        };
    },

    onOtherDomClick(){
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
        let {confirm, cancel, position, className, content, style, children} = this.props;
        const {open} = this.state;
        className = klassName('confirm-box popup', className);
        if (open) {
            className = `${className} _active`;
        }

        return (
            <span className={className} style={style} onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                <ReactCssTransitionGroup className={'_wrap _' + position} transitionName="popup"
                    transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                    {open ?
                        <div ref='content' className='_content'>
                            <div className="_title">{content}</div>
                            <div className="_action">
                                <div className="_confirm" onClick={this.handleConfirm}>
                                    {confirm ?
                                        confirm
                                        : <div>ok</div>}
                                </div>
                                <div className="_cancel" onClick={this.handleCancel}>
                                    {cancel ?
                                        cancel
                                        : <div>cancel</div>}
                                </div>
                            </div>
                            <span className="_arrow" ref='arrow'></span>
                        </div>
                        : null
                    }
                </ReactCssTransitionGroup>
            </span>
        );
    }
});

module.exports = ConfirmBox