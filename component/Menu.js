const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current
        }
    }

    getChildContext(){
        const {current} = this.state
        return {
            current,
            onMenuSelect: this.handleMenuSelect.bind(this)
        }
    }

    handleMenuSelect(current){
        this.setState({
            current
        });
    }

    render() {
        return (
            <div className="menu" {...this.props}></div>
        );
    }
}

Menu.childContextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMenuSelect: PropTypes.func,
}

Menu.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

class SubMenu extends Component {
    render() {
        return (
            <div {...this.props}></div>
        );
    }
}

const MenuGroup = props => {
    return (
        <div className="_group" {...props}></div>
    )
}

MenuGroup.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
}

const MenuItem = (props, context) => {
    const newProps = Object.assign({}, props)
    const {index} = newProps
    delete newProps.index
    if (!index) {
        throw Error('index is needed on MenuItem')
    }
    const { current, onMenuSelect } = context
    let active = index === current
    let className = active ? '_active _item' : '_item'
    return (
        <div className={className} {...newProps} 
            onClick={() => {
                onMenuSelect(index)
                if (props.onClick) {
                    props.onClick(index)
                }
            }}>
        </div>
    )
}

MenuItem.propTypes = {
    onClick: PropTypes.func,
}

MenuItem.contextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMenuSelect: PropTypes.func,
};

module.exports = {
    Menu, MenuGroup, MenuItem, SubMenu
}