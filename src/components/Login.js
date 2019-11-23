import React from 'react'
import  { useField } from '../hooks'
import loginService from '../services/login'

const Login = ({ user, handleUserLoggedIn, handleUserLoggedOut, handleError }) => {
  const usernameField = useField('text', 'Username')
  const passwordField = useField('password', 'Password')

  const LOCAL_STORAGE_LOGGED_USER = 'BlogListAppLoggedUser'

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({
        username: usernameField.props.value,
        password: passwordField.props.value
      })
      window.localStorage.setItem(LOCAL_STORAGE_LOGGED_USER, JSON.stringify(loggedInUser))
      usernameField.clean()
      passwordField.clean()
      handleUserLoggedIn(loggedInUser)
    } catch (exception) {
      handleError({ message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOCAL_STORAGE_LOGGED_USER)
    handleUserLoggedOut()
  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...usernameField.props} />
          </div>
          <div>
            password
            <input {...passwordField.props} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          {user.name} logged in
          <button onClick={() => handleLogout()}>Logout</button>
        </p>
      </div>
    )
  }
}

export default Login