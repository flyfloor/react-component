import css from '../css/confirm-box.less';

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
        let content = ReactDOM.findDOMNode(this.refs.content);
        if (!content) {
            let dom = document.createElement('div');
            dom.setAttribute('id', 'confirm_box_container');
            document.body.appendChild(dom);

            content = <div ref='content' className='_wrap'>
                        <div className="_title">
                            {this.props.title}
                        </div>
                        <div className="_action">
                            <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>取消</a>
                            <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>确认</a>
                        </div>
                    </div>;
            ReactDOM.render(<div>{content}</div>, document.getElementById('confirm_box_container'));
        };
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
        return (
            <div className='ui confirm-box'>
                <span className='_trigger' onClick={this.onTrigger}>
                    {this.props.children}
                </span>
            </div>
        );
    }
});

export default ConfirmBox;
