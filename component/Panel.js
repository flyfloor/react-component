const React = require('react')
const Component = React.Component
const PropTypes = require('prop-types')
const klassName = require('./util/className')

class Panel extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {className, title} = this.props
        return (
            <div className={klassName('panel', className)}>
                {title ?
                    <div className="_title">
                        {title}
                    </div>
                    :null}
                <div className="_content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Panel.propTypes = {
    title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
}

module.exports = Panel
