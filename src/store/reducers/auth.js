import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../util'

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedir: '/'
}

const authSuccess = ( state, action ) => {
  return updateObject(state, { 
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  })
}

const authFailed = ( state, action ) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null
  })
}

const setAuthRedir = (state, action) => {
  return updateObject(state, {authRedir: action.path})
}

const reducer = ( state = initialState, action ) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return updateObject(state, { error: null, loading: true } )
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
    case actionTypes.AUTH_FAILED: return authFailed(state, action)
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
    case actionTypes.SET_AUTH_REDIRECT: return setAuthRedir(state, action)
    default:
      return state
  }
}

export default reducer