import blogService from '../services/blogs'

const initialState = { data: [] }

const addBlog = (state, action) => {
  const blogs = state.data
    .concat(action.blog)
    .sort((b1, b2) => b2.likes - b1.likes)
  return {
    data: blogs,
    success: 'Blog created'
  }
}

const likeBlog = (state, action) => {
  const blogs = state.data
  const index = blogs
    .findIndex(b => b.id.toString() === action.blog.id.toString())
  const likedBlog = {
    ...blogs[index],
    likes: action.blog.likes
  }
  const newBlogList = blogs
    .slice(0, index)
    .concat(likedBlog)
    .concat(blogs.slice(index+1, blogs.length))
    .sort((b1, b2) => b2.likes - b1.likes)
  return {
    data: newBlogList,
    success: 'You liked a blog!'
  }
}

const deleteBlog = (state, action) => {
  const blogs = state.data
  const index = blogs.findIndex(b => b.id.toString() === action.blogId.toString())
  const newBlogList = [
    ...blogs.slice(0, index),
    ...blogs.slice(index+1, blogs.length)
  ]
  return {
    data: newBlogList,
    success: 'Blog deleted'
  }
}

const addComment = (state, action) => {
  const comment = action.comment
  const blogs = state.data
  const index = blogs
    .findIndex(b => b.id.toString() === comment.blog.toString())
  const blog = {
    ...blogs[index],
    comments: blogs[index].comments.concat(comment)
  }
  const newBlogList = [
    ...blogs.slice(0, index),
    blog,
    ...blogs.slice(index+1, blogs.length)
  ]
  return {
    data: newBlogList,
    success: 'Comment created'
  }
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'BLOG/INIT_BLOGS':
    return { data: action.blogs }
  case 'BLOG/ERROR':
    return { data: state.data , error: action.error }
  case 'BLOG/ADD_BLOG':
    return addBlog(state, action)
  case 'BLOG/LIKE_BLOG':
    return likeBlog(state, action)
  case 'BLOG/DELETE_BLOG':
    return deleteBlog(state, action)
  case 'BLOG/ADD_COMMENT':
    return addComment(state, action)
  default:
    return state
  }
}

export const initializeBlogsAction = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      blogs.sort((b1, b2) => b2.likes - b1.likes)
      dispatch({
        type: 'BLOG/INIT_BLOGS',
        blogs
      })
    } catch (exc) {
      dispatch({
        type: 'BLOG/ERROR',
        error: 'Error trying to load the blogs'
      })
    }
  }
}

export const createBlogAction = blog => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.create(blog)
      dispatch({
        type: 'BLOG/ADD_BLOG',
        blog: savedBlog
      })
    } catch (exc) {
      //console.log(exc.response)
      dispatch({
        type: 'BLOG/ERROR',
        error: exc.response.data.error
      })
    }
  }
}

export const likeBlogAction = blogId => {
  return async dispatch => {
    try {
      const savedBlog = await blogService.like(blogId)
      dispatch({
        type: 'BLOG/LIKE_BLOG',
        blog: savedBlog
      })
    } catch (exc) {
      dispatch({
        type: 'BLOG/ERROR',
        error: exc.response.data.error
      })
    }
  }
}

export const deleteBlogAction = blogId => {
  return async dispatch => {
    try {
      await blogService.remove(blogId)
      dispatch({
        type: 'BLOG/DELETE_BLOG',
        blogId
      })
    } catch (exc) {
      dispatch({
        type: 'BLOG/ERROR',
        error: exc.response.data.error
      })
    }
  }
}

export const createBlogCommentAction = (blogId, text) => {
  return async dispatch => {
    try {
      const comment = await blogService.createComment(blogId, text)
      dispatch({
        type: 'BLOG/ADD_COMMENT',
        comment
      })
    } catch (exc) {
      dispatch({
        type: 'BLOG/ERROR',
        error: exc.response.data.error
      })
    }
  }
}

export default blogReducer