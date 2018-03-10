import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'

class Auth extends Component {
  state = {
    controls: {
      email: { 
        elementType: 'input', 
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: { 
        elementType: 'input', 
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }

  inputChangedHandler = ( event, controlName ) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    }

    // let formIsValid = true
    // for ( let inputId in updatedControls ) {
    //   formIsValid = updatedControls[inputId].valid && formIsValid
    // }

    this.setState( { controls: updatedControls } )
  }

  componentDidMount () {
    if (!this.props.building && this.props.authRedir !== '/') {
      this.props.onSetAuthRedir()
    }
  }

  checkValidity = ( value, rules ) => {
    let isValid = true

    if ( rules.required ) {
      isValid = (value.trim() !== '') && isValid
      // console.log('required: ', isValid)
    }

    if ( rules.minLength ) {
      isValid = (value.trim().length >= rules.minLength) && isValid
      // console.log('min: ', isValid)
    }

    if ( rules.maxLength ) {
      isValid = (value.trim().length <= rules.maxLength) && isValid
      // console.log('max: ', isValid)
    }

    if ( rules.isEmail ) {
      // eslint-disable-next-line
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      isValid = pattern.test(value) && isValid
    }

    if ( rules.isNumeric ) {
      const pattern = /^\d+$/
      isValid = pattern.test(value) && isValid
    }

    return isValid
  }

  submitHandler = ( event ) => {
    event.preventDefault()
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
  }

  switchAuthModeHandler = ( event ) => {
    event.preventDefault()
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  render() {
    const formElementsArray = []
    for ( let key in this.state.controls ) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementsArray.map( el => (
      <Input
        key = { el.id }
        invalid = { !el.config.valid }
        touched = { el.config.touched }
        validationErrorMessage = "invalid input!"
        shouldValidate = { el.config.validation }
        elementType = { el.config.elementType }
        elementConfig = { el.config.elementConfig }
        value = { el.config.value }
        changed = { ( event ) => this.inputChangedHandler( event, el.id ) }
      />
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMsg = null

    if (this.props.error) {
      errorMsg = (
        <p>{ this.props.error.message }</p>
      )
    }

    let authRedirect = null
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to = {this.props.authRedir} />
    }

    return (
      <div className = { classes.Auth }>
        { authRedirect }
        <form onSubmit = { this.submitHandler }>
          { errorMsg }
          { form }
          <Button type="submit" btnType = "Success" >Submit</Button>
          <Button 
            clicked = { this.switchAuthModeHandler }
            btnType = "Danger" >Switch to { this.state.isSignUp ? 'Sign In' : 'Sign up'}
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    building: state.burgerBuilder.building,
    authRedir: state.auth.authRedir
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedir: () => dispatch(actions.setAuthRedir('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)