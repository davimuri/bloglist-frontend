import React, { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const LOCAL_STORAGE_LOGGED_USER = 'BlogListAppLoggedUser'

const App = () => {
  // user logged in
  const [user, setUser] = useState(null)
  // blog list
  const [blogs, setBlogs] = useState([])
  // notification messages
  const [notification, setNotification] = useState({ message: null , type: null })

  useEffect(() => loadLoggedUserFromLocalStorage(), [])

  useEffect(() => getBlogs(), [])

  const loadLoggedUserFromLocalStorage = () => {
    const loggedUserJSON = window.localStorage.getItem(LOCAL_STORAGE_LOGGED_USER)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  const handleUserLoggedIn = (loggedInUser) => {
    blogService.setToken(loggedInUser.token)
    setUser(loggedInUser)
    sendNotification({ message: `Hello ${loggedInUser.name}`, type: 'info' })
  }

  const handleUserLoggedOut = () => {
    setUser(null)
    blogService.setToken(null)
  }

  const getBlogs = () => {
    blogService
      .getAll()
      .then(blogList => setBlogs(blogList))
  }

  const handleSavedBlog = (savedBlog) => {
    setBlogs(blogs.concat(savedBlog))
    sendNotification({ message: 'Blog created', type: 'info' })
  }

  const handleError = (error) => {
    sendNotification(error)
  }

  const sendNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification({ message: null , type: null })
    }, 5000)
  }

  return (
    <div>
      <Notification data={notification} />
      <Login user={user} handleUserLoggedIn={handleUserLoggedIn}
        handleUserLoggedOut={handleUserLoggedOut}
        handleError={handleError} />
      <BlogForm user={user} handleSavedBlog={handleSavedBlog} 
        handleError={handleError} />
      <h1>Blogs</h1>
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </div>
  )
}

export default App
