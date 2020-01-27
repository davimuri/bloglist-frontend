import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'
import NavigationBar from './components/NavigationBar'
import Toggable from './components/Togglable'
import Login from './components/Login'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import BlogComments from './components/BlogComments'
import Users from './components/Users'
import User from './components/User'
import { loadLoggedUserFromLocalStorageAction } from './reducers/loginReducer'
import { initializeBlogsAction } from './reducers/blogReducer'

const App = (props) => {
  const loadLoggedUser = props.loadLoggedUserFromLocalStorageAction
  useEffect(() => { loadLoggedUser() }, [loadLoggedUser])

  const loadBlogs = props.initializeBlogsAction
  useEffect(() => { loadBlogs() }, [loadBlogs])

  return (
    <div>
      <Router>
        <NavigationBar />
        <Route exact path="/" render={() =>
          <>
            <Toggable buttonLabel='New blog'>
              <BlogForm />
            </Toggable>
            <Blogs />
          </>
        }/>
        <Route exact path="/blogs/:id" render={({ match }) =>
          <BlogComments blogId={match.params.id} />}
        />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User userId={match.params.id} />}
        />
        <Route path="/login" render={() => <Login />} />
      </Router>
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
