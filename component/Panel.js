const React = require('react')
const PropTypes = React.PropTypes
const klassName = require('./util/className')

const Panel = React.createClass({
    propTypes: {
        title: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    },
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
})

module.exports = Panel
