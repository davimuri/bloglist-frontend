import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOAD_LOGGED_USER':
    return action.user
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

const LOCAL_STORAGE_LOGGED_USER = 'BlogListAppLoggedUser'

export const loadLoggedUserFromLocalStorageAction = () => {
  const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_LOGGED_USER)
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    return {
      type: 'LOAD_LOGGED_USER',
      user
    }
  }
  return {
    type: 'LOGOUT'
  }
}

export const loginAction = (username, password) => {
  return async dispatch => {
    const loggedInUser = await loginService.login({
      username,
      password
    })
    window.localStorage.setItem(LOCAL_STORAGE_LOGGED_USER, JSON.stringify(loggedInUser))
    blogService.setToken(loggedInUser.token)
    dispatch({
      type: 'LOGIN',
      user: loggedInUser
    })
  }
}

export const logoutAction = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_LOGGED_USER)
  blogService.setToken(null)
  return {
    type: 'LOGOUT'
  }
}

export default loginReducer