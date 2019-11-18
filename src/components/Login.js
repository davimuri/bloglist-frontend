import React, { useState } from 'react'
import loginService from '../services/login'

const Login = ({ user, handleUserLoggedIn, handleUserLoggedOut, handleError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const LOCAL_STORAGE_LOGGED_USER = 'BlogListAppLoggedUser'

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username, password })
      window.localStorage.setItem(LOCAL_STORAGE_LOGGED_USER, JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
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
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
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