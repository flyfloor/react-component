const React = require('react')
const ReactDOM = require('react-dom')
const PropTypes = require('prop-types')

const Component = React.Component
const documentClickCmp = require('./high-order/documentClickCmp')
const domUtil = require('./util/dom')
const klassName = require('./util/className')
const { hasClass, removeClass, addClass } = domUtil

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current
        }
    }

    getChildContext(){
        const {current} = this.state
        const {mode} = this.props
        return {
            current,
            mode,
            paddingLeft: this.props.paddingLeft,
            onMenuSelect: this.handleMenuSelect.bind(this),
            mutexSubmenu: this.clearSubmenuSelection.bind(this),
        }
    }

    // submenu toggle
    clearSubmenuSelection(ref){
        const baseNode = ReactDOM.findDOMNode(ref || this).parentNode
        removeClass(baseNode.querySelectorAll('._submenu'), '_active')
    }

    handleMenuSelect(current){
        this.setState({
            current
        });
        const {onChange, mode} = this.props
        if (['horizontal'].indexOf(mode) !== -1) {
            let that = this
            setTimeout(() => {
                that.clearSubmenuSelection()
            }, 200)
        }
        if (onChange) {
            onChange(current)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.current !== this.props.current) {
            this.setState({
                current: nextProps.current
            });
        }
    }

    render() {
        let newProps = Object.assign({}, this.props)
        let {className, mode} = this.props
        className = klassName('menu', mode, className)
        delete newProps.paddingLeft
        delete newProps.current
        return (
            <ul {...newProps} className={className}></ul>
        );
    }
}

Menu.childContextTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    mode: PropTypes.oneOf(['', 'accordion', 'horizontal', 'popup']),
    onMenuSelect: PropTypes.func,
    mutexSubmenu: PropTypes.func,
    paddingLeft: PropTypes.number,
}

Menu.propTypes = {
    current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    paddingLeft: PropTypes.number,
    mode: PropTypes.oneOf(['', 'accordion', 'horizontal', 'popup']),
}

Menu.defaultProps = {
    paddingLeft: 16,
    mode: '',
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
                if (level !== 1 && item.type === MenuGroup) {
                    return (
                        <MenuGroup 
                            key={`group-${index}`} 
                            {...item.props} level={level}>
                        </MenuGroup>
                    )
                }
                return null
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

    if (level !== 1 && children.type === MenuGroup) {
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

    toggleSubmenu(status){
        let node = ReactDOM.findDOMNode(this)
        const {mode} = this.context
        let active = status !== undefined ? !status : hasClass(node, '_active')

        if (['accordion', 'horizontal'].indexOf(mode) !== -1) {
            this.context.mutexSubmenu(this)
        }
        active ? removeClass(node, '_active') : addClass(node, '_active')
    }
    render() {
        let newProps = Object.assign({}, this.props)
        let {title, level, active, className} = newProps
        let {paddingLeft, mode} = this.context
        className = klassName('_submenu', className, active ? '_active': '')

        if (['popup', 'horizontal'].indexOf(mode) !== -1) {
            newProps.onMouseEnter = e => {
                e.preventDefault()
                this.toggleSubmenu(true)
            }
            newProps.onMouseLeave = e => {
                e.preventDefault()
                this.toggleSubmenu(false)
            }
        }
        
        delete newProps.title
        delete newProps.level
        delete newProps.active

        return (
            <li {...newProps} className={className}>
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
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    active: PropTypes.bool,
}

SubMenu.contextTypes = {
    paddingLeft: PropTypes.number,
    mutexSubmenu: PropTypes.func,
    mode: PropTypes.oneOf(['', 'accordion', 'popup', 'horizontal']),
}

SubMenu.defaultProps = {
    level: 1,
    active: false,
}


const MenuGroup = (props, context) => {
    let newProps = Object.assign({}, props)
    let {title, level} = newProps
    delete newProps.title
    delete newProps.level
    return (
        <li className="_group" {...newProps}>
            <div className="_title" style={{'paddingLeft': `${context.paddingLeft * level}px`}}>
                {title}
            </div>
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
    Menu: documentClickCmp(Menu), 
    MenuGroup, 
    MenuItem, 
    SubMenu
}