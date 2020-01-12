import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ user, blog, handleLikeBlog, handleDeleteBlog,
  handleNotify }) => {

  const [expand, setExpand] = useState(false)

  const handleLikeButton = async () => {
    try {
      handleLikeBlog()
      setExpand(true)
      handleNotify({ message: 'Blog updated', type: 'info' }, 10)
    } catch (exception) {
      handleNotify({ message: exception.response.data.error, type: 'error' }, 10)
    }
  }

  const handleDeleteButton = async () => {
    if (window.confirm(`Do you want to delete blog "${blog.title}" ?`)) {
      try {
        handleDeleteBlog()
        handleNotify({ message: 'Blog deleted', type: 'info' }, 10)
      } catch (exception) {
        handleNotify({ message: exception.response.data.error, type: 'error' }, 10)
      }
    }
  }

  const displayDeleteButton = () => {
    if (user && blog.user && user.username === blog.user.username) {
      return (
        <button onClick={() => handleDeleteButton()}>Delete</button>
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
          <button onClick={() => handleLikeButton()} data-testid='likeButton' >
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
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleNotify: PropTypes.func.isRequired
}

export default Blog
