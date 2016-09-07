const React = require('react');
const ReactDOM = require('react-dom');
const {removeClass, hasClass, addClass, getClassList} = require('./util/dom');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');
const klassName = require('./util/className');

const Menu = React.createClass ({
    mixins: [DocumentClickMixin],

    propTypes: {
        onChange: React.PropTypes.func,
        accordion: React.PropTypes.bool,
        popped: React.PropTypes.bool,
        horizontal: React.PropTypes.bool,
        mode: React.PropTypes.oneOf(['click', 'hover']),
    },

    getDefaultProps() {
        return {
            accordion: false,
            popped: false,
            horizontal: false,
            mode: 'click',
            className: '',
        };
    },

    getInitialState: function() {
        const {current} = this.props;
        return { current };
    },

    closeSubMenu(node){
        const {popped, mode, horizontal} = this.props;
        if (popped || mode === 'hover' || horizontal) {
            let base = node || ReactDOM.findDOMNode(this.refs.base);
            removeClass(base.querySelectorAll('.sub-menu._active'), '_active');
        }
    },

    toggleSubMenu(index){
        let {accordion, popped, horizontal} = this.props;
        const node = ReactDOM.findDOMNode(this.refs[index]);
        const active = hasClass(node, '_active');
        if (accordion || popped || horizontal) {
            const baseNode = ReactDOM.findDOMNode(this.refs.base);
            removeClass(baseNode.querySelectorAll('.sub-menu'), '_active');
        }
        active ? removeClass(node, '_active') : addClass(node, '_active');
        return false;
    },

    handleItemClick(index, disabled){
        if (disabled) return;
        const {onChange} = this.props;
        if (onChange) onChange(index);
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

    onOtherDomClick(){
        this.closeSubMenu();
    },

    formatChild(node, i, {current}){
        let {disabled, index, children} = node.props;
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

    formatSubMenu(node, i, { popped, accordion, mode, current, horizontal, level }) {
        let {title, index, disabled, active, children} = node.props;
        let className = getClassList(node.props);
        className.push('_item', 'sub-menu');
        if (active) className.push('_active');
        className = className.join(' ');
        const childNodes = <Menu {...children.props} disabled={disabled} mode={mode} level={level}
                                horizontal={horizontal} accordion={accordion} popped={popped} 
                                current={current} onChange={this.handleItemClick}>
                                {children.props.children}
                            </Menu>;

        if (mode === 'hover' || horizontal) {
            return <div className={className} key={`item-${i}`} ref={index}>
                        <div className="_title _item" onMouseEnter={() => this.toggleSubMenu(index)} 
                            onClick={() => this.toggleSubMenu(index)}>{title}</div>
                        {childNodes}
                    </div>;
        }
        return <div className={className} key={`item-${i}`} ref={index}>
                    <div className="_title _item" onClick={() => this.toggleSubMenu(index)}>{title}</div>
                    {childNodes}
                </div>
    },

    formatMenu(children, level){
        const {current} = this.state;
        const {popped, accordion, mode, horizontal} = this.props;
        return React.Children.map(children, (item, i) => {
            const {index, sub} = item.props;
            if (index === null || index === undefined) {
                throw new Error('index is needed for children of menu');
            }
            return sub ? this.formatSubMenu(item, i, { accordion, popped, mode, current, horizontal, level }) 
                        : this.formatChild(item, i, { current });
        });
    },

    render() {
        let {children, style, className, horizontal, popped, mode, level=0} = this.props;
        // menu deep level
        level = level + 1;
        className = klassName(className, `menu _menu-${level}`)
        if (popped) {
            className += ' _popped';
        }
        if (horizontal) {
            className += ' _horizontal';
        }
        if (!horizontal && !popped) {
            className += ' _default';
        }

        const menuNode = (mode === 'hover' && popped) || horizontal ?
            <div onMouseLeave={() => this.closeSubMenu()} ref="base" 
                className={`menu ${className} _hover`} style={style}>
                {this.formatMenu(children, level)}
            </div>
            : <div ref="base" className={className} style={style}>
                {this.formatMenu(children, level)}
            </div>

        return (
            menuNode
        );
    }
});

module.exports = Menu;
