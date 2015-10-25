import css from '../css/popup.less';

import DocumentClickMixin from '../mixin/DocumentClickMixin';
import PopUpMixin from '../mixin/PopUpMixin';

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
            <span className='ui confirm-box popup' onMouseOver={this.onTrigger} onMouseLeave={this.onTrigger}>
                <span className="_trigger" ref='trigger'>
                    {this.props.children}
                </span>
                {content}
            </span>
        );
    }
});

export default Tooltip;