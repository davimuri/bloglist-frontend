import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}

export const initializeUsersAction = () => {
  return async dispatch => {
    const users = await userService.getAll()
    users.sort((u1, u2) => u2.blogs.length - u1.blogs.length)
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default userReducer
