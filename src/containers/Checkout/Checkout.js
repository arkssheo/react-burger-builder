import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.push( this.props.match.path + '/contact-data' )
  }

  componentWillMount() {
    this.props.onPurchaseInit()
  }

  // componentWillMount () {
  //   console.log(this.props)
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let price = 0
  //   for (let entry of query.entries()) {
  //     if (entry[0] === 'price') price = entry[1]
  //     else ingredients[entry[0]] = +entry[1]
  //   }
  //   this.setState( { ingredients: ingredients, totalPrice: price } )
  // }

  render () {
    let summary = <Redirect to = "/" />
    if ( this.props.ings ) {
      const purchasedRedirect = this.props.purchased ? <Redirect to = "/" /> : null
      summary = (
        <div>
          { purchasedRedirect }
          <CheckoutSummary 
            ingredients = { this.props.ings }
            checkoutCancelled = { this.checkoutCancelledHandler }
            checkoutContinued = { this.checkoutContinuedHandler } />
          <Route 
            path = { this.props.match.path + '/contact-data' } 
            component = { ContactData } />
        </div>
      )
    } 
    return (
      <div>
        { summary }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: () => dispatch( actions.purchaseInit() )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Checkout )