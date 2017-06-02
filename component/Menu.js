const React = require('react')
const ReactDOM = require('react-dom')
const Component = React.Component
const PropTypes = require('prop-types')
const domUtil = require('./util/dom')
const klassName = require('./util/className')
const { toggleClass } = domUtil

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
            paddingLeft: this.props.paddingLeft,
            onMenuSelect: this.handleMenuSelect.bind(this)
        }
    }

    handleMenuSelect(current){
        this.setState({
            current
        });
    }

    render() {
        let newProps = Object.assign({}, this.props)
        delete newProps.paddingLeft
        return (
            <ul className="menu" {...newProps}></ul>
        );
    }
}

Menu.childContextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onMenuSelect: PropTypes.func,
    paddingLeft: PropTypes.number,
}

Menu.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingLeft: PropTypes.number,
}

Menu.defaultProps = {
    paddingLeft: 12,
}

const generateMenuItemByChildren = (children, opt) => {
    opt = opt || {}
    let type = opt.type || 'group'
    let level = opt.level || 1

    if (!children) {
        return null
    }

    if (children instanceof Array) {
        return (
            children.map((item, index) => {
                if (item.type === MenuItem) {
                    return (
                        <MenuItem key={index} 
                            {...item.props} level={level}
                            className={`_${type}-item _item`}>
                            {item.props.children}
                        </MenuItem>
                    )
                }
                if (item.type === SubMenu) {
                    return (
                        <SubMenu
                            key={`submenu-${index}`} 
                            {...item.props} level={level}>
                        </SubMenu>
                    )
                }
                if (item.type === MenuGroup) {
                    return (
                        <MenuGroup 
                            key={`group-${index}`} 
                            {...item.props} level={level}>
                        </MenuGroup>
                    )
                }
                return item
            })
        )
    }

    if (children.type === MenuItem) {
        return (
            <MenuItem {...children.props} level={level}
                className={`_${type}-item _item`}>
            </MenuItem>
        )
    }


    if (children.type === SubMenu) {
        return (
            <SubMenu {...children.props} level={level}>
            </SubMenu>
        )
    }

    if (children.type === MenuGroup) {
        return (
            <MenuGroup {...children.props} level={level}>
            </MenuGroup>
        )
    }
    return children
}


class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.toggleSubmenu = this.toggleSubmenu.bind(this)
    }
    toggleSubmenu(){
        let node = ReactDOM.findDOMNode(this)
        toggleClass(node, '_active')
    }
    render() {
        let newProps = Object.assign({}, this.props)
        let {paddingLeft} = this.context
        let {title, level} = newProps
        delete newProps.title
        delete newProps.level
        return (
            <li className="_submenu" {...newProps}>
                <div className="_title" style={{'paddingLeft': `${paddingLeft * level}px`}}
                    onClick={this.toggleSubmenu}>
                    {title}
                </div>
                <ul className="_content">
                    {generateMenuItemByChildren(newProps.children, { type: 'submenu', level: level + 1 })}
                </ul>
            </li>
        )
    }
}

SubMenu.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
}

SubMenu.contextTypes = {
    paddingLeft: PropTypes.number,
}

SubMenu.defaultProps = {
    level: 1,
}


const MenuGroup = (props, context) => {
    let newProps = Object.assign({}, props)
    let {title, level} = newProps
    delete newProps.title
    delete newProps.level
    return (
        <li className="_group" {...newProps}>
            <div className="_title" style={{'paddingLeft': `${context.paddingLeft * level}px`}}>{title}</div>
            <ul className="_content">
                {generateMenuItemByChildren(newProps.children, { level: level + 1 })}
            </ul>
        </li>
    )
}


MenuGroup.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
}

MenuGroup.contextTypes = {
    paddingLeft: PropTypes.number,
}

MenuGroup.defaultProps = {
    level: 1,
}

const MenuItem = (props, context) => {
    const newProps = Object.assign({}, props)
    let {index, className, disabled, level} = newProps
    delete newProps.index
    delete newProps.level
    if (!index) {
        throw Error('index is needed on MenuItem')
    }
    const { current, onMenuSelect, paddingLeft } = context
    let active = index === current
    className = klassName(className, active ? '_active _item' : '_item', disabled ? '_disabled' : '')

    return (
        <li {...newProps} className={className}
            style={{'paddingLeft': `${paddingLeft * level}px`}}
            onClick={() => {
                if (disabled) {
                    return
                }
                onMenuSelect(index)
                if (props.onClick) {
                    props.onClick(index)
                }
            }}>
        </li>
    )
}

MenuItem.propTypes = {
    onClick: PropTypes.func,
    level: PropTypes.number,
}

MenuItem.contextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paddingLeft: PropTypes.number,
    onMenuSelect: PropTypes.func,
};

MenuItem.defaultProps = {
    level: 1,
};

module.exports = {
    Menu, MenuGroup, MenuItem, SubMenu
}