import React, { useState } from 'react'
import { connect } from 'react-redux'
import GridList from '@material-ui/core/GridList'

import Blog from './Blog'
import Notification from './Notification'
import AlertDialog from './AlertDialog'
import { likeBlogAction, deleteBlogAction } from '../reducers/blogReducer'

const Blogs = (props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [blogIdToDelete, setBlogIdToDelete] = useState(0)

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

  const handleDeleteBlog = (blogId) => {
    setOpenDialog(true)
    setBlogIdToDelete(blogId)
  }

  const handleConfirmDeleteBlog = (blogId) => {
    setOpenDialog(false)
    props.deleteBlogAction(blogId)
  }

  return (
    <div>
      {displayNotification()}
      <h1>Blogs</h1>
      <GridList>
        {props.visibleBlogs.map(b =>
          <Blog key={b.id} user={props.user} blog={b}
            handleLikeBlog={() => props.likeBlogAction(b.id)}
            handleDeleteBlog={() => handleDeleteBlog(b.id)} />
        )}
      </GridList>
      <AlertDialog message='Do you want to delete blog?'
        open={openDialog}
        data={blogIdToDelete}
        handleClose={() => setOpenDialog(false)}
        handleYes={handleConfirmDeleteBlog} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    visibleBlogs: state.blogs.data,
    success: state.blogs.success,
    error: state.blogs.error
  }
}

const mapDispatchToProps = {
  likeBlogAction,
  deleteBlogAction
}

const ConnectedBlogs = connect(
  mapStateToProps, mapDispatchToProps
)(Blogs)

export default ConnectedBlogs
