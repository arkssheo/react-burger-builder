import React, { Component } from 'react'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {

  state = {
    orderForm: {
      name: { 
        elementType: 'input', 
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: { 
        elementType: 'input', 
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: { 
        elementType: 'input', 
        elementConfig: {
          type: 'text',
          placeholder: 'Your City'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: { 
        elementType: 'input', 
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: { 
        elementType: 'input', 
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 9
        },
        valid: false,
        touched: false
      }, 
      email: { 
        elementType: 'input', 
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: { 
        elementType: 'select', 
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = ( event ) => {
    event.preventDefault()

    const formData = {}
    for ( let formElKey in this.state.orderForm ) {
      formData[formElKey] = this.state.orderForm[formElKey].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }

    this.props.onOrderBurger( order )
  }

  inputChangedHandler = ( event, inputIdentifier ) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormEl = { 
      ...updatedOrderForm[inputIdentifier]
    }

    updatedFormEl.value = event.target.value
    updatedFormEl.valid = this.checkValidity( updatedFormEl.value, updatedFormEl.validation )
    updatedFormEl.touched = true
    updatedOrderForm[inputIdentifier] = updatedFormEl

    let formIsValid = true
    for ( let inputId in updatedOrderForm ) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid
    }
    // console.log('formstate: ', updatedOrderForm)

    this.setState( { orderForm: updatedOrderForm, formIsValid: formIsValid } )
    console.log(updatedFormEl)
  }

  checkValidity = ( value, rules ) => {
    let isValid = true

    if ( rules.required ) {
      isValid = (value.trim() !== '') && isValid
      console.log('required: ', isValid)
    }

    if ( rules.minLength ) {
      isValid = (value.trim().length >= rules.minLength) && isValid
      console.log('min: ', isValid)
    }

    if ( rules.maxLength ) {
      isValid = (value.trim().length <= rules.maxLength) && isValid
      console.log('max: ', isValid)
    }

    return isValid
  }

  render () {

    const formElementsArray = []
    for ( let key in this.state.orderForm ) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit = { this.orderHandler }>
        {
          formElementsArray.map( el => (
            <Input
              key = { el.id }
              invalid = { !el.config.valid }
              touched = { el.config.touched }
              validationErrorMessage = "invalid input!"
              shouldValidate = { el.config.validation }
              elementType = { el.config.elementType }
              elementConfig = { el.config.elementConfig }
              value = { el.config.value }
              changed = { ( event ) => this.inputChangedHandler( event, el.id ) } />
          ))
        }
        <Button btnType = "Success" disabled = { !this.state.formIsValid }>ORDER</Button>
      </form>
    )
    if ( this.props.loading ) {
      form = <Spinner />
    }
    return (
      <div className = { classes.ContactData }>
        <h4>Enter your contact data</h4>
        { form }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: ( orderData ) => dispatch( actions.purchaseBurger( orderData ) )
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ContactData, axios ) )