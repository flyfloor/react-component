const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class Tab extends Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this)

        const {current} = props
        this.state = {
            current
        }
    }

    componentWillReceiveProps(nextProps) {
        const {current} = this.props;
        if (nextProps.current !== current) {
            this.setState({
                current: nextProps.current
            });
        }
    }

    handleItemClick(index){
        const {onChange} = this.props;
        if (onChange) onChange(index);
        this.setState({
            current: index, 
        });
    }

    makeTab(){
        let {children, style, className, vertical, section, bottom} = this.props;
        className = klassName(className, 'tab');
        if (vertical) {
            className += ' vertical'
        }
        if (section) {
            className += ' section'
        }
        if (bottom) {
            className += ' bottom'
        }
        const {current} = this.state;
        let tabs = [], 
            contents = [];

        React.Children.map(children, (node, i) => {
            let {index, title=index, children} = node.props;
            if (index === null || index === undefined) {
                throw new Error('index is needed for children of tab');
            }
            let cls = index === current ? `_item _active`: '_item';
            if ((current === undefined || current === null) && i === 0) cls += ' _active';
            tabs.push(<div key={`tab_${i}`} className={cls} onClick={() => this.handleItemClick(index)}>
                        {title}
                    </div>);
            contents.push(<div key={`content_${i}`} className={cls}>
                            {children}
                        </div>);
        })
        
        let node = bottom ?
                    <div className={className} style={style}>
                        <div className="_content">{contents}</div>
                        <div className="_tab">{tabs}</div>
                    </div>
                    : <div className={className} style={style}>
                            <div className="_tab">{tabs}</div>
                            <div className="_content">{contents}</div>
                        </div>

        return (
            node
        )
    }

    render() {
        return (
            this.makeTab()
        );
    }
}

Tab.propTypes = {
    onChange: PropTypes.func,
    bottom: PropTypes.bool,
    section: PropTypes.bool,
    vertical: PropTypes.bool,
}

Tab.defaultProps = {
    className: '',
    bottom: false,
    vertical: false,
    section: false,
}

module.exports = Tab;