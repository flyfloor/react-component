const React = require('react');
const klassName = require('./util/className');

const Tab = React.createClass({
    propTypes: {
        onChange: React.PropTypes.func,
    },
    getDefaultProps() {
        return {
            className: '',
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
        let {children, style, className} = this.props;
        className = klassName(className, 'tab');
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

        return (
            <div className={className} style={style}>
                <div className="_tab">{tabs}</div>
                <div className="_content">{contents}</div>
            </div>
        )
    },

    render() {
        return (
            this.makeTab()
        );
    }
});

module.exports = Tab;