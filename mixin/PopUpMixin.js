const React = require('react');
const ReactDOM = require('react-dom');

const PopUpMixin = {
    propTypes: {
        position: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    },
    
    getInitialState() {
        return {
            open: false, 
        };
    },

    getDefaultProps() {
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
            // 
        } else {
            this.setState({
                open: !this.state.open 
            }, () => {
                contentDOM = ReactDOM.findDOMNode(this.refs.content);
                
                let arrowDOM = ReactDOM.findDOMNode(this.refs.arrow),
                    {style, arrowStyle} = this.calcPosition();

                if (contentDOM && arrowDOM) {
                    contentDOM.setAttribute("style", style);
                    arrowDOM.setAttribute("style", arrowStyle);
                }
            });
        }
    },

    calcPosition(){
        let {tr_width, tr_height} = this.triggerSize(),
            {c_width, c_height} = this.contentSize(),
            style, arrowStyle;
        
        switch(this.props.position){
            case 'left':
                style = `left:${ -10 - c_width }px;top:${- (tr_height + c_height) / 2}px`;
                arrowStyle = `left:-10px;top:${ - tr_height / 2 - 6 }px`;
                break;
            case 'right':
                style = `left:${ tr_width + 10 }px;top:${ - (tr_height + c_height) / 2}px`;
                arrowStyle = `left:${tr_width - 6}px;top:${ - tr_height / 2 - 6 }px`;
                break;
            case 'bottom':
                style = `left:${ tr_width / 2 - c_width / 2 }px;top:10px`;
                arrowStyle = `left:${ tr_width / 2 - 8 }px;top:-6px`;
                break;
            default:
                style = `left:${ tr_width / 2 - c_width / 2 }px;bottom:${ tr_height + 10 }px`;
                arrowStyle = `left:${ tr_width / 2 - 8 }px;bottom:${ tr_height - 6 }px`;
                break;
        }
        
        return {style, arrowStyle};
    },

}

module.exports = PopUpMixin;