const React = require('react');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const PopUpMixin = require('./mixin/PopUpMixin');

const Tooltip = React.createClass({
    mixins: [DocumentClickMixin, PopUpMixin],

    propTypes: {
        content: React.PropTypes.element.isRequired,
    },

    getDefaultProps() {
        return {
            className: '',
        };
    },

    onOtherDomClick(e){
        this.setState({
            open: false, 
        });
    },

    render() {
        const {open} = this.state;
        let {position, content, style, className, children} = this.props;
        className = `ui confirm-box popup ${className}`;
        if (open) className = `${className} _active`;

        return (
            <span className={className} style={style} 
                onMouseEnter={(e) => this.onTrigger(e, true)} onMouseLeave={(e) => this.onTrigger(e, false)}>
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