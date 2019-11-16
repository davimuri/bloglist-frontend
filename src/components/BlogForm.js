import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ user, handleSavedBlog, handleError }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
          title,
          author,
          url
        }
        try {
          const savedBlog = await blogService.create(newBlog)
          handleSavedBlog(savedBlog)
          setTitle('')
          setAuthor('')
          setUrl('')
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
                <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                Author
                <input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                URL
                <input type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)} />
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