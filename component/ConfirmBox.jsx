import css from '../css/popup.less';

import DocumentClickMixin from '../mixin/DocumentClickMixin';

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin],

    getInitialState() {
        return {
            open: false, 
        };
    },

    onTrigger(e){
         const CONTENT = ReactDOM.findDOMNode(this.refs.content);
         if (CONTENT && (e.target == CONTENT || CONTENT.contains(e.target))) {

         } else {
            this.setState({
                open: !this.state.open 
            });
         }
    },

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
        let content = this.state.open ? <div ref='content' className='_content'>
                        <div className="_title">
                            {this.props.title}
                        </div>
                        <div className="_action">
                            <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>取消</a>
                            <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>确认</a>
                        </div>
                    </div> : null;
        return (
            <span className='ui confirm-box' onClick={this.onTrigger}>
                {this.props.children}
                {content}
            </span>
        );
    }
});

export default ConfirmBox;
