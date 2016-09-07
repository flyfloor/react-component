const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');
const klassName = require('./util/className');

const Tooltip = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        content: React.PropTypes.element.isRequired,
        mode: React.PropTypes.oneOf(['hover', 'click'])
    },

    getDefaultProps() {
        return {
            className: '',
            mode: 'hover'
        };
    },

    onOtherDomClick(){
        this.setState({
            open: false, 
        });
    },

    render() {
        const {open} = this.state;
        let {position, content, style, className, children, mode} = this.props;
        className = klassName('popup', className)
        if (open) {
            className = `${className} _active`;
        }

        let onMouseLeave = null, 
            onMouseEnter = null, 
            onClick = null;

        if (mode === 'click') {
            onClick = (e) => this.onTrigger(e);
        } else {
            onMouseEnter = (e) => this.onTrigger(e, true);
            onMouseLeave = (e) => this.onTrigger(e, false);
        }

        return (
            <span className={className} style={style} onClick={onClick}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <span className="_trigger" ref='trigger'>
                    {children}
                </span>
                <div className={`_wrap _${position}`}>
                    <div ref='content' className='_content'>
                        <div className="_title">
                            {content}
                        </div>
                        <span className="_arrow" ref='arrow'></span>
                    </div>
                </div> 
            </span>
        );
    }
});

module.exports = Tooltip;