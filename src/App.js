import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import './App.css'
import Toggable from './components/Togglable'
import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import { loadLoggedUserFromLocalStorageAction } from './reducers/loginReducer'
import { initializeBlogsAction } from './reducers/blogReducer'

const App = (props) => {
  const loadLoggedUser = props.loadLoggedUserFromLocalStorageAction
  useEffect(() => { loadLoggedUser() }, [loadLoggedUser])

  const loadBlogs = props.initializeBlogsAction
  useEffect(() => { loadBlogs() }, [loadBlogs])

  return (
    <div>
      <Notification />
      <Toggable buttonLabel='Login'>
        <Login />
      </Toggable>
      <Toggable buttonLabel='New blog'>
        <BlogForm />
      </Toggable>
      <Blogs />
    </div>
  )
}

const mapDispatchToProps = {
  loadLoggedUserFromLocalStorageAction,
  initializeBlogsAction
}

const ConnectedApp = connect(
  null, mapDispatchToProps
)(App)

export default ConnectedApp
