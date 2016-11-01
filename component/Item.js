import React from 'react'

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

export default Item
