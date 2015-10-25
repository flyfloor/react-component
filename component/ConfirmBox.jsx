import css from '../css/popup.less';

import DocumentClickMixin from '../mixin/DocumentClickMixin';

const ConfirmBox = React.createClass({
    mixins: [DocumentClickMixin],

    getInitialState() {
        return {
            open: false, 
        };
    },

    getDefaultProps: function() {
        return {
            position: 'top',
        };
    },

    triggerSize(){
        const TRG = ReactDOM.findDOMNode(this.refs.trigger);
        return {
            tr_width: TRG.offsetWidth,
            tr_height: TRG.offsetHeight,
        }
    },

    contentSize(){
        const CONTENT = ReactDOM.findDOMNode(this.refs.content); 
        if (!CONTENT) return {width: 0, height: 0}
        return {
            c_width: CONTENT.offsetWidth,
            c_height: CONTENT.offsetHeight,
        }
    },

    onTrigger(e){
        let contentDOM = ReactDOM.findDOMNode(this.refs.content);
        if (contentDOM && (e.target == contentDOM || contentDOM.contains(e.target))) {

        } else {
            this.setState({
                open: !this.state.open 
            }, () => {
                contentDOM = ReactDOM.findDOMNode(this.refs.content);
                console.log(this.calcPosition());
                contentDOM.setAttribute("style", this.calcPosition());
            });
        }
    },

    calcPosition(){
        let {tr_width, tr_height} = this.triggerSize(),
            {c_width, c_height} = this.contentSize(),
            style = {};
        
        switch(this.props.position){
            case 'left':
                style = `left:${-10 - c_width}px;top:${ - c_height / 2}px`;
                break;
            case 'right':
                style = `left:${tr_width + 10}px;top:${ - c_height / 2}px`;
                break;
            case 'bottom':
                style = `left:${tr_width / 2 - c_width / 2}px;top:10px`;
                break;
            default:
                style = `left:${tr_width / 2 - c_width / 2}px;bottom:${tr_height + 10}px`;
                break;
        }
        return style;
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
        let content = this.state.open ? <div className='_wrap'>
                                            <div ref='content' className='_content'>
                                                <div className="_title">
                                                    {this.props.title}
                                                </div>
                                                <div className="_action">
                                                    <a href="javascript:;" className="_cancel" onClick={this.handleCancel}>取消</a>
                                                    <a href="javascript:;" className="_confirm" onClick={this.handleConfirm}>确认</a>
                                                </div>
                                            </div>
                                        </div> : null;
        return (
            <span className='ui confirm-box' onClick={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {this.props.children}
                </span>
                {content}
            </span>
        );
    }
});

export default ConfirmBox;
