const React = require('react');

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

    makeTabItems(children){
        const {current} = this.state;
        let tabs = [], 
            contents = [];

        React.Children.map(children, (node, i) => {
            let {index, title=index, children} = node.props;
            if (index === null || index === undefined) {
                throw new Error('index is needed for children of tab');
            }
            let className = index === current ? `_item _active`: '_item';
            if ((current === undefined || current === null) && i === 0) className += ' _active';
            tabs.push(<div key={`tab_${i}`} className={className} onClick={() => this.handleItemClick(index)}>
                        {title}
                    </div>);
            contents.push(<div key={`content_${i}`} className={className}>
                            {children}
                        </div>);
        })

        return (
            <div>
                <div className="_tab">{tabs}</div>
                <div className="_content">{contents}</div>
            </div>
        )
    },

    render() {
        const {children, style, className} = this.props;
        return (
            <div className={`ui tab ${className}`} style={style}>
                {this.makeTabItems(children)}
            </div>
        );
    }
});

module.exports = Tab;