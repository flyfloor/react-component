import css from '../css/popup.less';

import DocumentClickMixin from '../mixin/DocumentClickMixin';
import PopUpMixin from '../mixin/PopUpMixin';

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    closeConfirm(){
        this.setState({
            open: false 
        });
    },

    onOtherDomClick(e){
        this.closeConfirm();
    },

    handleCancel(){
        if (typeof this.props.onCancel === 'function') this.props.onCancel();
        this.closeConfirm();
    },

    handleConfirm(){
        if (typeof this.props.onConfirm === 'function') this.props.onConfirm();
        this.closeConfirm();
    },

    render() {
        let content = this.state.open ? <div className='_wrap'>
                                            <div ref='content' className='_content'>
                                                <div className="_title">
                                                    {this.props.title}
                                                </div>
                                                <div className="_action">
                                                    <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>确认</a>
                                                    <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>取消</a>
                                                </div>
                                            </div>
                                        </div> : null;
        return (
            <span className='ui confirm-box popup' onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {this.props.children}
                </span>
                {content}
            </span>
        );
    }
});

export default ConfirmBox;
