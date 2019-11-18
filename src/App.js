import React, { useState, useEffect } from 'react'
import './App.css'
import Toggable from './components/Togglable'
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
      .then(blogList =>
        setBlogs(blogList.sort((b1, b2) => b2.likes - b1.likes))
      )
  }

  const handleSavedBlog = (savedBlog) => {
    const newBlogList = blogs
      .concat(savedBlog)
      .sort((b1, b2) => b2.likes - b1.likes)
    setBlogs(newBlogList)
    sendNotification({ message: 'Blog created', type: 'info' })
  }

  const handleUpdatedBlog = (updatedBlog) => {
    const index = blogs
      .findIndex(b => b.id.toString() === updatedBlog.id.toString())
    const newBlogList = blogs
      .slice(0, index)
      .concat(updatedBlog)
      .concat(blogs.slice(index+1, blogs.length))
      .sort((b1, b2) => b2.likes - b1.likes)
    setBlogs(newBlogList)
    sendNotification({ message: 'Blog updated', type: 'info' })
  }

  const handleDeletedBlog = blogId => {
    const index = blogs.findIndex(b => b.id.toString() === blogId.toString())
    const newBlogList = blogs
      .slice(0, index)
      .concat(blogs.slice(index+1, blogs.length))
    setBlogs(newBlogList)
    sendNotification({ message: 'Blog deleted', type: 'info' })
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
      <Toggable buttonLabel='Login'>
        <Login user={user} handleUserLoggedIn={handleUserLoggedIn}
          handleUserLoggedOut={handleUserLoggedOut}
          handleError={handleError} />
      </Toggable>
      <Toggable buttonLabel='New blog'>
        <BlogForm user={user} handleSavedBlog={handleSavedBlog}
          handleError={handleError} />
      </Toggable>
      <h1>Blogs</h1>
      {blogs.map(b =>
        <Blog key={b.id} user={user} blog={b}
          handleUpdatedBlog={handleUpdatedBlog}
          handleDeletedBlog={handleDeletedBlog}
          handleError={handleError} />
      )}
    </div>
  )
}

export default App
