import React from 'react'
import { connect } from 'react-redux'

import  { useField } from '../hooks'
import { createBlogAction } from '../reducers/blogReducer'
import { notifyAction } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const titileField = useField('text', 'Title')
  const authorField = useField('text', 'Author')
  const urlField = useField('text', 'URL')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: titileField.props.value,
      author: authorField.props.value,
      url: urlField.props.value
    }
    try {
      props.createBlogAction(newBlog)
      titileField.clean()
      authorField.clean()
      urlField.clean()
      props.notifyAction({ message: 'Blog created', type: 'info' }, 10)
    } catch (exception) {
      props.notifyAction({ message: exception.response.data.error, type: 'error' }, 10)
    }
  }

  if (props.user) {
    return (
      <div>
        <h2>New Blog</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            Title
            <input {...titileField.props} />
          </div>
          <div>
            Author
            <input {...authorField.props} />
          </div>
          <div>
            URL
            <input {...urlField.props} />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createBlogAction,
  notifyAction
}

const ConnectedBlogForm = connect(
  mapStateToProps, mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm
