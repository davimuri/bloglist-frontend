import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import  { useField } from '../hooks'
import { notifyAction } from '../reducers/notificationReducer'
import {
  initializeBlogsAction, likeBlogAction,
  deleteBlogAction, createBlogCommentAction
} from '../reducers/blogReducer'

const BlogComments = props => {
  const commentField = useField('text', 'Comment')

  if (props.blog === undefined) {
    props.initializeBlogsAction()
    return null
  }

  const handleLikeBlog = async () => {
    try {
      props.likeBlogAction(props.blog.id)
      props.notifyAction({ message: 'Your like was added', type: 'info' }, 10)
    } catch (exception) {
      props.notifyAction({ message: exception.response.data.error, type: 'error' }, 10)
    }
  }

  const handleDeleteBlog = async () => {
    if (window.confirm(`Do you want to delete blog "${props.blog.title}" ?`)) {
      try {
        props.deleteBlogAction(props.blog.id)
        props.notifyAction({ message: 'Blog deleted', type: 'info' }, 10)
        props.history.push('/')
      } catch (exception) {
        props.notifyAction({ message: exception.response.data.error, type: 'error' }, 10)
      }
    }
  }

  const displayDeleteButton = () => {
    if (props.user && props.blog.user && props.user.username === props.blog.user.username) {
      return (
        <button onClick={() => handleDeleteBlog()}>Delete</button>
      )
    }
  }

  const handleCreateComment = async (event) => {
    event.preventDefault()
    const text = commentField.props.value
    try {
      props.createBlogCommentAction(props.blog.id, text)
      commentField.clean()
      props.notifyAction({ message: 'Comment created', type: 'info' }, 10)
    } catch (exception) {
      props.notifyAction({ message: exception.response.data.error, type: 'error' }, 10)
    }
  }

  return (
    <div>
      <h1>{props.blog.title}</h1>
      <a href={props.blog.url} target='_blank' rel='noreferrer noopener'>{props.blog.url}</a><br />
      {props.blog.likes} likes
      <button onClick={() => handleLikeBlog()} >
        Like
      </button><br />
      Added by {props.blog.user ? props.blog.user.name : 'anonymous'}<br />
      {displayDeleteButton()}
      <h3>Comments</h3>
      <ul>
        {props.blog.comments.map(comment =>
          <li key={comment.id}>{comment.text}</li>
        )}
      </ul>
      <form onSubmit={handleCreateComment}>
        <input {...commentField.props} />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

const BlogCommentsWithRouter = withRouter(BlogComments)

const mapStateToProps = (state, ownProps) => {
  const blog = state.blogs.find(blog => ownProps.blogId === blog.id.toString())
  if (blog) {
    return {
      user: state.user,
      blog
    }
  }
  return {
    blogId: ownProps.blogId
  }
}

const mapDispatchToProps = {
  initializeBlogsAction,
  likeBlogAction,
  deleteBlogAction,
  createBlogCommentAction,
  notifyAction
}

const ConnectedBlogComments = connect(
  mapStateToProps, mapDispatchToProps
)(BlogCommentsWithRouter)

export default ConnectedBlogComments
