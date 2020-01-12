import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import { likeBlogAction, deleteBlogAction } from '../reducers/blogReducer'
import { notifyAction } from '../reducers/notificationReducer'

const Blogs = (props) => {
  return (
    <div>
      <h1>Blogs</h1>
      {props.visibleBlogs.map(b =>
        <Blog key={b.id} user={props.user} blog={b}
          handleLikeBlog={() => props.likeBlogAction(b.id)}
          handleDeleteBlog={() => props.deleteBlogAction(b.id)}
          handleNotify={props.notifyAction} />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    visibleBlogs: state.blogs
  }
}

const mapDispatchToProps = {
  likeBlogAction,
  deleteBlogAction,
  notifyAction
}

const ConnectedBlogs = connect(
  mapStateToProps, mapDispatchToProps
)(Blogs)

export default ConnectedBlogs
