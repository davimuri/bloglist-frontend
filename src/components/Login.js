import React from 'react'
import { connect } from 'react-redux'

import  { useField } from '../hooks'
import { loginAction, logoutAction } from '../reducers/loginReducer'
import { notifyAction } from '../reducers/notificationReducer'

const Login = (props) => {
  const usernameField = useField('text', 'Username')
  const passwordField = useField('password', 'Password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.loginAction(usernameField.props.value, passwordField.props.value)
      usernameField.clean()
      passwordField.clean()
      props.notifyAction({ message: 'Hello!', type: 'info' }, 10)
    } catch (exception) {
      props.notifyAction({ message: 'Wrong username or password', type: 'error' }, 10)
    }
  }

  const handleLogout = () => {
    props.logoutAction()
  }

  if (props.user === null) {
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
          {props.user.name} logged in
          <button onClick={() => handleLogout()}>Logout</button>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  loginAction,
  logoutAction,
  notifyAction
}

const ConnectedLogin = connect(
  mapStateToProps, mapDispatchToProps
)(Login)

export default ConnectedLogin
