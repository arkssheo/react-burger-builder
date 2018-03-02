import React, { Component } from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

  state = {
    ingredients: {
      cheese: 1,
      meat: 1,
      bacon: 1,
      salad: 1
    }
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.push('/contact-data')
  }

  componentDidMount () {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    for (let entry of query.entries()) {
      ingredients[entry[0]] = +entry[1]
    }
    this.setState( { ingredients: ingredients } )
  }

  render () {
    return (
      <div>
        <CheckoutSummary 
          ingredients = {this.state.ingredients}
          checkoutCancelled = { this.checkoutCancelledHandler }
          checkoutContinued = { this.checkoutContinuedHandler } />
      </div>
    )
  }
}

export default Checkout