import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'

import { logoutAction } from '../reducers/loginReducer'

const LoginButton = (props) => {
  console.log(props.user)
  const handleLogout = () => {
    props.logoutAction()
  }

  if (props.user) {
    return (
      <>
        {props.user.name} logged in
        <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
      </>
    )
  } else {
    return (
      <Button color="inherit" href="/login">Login</Button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  }
}

const mapDispatchToProps = {
  logoutAction
}

const ConnectedLoginButton = connect(
  mapStateToProps, mapDispatchToProps
)(LoginButton)

export default ConnectedLoginButton
