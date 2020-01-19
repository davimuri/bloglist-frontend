import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'ADD_BLOG':
    return state
      .concat(action.blog)
      .sort((b1, b2) => b2.likes - b1.likes)
  case 'LIKE_BLOG': {
    const index = state
      .findIndex(b => b.id.toString() === action.blog.id.toString())
    const likedBlog = {
      ...state[index],
      likes: action.blog.likes
    }
    const newBlogList = state
      .slice(0, index)
      .concat(likedBlog)
      .concat(state.slice(index+1, state.length))
      .sort((b1, b2) => b2.likes - b1.likes)
    return newBlogList
  }
  case 'DELETE_BLOG': {
    const index = state.findIndex(b => b.id.toString() === action.blogId.toString())
    return [
      ...state.slice(0, index),
      ...state.slice(index+1, state.length)
    ]
  }
  case 'ADD_COMMENT': {
    const comment = action.comment
    const index = state
      .findIndex(b => b.id.toString() === comment.blog.toString())
    const blog = {
      ...state[index],
      comments: state[index].comments.concat(comment)
    }
    return [
      ...state.slice(0, index),
      blog,
      ...state.slice(index+1, state.length)
    ]
  }
  default:
    return state
  }
}

export const initializeBlogsAction = () => {
  return async dispatch => {
    // TODO what happens if there is an error calling the service?
    const blogs = await blogService.getAll()
    blogs.sort((b1, b2) => b2.likes - b1.likes)
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export const createBlogAction = blog => {
  return async dispatch => {
    const savedBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      blog: savedBlog
    })
  }
}

export const likeBlogAction = blogId => {
  return async dispatch => {
    const savedBlog = await blogService.like(blogId)
    dispatch({
      type: 'LIKE_BLOG',
      blog: savedBlog
    })
  }
}

export const deleteBlogAction = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE_BLOG',
      blogId
    })
  }
}

export const createBlogCommentAction = (blogId, text) => {
  return async dispatch => {
    const comment = await blogService.createComment(blogId, text)
    dispatch({
      type: 'ADD_COMMENT',
      comment
    })
  }
}

export default blogReducer