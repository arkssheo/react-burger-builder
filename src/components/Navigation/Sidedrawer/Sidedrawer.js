import React from 'react'
import classes from './Sidedrawer.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const sidedrawer = ( props ) => {

  let attachClasses = [ classes.Sidedrawer, classes.Closed]

  if (props.open) attachClasses = [ classes.Sidedrawer, classes.Open]

  return (
    <Aux>
      <Backdrop show = { props.open } clicked = { props.closed }/>
      <div className = { attachClasses.join(' ') } onClick = { props.closed } >
        <div className = { classes.Logo }>
          <Logo />  
        </div>
        <nav>
          <NavigationItems isAuthenticated = { props.isAuth } />
        </nav>
      </div>
    </Aux>
    
  )

}

export default sidedrawer