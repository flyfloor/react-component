const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')

class Item extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div {...this.props}></div>
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
