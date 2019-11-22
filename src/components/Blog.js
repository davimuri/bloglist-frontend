import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ user, blog, handleUpdatedBlog, handleDeletedBlog,
  handleError }) => {

  const [expand, setExpand] = useState(false)

  const handleLikeButton = async (blogId) => {
    try {
      const savedBlog = await blogService.like(blogId)
      setExpand(true)
      handleUpdatedBlog(savedBlog)
    } catch (exception) {
      handleError({ message: exception.response.data.error, type: 'error' })
    }
  }

  const handleDeleteButton = async (blogId) => {
    if (window.confirm(`Do you want to delete blog "${blog.title}" ?`)) {
      try {
        await blogService.remove(blogId)
        handleDeletedBlog(blogId)
      } catch (exception) {
        handleError({ message: exception.response.data.error, type: 'error' })
      }
    }
  }

  const displayDeleteButton = () => {
    if (user && blog.user && user.username === blog.user.username) {
      return (
        <button onClick={() => handleDeleteButton(blog.id)}>Delete</button>
      )
    }
  }

  if (expand) {
    return (
      <div className='blog'>
        <div onClick={() => setExpand(!expand)} data-testid='expandedDiv' >
          {blog.title} {blog.author} <br />
          {blog.url} <br />
          Likes: {blog.likes}
          <button onClick={() => handleLikeButton(blog.id)} data-testid='likeButton' >
            Like
          </button><br />
          Added by {blog.user ? blog.user.name : 'anonymous'}<br />
          {displayDeleteButton()}
        </div>
      </div>
    )
  } else {
    return (
      <div className='blog'>
        <div onClick={() => setExpand(!expand)} data-testid='collapsedDiv' >
          {blog.title} {blog.author}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object.isRequired,
  handleUpdatedBlog: PropTypes.func.isRequired,
  handleDeletedBlog: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
}

export default Blog