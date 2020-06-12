import React from 'react'
import PropTypes from 'prop-types'

const Styledbox = function (props) {
  const {title,text,actionComponent,backgroundColorClass} = props

  return(
    <div className="col-md-3 col-sm-6">
      <div className={backgroundColorClass + " counter"}>
        <span className="counter-value">{text}</span>
        <h3>{title}</h3>
        {actionComponent}
      </div>
    </div>
  )
}

Styledbox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  actionComponent: PropTypes.element,
  backgroundColorClass: PropTypes.string
}

Styledbox.defaultProps = {
  actionComponent: <div/>,
  backgroundColor: 'orange'
}
export default Styledbox

