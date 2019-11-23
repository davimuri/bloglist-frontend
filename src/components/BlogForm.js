import React from 'react'
import  { useField } from '../hooks'
import blogService from '../services/blogs'

const BlogForm = ({ user, handleSavedBlog, handleError }) => {
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
      const savedBlog = await blogService.create(newBlog)
      handleSavedBlog(savedBlog)
      titileField.clean()
      authorField.clean()
      urlField.clean()
    } catch (exception) {
      handleError({ message: exception.response.data.error, type: 'error' })
    }
  }

  if (user) {
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

export default BlogForm