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
            open: false,
            current,
            trigger: 'hover',
        };
    },

    toggleOpen(){
        this.setState({
            open: !this.state.open 
        });
    },

    openMenu(){
        this.setState({
            open: true, 
        });
    },

    closeMenu(){
        this.setState({
            open: false, 
        });
    },

    toggleSubMenu(index){
        const {mutex} = this.props;
        const node = ReactDOM.findDOMNode(this.refs[index]);
        if (mutex) {
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
            open: false,
            current: index, 
        });
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
        const {open, current} = this.state;
        let {children, style, className, popped} = this.props;
        let selected = false;
        if (popped) className = `${className} _popped`;

        let menuNode = React.Children.map(children, (item, i) => {
            let {sub, children, className, index, title, open} = item.props;
            if (index === null || index === undefined) return console.error('index is needed for children of menu');

            selected = index === current;
            className = selected ? `${className} _active`: className;
            className = [className];
            className.push('_item');
            if(sub) className.push('sub-menu');
            className = className.join(' ');

            if (sub) {
                return <div className={className} key={`item-${i}`} ref={index}>
                            {sub ? <div className="_title _item" onClick={() => this.toggleSubMenu(index)}>{title}</div> : null}
                            <Menu {...children.props} current={current} onSelect={this.handleItemClick}>
                                {children.props.children}
                            </Menu>
                        </div>;
            }

            className = `${className} _child`;

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
