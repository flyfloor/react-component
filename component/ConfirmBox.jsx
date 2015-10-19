import DocumentClickMixin from '../mixin/DocumentClickMixin';

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin],

    getInitialState() {
        return {
            open: false, 
        };
    },

    onTrigger(e){
        this.setState({
            open: !this.state.open 
        });
    },

    closeConfirm(){
        this.setState({
            open: false 
        });
    },
    
    onOtherDom(e){
        this.closeConfirm();
    },

    handleCancel(){
        if (typeof this.props.onCancel() === 'function') this.props.onCancel();
        this.closeConfirm();
    },

    handleConfirm(){
        if (typeof this.props.onConfirm() === 'function') this.props.onConfirm();
        this.closeConfirm();
    },

    render() {
        let content = this.state.open ? 
                    <div className='_content'>
                        <div className="_title">
                            {this.props.title}
                        </div>
                        <div className="_action">
                            <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>取消</a>
                            <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>确认</a>
                        </div>
                    </div>
                    : null;
        return (
            <div class='ui confirm-box'>
                <div onClick={this.onTrigger}>
                    {this.props.children}
                </div>
                {content}
            </div>
        );
    }
});

export default ConfirmBox;
