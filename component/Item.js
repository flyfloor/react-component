const React = require('react')

const Item = React.createClass({
    propTypes: {
        children: React.PropTypes.node,
    },
    getDefaultProps() {
        return {
            className: '',
        };
    },
    render() {
        const {children} = this.props;
        return (
            <div {...this.props}>
                {children}
            </div>
        );
    }
});

module.exports = Item
