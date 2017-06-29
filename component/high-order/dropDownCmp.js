const PropTypes = require('prop-types')
const React = require('react')
const klassName = require('../util/className')
const POSITIONS = ['left', 'right', 'bottom', 'top']

module.exports = (Cmp, positions) => {
    class dropDownCmp extends Cmp {
        constructor(props) {
            super(props)
        }
        render(){
            let {className, position} = this.props
            className = klassName(className, `_${position}`)
            return (
                <Cmp {...this.props} className={className}/>
            )
        }
    }
    positions = positions instanceof Array ? positions : POSITIONS
    dropDownCmp.propTypes = {
        position: PropTypes.oneOf(positions),
    }

    dropDownCmp.defaultProps = {
        position: 'bottom',
    }
    return dropDownCmp
}