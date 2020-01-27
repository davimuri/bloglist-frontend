import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import  { useField } from '../hooks'
import Notification from './Notification'
import AlertDialog from './AlertDialog'
import {
  initializeBlogsAction, likeBlogAction,
  deleteBlogAction, createBlogCommentAction
} from '../reducers/blogReducer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
}))

const BlogComments = props => {
  const [openDialog, setOpenDialog] = useState(false)
  const commentField = useField('text', 'Comment')
  const classes = useStyles()

  if (props.blog === undefined) {
    props.initializeBlogsAction()
    return null
  }

  const handleDeleteBlog = async () => {
    setOpenDialog(true)
  }

  const handleConfirmDeleteBlog = (blogId) => {
    setOpenDialog(false)
    props.deleteBlogAction(blogId)
  }

  const displayDeleteButton = () => {
    if (props.user && props.blog.user && props.user.username === props.blog.user.username) {
      return (
        <IconButton onClick={() => handleDeleteBlog()}>
          <DeleteIcon />
        </IconButton>
      )
    }
  }

  const handleCreateComment = async (event) => {
    event.preventDefault()
    const text = commentField.props.value
    props.createBlogCommentAction(props.blog.id, text)
    commentField.clean()
  }

  const displayNotification = () => {
    if (props.error) {
      const notification = { message: props.error, type: 'error' }
      return <Notification notification={notification} />
    }
    if (props.success) {
      const notification = { message: props.success, type: 'info' }
      return <Notification notification={notification} />
    }
    return null
  }

  return (
    <div>
      {displayNotification()}
      <h1>{props.blog.title}</h1>
      Author: {props.blog.author}<br />
      Website: <a href={props.blog.url} target='_blank' rel='noreferrer noopener'>{props.blog.url}</a><br />
      Added by {props.blog.user ? props.blog.user.name : 'anonymous'}<br />
      {props.blog.likes}
      <IconButton onClick={() => props.likeBlogAction(props.blog.id)} aria-label="like">
        <FavoriteIcon />
      </IconButton>
      {displayDeleteButton()}
      <h3>Comments</h3>
      <ul>
        {props.blog.comments.map(comment =>
          <li key={comment.id}>{comment.text}</li>
        )}
      </ul>
      <form onSubmit={handleCreateComment} className={classes.root}>
        <TextField label="Comment" {...commentField.props} variant="filled" className={classes.textField} />
        <Button variant="contained" color="primary" type="submit">Add</Button>
      </form>
      <AlertDialog message='Do you want to delete blog?'
        open={openDialog}
        data={props.blog.id}
        handleClose={() => setOpenDialog(false)}
        handleYes={handleConfirmDeleteBlog} />
    </div>
  )
}

const BlogCommentsWithRouter = withRouter(BlogComments)

const mapStateToProps = (state, ownProps) => {
  const blog = state.blogs.data.find(blog => ownProps.blogId === blog.id.toString())
  if (blog) {
    return {
      user: state.user.data,
      blog,
      success: state.blogs.success,
      error: state.blogs.error
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
  createBlogCommentAction
}

const ConnectedBlogComments = connect(
  mapStateToProps, mapDispatchToProps
)(BlogCommentsWithRouter)

export default ConnectedBlogComments
