import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  state = {
    ingredients: null,
    totalPrice: 0
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.push( this.props.match.path + '/contact-data' )
  }

  componentWillMount () {
    console.log(this.props)
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = 0
    for (let entry of query.entries()) {
      if (entry[0] === 'price') price = entry[1]
      else ingredients[entry[0]] = +entry[1]
    }
    this.setState( { ingredients: ingredients, totalPrice: price } )
  }

  render () {
    return (
      <div>
        <CheckoutSummary 
          ingredients = {this.state.ingredients}
          checkoutCancelled = { this.checkoutCancelledHandler }
          checkoutContinued = { this.checkoutContinuedHandler } />
        <Route 
          path = { this.props.match.path + '/contact-data' } 
          render = { () => (
            <ContactData 
              ingredients = { this.state.ingredients } 
              price = { this.state.totalPrice }
              {...this.props} />
          ) } />
      </div>
    )
  }
}

export default Checkout