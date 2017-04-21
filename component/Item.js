const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')

class Item extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {children} = this.props;
        return (
            <div {...this.props}>
                {children}
            </div>
        );
    }
}

Item.propTypes = {
    children: PropTypes.node,
}

Item.defaultProps = {
    className: '',
}

module.exports = Item
