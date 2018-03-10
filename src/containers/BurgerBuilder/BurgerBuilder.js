import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map( igKey => {
      return ingredients[igKey]
    }).reduce( ( sum, el) => {
      return sum + el
    }, 0)

    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState( { purchasing: true } )
    } else {
      this.props.onSetRedir('/checkout')
      this.props.history.push('/auth')
    }
    
  }

  purchaseCancelledHandler = () => {
    this.setState( { purchasing: false } )
  }

  purchaseContinueHandler = () => {
    // const queryParams = []
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&')
    this.props.history.push( {
      pathname: '/checkout'
      // search: '?' + queryString
    } )
  }

  render () {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
    
    if ( this.props.ings ) {
      burger = (
        <Aux>
          <Burger ingredients = { this.props.ings } />
          <BuildControls
            isAuth = { this.props.isAuthenticated }
            addIngredient = { this.props.onIngredientAdded }
            removeIngredient = { this.props.onIngredientRemoved }
            disabled = { disabledInfo }
            price = { this.props.prc }
            ordered = { this.purchaseHandler }
            purchaseable = { this.updatePurchaseState( this.props.ings ) }
          />
        </Aux>
      )

      orderSummary = <OrderSummary 
        ingredients = { this.props.ings }
        purchaseCancelled = { this.purchaseCancelledHandler }
        purchaseContinue = { this.purchaseContinueHandler }
        price = { this.props.prc } />
    }
    
    return (
      <Aux>
        <Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelledHandler } >
          { orderSummary }
        </Modal>
        { burger }
      </Aux>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    ings: state.burgerBuilder.ingredients,
    prc: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    onIngredientAdded: ( ingName ) => dispatch( actionCreators.addIngredient( ingName ) ),
    onIngredientRemoved: ( ingName ) => dispatch( actionCreators.removeIngredient( ingName ) ),
    onInitIngredients: () => dispatch( actionCreators.initIngredients() ),
    onSetRedir: (path) => dispatch( actionCreators.setAuthRedir(path) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( BurgerBuilder, axios ))