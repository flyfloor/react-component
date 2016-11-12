const React = require('react')
const klassName = require('./util/className')
const PropTypes = React.PropTypes

const Tab = React.createClass({
    propTypes: {
        onChange: PropTypes.func,
        bottom: PropTypes.bool,
        section: PropTypes.bool,
        vertical: PropTypes.bool,
    },
    getDefaultProps() {
        return {
            className: '',
            bottom: false,
            vertical: false,
            section: false,
        };
    },
    getInitialState() {
        const {current} = this.props;
        return {current};
    },

    handleItemClick(index){
        const {onChange} = this.props;
        if (onChange) onChange(index);
        this.setState({
            current: index, 
        });
    },

    componentWillReceiveProps(nextProps) {
        const {current} = this.props;
        if (nextProps.current !== current) {
            this.setState({
                current: nextProps.current
            });
        }
    },

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
    },

    render() {
        return (
            this.makeTab()
        );
    }
});

module.exports = Tab;