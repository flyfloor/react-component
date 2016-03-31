const React = require('react');
const ReactDOM = require('react-dom');
const Item = require('./Item');
const DocumentClickMixin = require('./mixin/DocumentClickMixin');

const Menu = React.createClass ({
    mixins: [DocumentClickMixin],

    propTypes: {
        onSelect: React.PropTypes.func,
        mutex: React.PropTypes.bool,
        popped: React.PropTypes.bool,
        trigger: React.PropTypes.oneOf(['click', 'hover']),
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
            trigger: 'hover',
        };
    },

    closeMenu(){
        const {popped} = this.props;
        if (popped) {
            const base = ReactDOM.findDOMNode(this);
            const activeNodes = base.querySelectorAll('.sub-menu._active');
            const length = activeNodes.length;
            for (let i = 0; i < length; i++) {
                activeNodes[i].className = activeNodes[i].className.replace('_active', '');
            }
        }
    },

    toggleSubMenu(index){
        const {mutex, popped} = this.props;
        const node = ReactDOM.findDOMNode(this.refs[index]);
        console.log(popped, mutex)
        if (mutex || popped) {
            let base = ReactDOM.findDOMNode(this);
            const subMenuNodes = base.querySelectorAll('.sub-menu');
            const length = subMenuNodes.length;
            for (let i = 0; i < length; i++) {
                if (node === subMenuNodes[i]) continue;
                subMenuNodes[i].className = subMenuNodes[i].className.replace(' _active', '');
            }
        }
        let className = node.className;
        className = className.indexOf(' _active') !== -1 ? 
            className.replace(' _active', '') 
            : `${className} _active`;

        node.className = className;
    },

    handleItemClick(index){
        const {onSelect} = this.props;
        if (onSelect) onSelect(index);
        this.setState({
            current: index, 
        }, () => this.closeMenu());
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                current: nextProps.current
            });
        }
    },

    onOtherDomClick(e){
        this.closeMenu();
    },

    render() {
        const {current} = this.state;
        let {children, style, className, popped, mutex} = this.props;
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
                return <div className={className} key={`item-${i}`} ref={index}>
                            {sub ? <div className="_title _item" onClick={() => this.toggleSubMenu(index)}>{title}</div> : null}
                            <Menu {...children.props} mutex={mutex} popped={popped} current={current} onSelect={this.handleItemClick}>
                                {children.props.children}
                            </Menu>
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
            <div className={`ui menu ${className}`} style={style}>
                {menuNode}
            </div>
        );
    }
});

module.exports = Menu;
