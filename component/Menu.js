const React = require('react');
const ReactDOM = require('react-dom');
const Item = require('./Item');
const {toggleClass, removeClass, hasClass, addClass, getClassList} = require('./util/dom');
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
            mode: 'click',
            className: '',
        };
    },

    getInitialState: function() {
        const {current} = this.props;
        return { current };
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
            const baseNode = ReactDOM.findDOMNode(this.refs.base);
            removeClass(baseNode.querySelectorAll('.sub-menu'), '_active');
        }
        active && !popped ? removeClass(node, '_active') : addClass(node, '_active');
    },

    handleItemClick(index, disabled){
        if (disabled) return;
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

    formatChild(node, i, {current}){
        let {classList, disabled, index, children} = node.props;
        const selected = current === index;
        let className = getClassList(node.props);
        className.push('_child', '_item');
        if (selected) className.push('_active');
        if (disabled) className.push('_disabled');
        className = className.join(' ');
        return <div className={className} key={`item-${i}`} onClick={() =>this.handleItemClick(index, disabled)}>
                    {children}
                </div>;
    },

    formatSubMenu(node, i, { popped, mutex, mode, current }) {
        let {title, index, disabled, active, children} = node.props;
        let className = getClassList(node.props);
        className.push('_item', 'sub-menu');
        if (active) className.push('_active');
        className = className.join(' ');
        const childNodes = <Menu {...children.props} disabled={disabled} mode={mode} mutex={mutex} popped={popped} 
                                current={current} onSelect={this.handleItemClick}>
                                {children.props.children}
                            </Menu>;

        if (mode === 'hover') {
            return <div className={className} key={`item-${i}`} ref={index}>
                        <div className="_title _item" onMouseOver={() => this.toggleSubMenu(index)} 
                            onClick={() => this.toggleSubMenu(index)}>{title}</div>
                        {childNodes}
                    </div>;
        }
        return <div className={className} key={`item-${i}`} ref={index}>
                    <div className="_title _item" onClick={() => this.toggleSubMenu(index)}>{title}</div>
                    {childNodes}
                </div>
    },

    formatMenu(children){
        const {current} = this.state;
        const {popped, mutex, mode} = this.props;
        return React.Children.map(children, (item, i) => {
            const {index, sub} = item.props;
            if (index === null || index === undefined) return console.error('index is needed for children of menu');
            return sub ? this.formatSubMenu(item, i, { mutex, popped, mode, current }) 
                        : this.formatChild(item, i, { current });
        });
    },

    render() {
        let {children, style, className, popped, mode} = this.props;
        if (popped) className = `${className} _popped`;
        const menuNode = mode === 'hover' ?
            <div onMouseLeave={() => this.closeSubMenu()} ref="base" 
                className={`ui menu ${className}`} style={style}>
                {this.formatMenu(children)}
            </div>
            : <div ref="base" className={`ui menu ${className}`} style={style}>
                {this.formatMenu(children)}
            </div>

        return (
            menuNode
        );
    }
});

module.exports = Menu;
