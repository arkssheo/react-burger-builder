import axios from 'axios'

const instance = axios.create( {
  baseURL: 'https://jsm-burger-proj.firebaseio.com'
})

export default instance