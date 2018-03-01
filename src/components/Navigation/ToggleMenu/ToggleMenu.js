import React from 'react'

import classes from './ToggleMenu.css'

const toggleMenu = ( props ) => (
  <div onClick = { props.toggled } className = { classes.ToggleMenu }>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default toggleMenu