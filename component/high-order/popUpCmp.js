const PropTypes = require('prop-types')
const ReactDOM = require('react-dom')

module.exports = Cmp => {
    class PopUpCmp extends Cmp {
        constructor(props) {
            super(props)
            this.triggerSize = this.triggerSize.bind(this)
            this.onTrigger = this.onTrigger.bind(this)
            this.calcPosition = this.calcPosition.bind(this)

            this.state = {
                open: false,
            }
        }

        triggerSize(){
            const TRG = ReactDOM.findDOMNode(this.refs.trigger);
            return {
                tr_width: TRG.offsetWidth,
                tr_height: TRG.offsetHeight,
            };
        }

        contentSize(){
            const CONTENT = ReactDOM.findDOMNode(this.refs.content); 
            if (!CONTENT) return {width: 0, height: 0};
            return {
                c_width: CONTENT.offsetWidth,
                c_height: CONTENT.offsetHeight,
            };
        }
        
        // popup close
        popUpClose(){
            this.setState({
                open: false 
            });
        }

        onTrigger(e, state){
            let contentDOM = ReactDOM.findDOMNode(this.refs.content);
            if (contentDOM && (e.target == contentDOM || contentDOM.contains(e.target))) {
                // do nothing
            } else {
                state = state !== null && state !== undefined ? state : !this.state.open;
                this.setState({
                    open: state
                }, () => {
                    contentDOM = ReactDOM.findDOMNode(this.refs.content);
                    if (contentDOM) contentDOM.setAttribute("style", this.calcPosition());
                });
            }
        }

        calcPosition(){
            let {tr_width, tr_height} = this.triggerSize(),
                {c_width, c_height} = this.contentSize(),
                style;


            switch(this.props.position){
                case 'left':
                    style = `left:${ -10 - c_width }px;top:${- (tr_height + c_height) / 2}px`;
                    break;
                case 'right':
                    style = `left:${ tr_width + 10 }px;top:${ - (tr_height + c_height) / 2}px`;
                    break;
                case 'bottom':
                    style = `left:${ tr_width / 2 - c_width / 2 }px;top:10px`;
                    break;
                default:
                    style = `left:${ tr_width / 2 - c_width / 2 }px;bottom:${ tr_height + 10 }px`;
                    break;
            }
            
            return style;
        }
    }
    PopUpCmp.propTypes = {
        position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    }

    PopUpCmp.defaultProps = {
        position: 'top',
    }

    return PopUpCmp
}