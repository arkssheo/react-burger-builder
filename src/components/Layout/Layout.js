import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.css'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  sidedrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } )
  }

  sidedrawerOpenedHandler = () => {
    this.setState( { showSideDrawer: true } )
    console.log('opened')
  }

  render () {
    return <Aux>
      <Toolbar 
        isAuth = { this.props.isAuthenticated }
        toggleMenu = { this.sidedrawerOpenedHandler } />
      <Sidedrawer 
        isAuth = { this.props.isAuthenticated }
        closed = { this.sidedrawerClosedHandler } 
        open = { this.state.showSideDrawer } />
      <main className = { classes.Content }>
        { this.props.children }
      </main>
    </Aux>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect( mapStateToProps )( Layout )