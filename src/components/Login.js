import React from 'react'
import { connect } from 'react-redux'

import Notification from './Notification'
import  { useField } from '../hooks'
import { loginAction, logoutAction } from '../reducers/loginReducer'

const Login = (props) => {
  const usernameField = useField('text', 'Username')
  const passwordField = useField('password', 'Password')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.loginAction(usernameField.props.value, passwordField.props.value)
    usernameField.clean()
    passwordField.clean()
  }

  const handleLogout = () => {
    props.logoutAction()
  }

  const displayNotification = () => {
    if (props.error) {
      const notification = { message: 'Wrong username or password', type: 'error' }
      return <Notification notification={notification} />
    }
    return null
  }

  if (props.user) {
    return (
      <div>
        {displayNotification()}
        <p>
          {props.user.name} logged in
          <button onClick={() => handleLogout()}>Logout</button>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        {displayNotification()}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...usernameField.props} data-test-id='username'/>
          </div>
          <div>
            password
            <input {...passwordField.props} data-test-id='password'/>
          </div>
          <button type="submit" data-test-id='login'>login</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user.data,
    error: state.user.error
  }
}

const mapDispatchToProps = {
  loginAction,
  logoutAction
}

const ConnectedLogin = connect(
  mapStateToProps, mapDispatchToProps
)(Login)

export default ConnectedLogin
