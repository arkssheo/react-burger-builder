import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1,
  bacon: 1.2
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients)
  }



  removeIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type]

    if (oldCount <= 0 ) return

    const updatedCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount
    const priceReduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceReduction
    this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
    this.updatePurchaseState(updatedIngredients)
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map( igKey => {
      return ingredients[igKey]
    }).reduce( ( sum, el) => {
      return sum + el
    }, 0)

    this.setState( { purchaseable: sum > 0 } )
  }

  purchaseHandler = () => {
    this.setState( { purchasing: true } )
  }

  purchaseCancelledHandler = () => {
    this.setState( { purchasing: false } )
  }

  purchaseContinueHandler = () => {
    alert('You continued!!')
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // { salad: true }
    return (
      <Aux>
        <Modal show = { this.state.purchasing } modalClosed = { this.purchaseCancelledHandler } >
          <OrderSummary 
            ingredients = { this.state.ingredients }
            purchaseCancelled = { this.purchaseCancelledHandler }
            purchaseContinue = { this.purchaseContinueHandler }
            price = { this.state.totalPrice } />
        </Modal>
        <Burger ingredients = { this.state.ingredients } />
        <BuildControls
          addIngredient = { this.addIngredientHandler }
          removeIngredient = { this.removeIngredientHandler }
          disabled = { disabledInfo }
          price = { this.state.totalPrice }
          ordered = { this.purchaseHandler }
          purchaseable = { this.state.purchaseable }
        />
      </Aux>
    )
  }
}

export default BurgerBuilder