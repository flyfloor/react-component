const React = require('react');
const ReactDOM = require('react-dom');
const Item = require('./Item');
const {toggleClass, removeClass, hasClass, addClass} = require('./util/dom');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');

const Menu = React.createClass ({
    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func,
        mutex: React.PropTypes.bool,
        popped: React.PropTypes.bool,
        mode: React.PropTypes.oneOf(['click', 'hover']),
    },

    getDefaultProps() {
        return {
            mutex: false,
            popped: false,
            className: '',
        };
    },

    getInitialState: function() {
        const {current} = this.props;
        return {
            current,
            mode: 'click',
        };
    },

    closeSubMenu(node){
        const {popped, mode} = this.props;
        if (popped || mode === 'hover') {
            let base = node || ReactDOM.findDOMNode(this.refs.base);
            const activeNodes = base.querySelectorAll('.sub-menu._active');
            const length = activeNodes.length;
            for (let i = 0; i < length; i++) {
                activeNodes[i].className = activeNodes[i].className.replace(' _active', '');
            }
        }
    },

    toggleSubMenu(index){
        const {mutex, popped} = this.props;
        const node = ReactDOM.findDOMNode(this.refs[index]);
        const active = hasClass(node, '_active');
        if (mutex || popped) {
            let base = ReactDOM.findDOMNode(this.refs.base);
            removeClass(base.querySelectorAll('.sub-menu'), '_active');
        }
        if (active && !popped) {
            removeClass(node, '_active');
        } else {
            addClass(node, '_active');
        }
        // !active && !mutex ? addClass(node, '_active') : toggleClass(node, '_active');
    },

    handleItemClick(index){
        const {onSelect} = this.props;
        if (onSelect) onSelect(index);
        this.setState({
            current: index, 
        }, () => this.closeSubMenu());
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                current: nextProps.current
            });
        }
    },

    onOtherDomClick(e){
        this.closeSubMenu();
    },

    render() {
        const {current} = this.state;
        let {children, style, className, popped, mutex, mode} = this.props;
        let selected = false;
        if (popped) className = `${className} _popped`;

        let menuNode = React.Children.map(children, (item, i) => {
            let {sub, children, className, index, title, active} = item.props;
            if (index === null || index === undefined) return console.error('index is needed for children of menu');

            selected = index === current;
            className = [className];
            className.push('_item');

            if (sub) {
                className.push('sub-menu');
                if (active) className.push('_active');
                className = className.join(' ');
                const subMenuNodes = <Menu {...children.props} mutex={mutex} popped={popped} 
                                        current={current} onSelect={this.handleItemClick}>
                                        {children.props.children}
                                    </Menu>;

                return <div className={className} key={`item-${i}`} ref={index}>
                            {sub ? <div className="_title _item" onClick={() => this.toggleSubMenu(index)}>{title}</div> : null}
                            {subMenuNodes}
                        </div>;
            }

            className.push(' _child');
            if (selected) className.push(' _active');
            className = className.join(' ');

            return <div className={className} key={`item-${i}`} onClick={() =>this.handleItemClick(index)}>
                        {children}
                    </div>;
        })

        return (
            <div ref="base" className={`ui menu ${className}`} style={style}>
                {menuNode}
            </div>
        );
    }
});

module.exports = Menu;
