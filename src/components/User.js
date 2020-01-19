import React from 'react'
import { connect } from 'react-redux'

import { initializeUsersAction } from '../reducers/userReducer'

const User = (props) => {
  if (props.user === undefined) {
    props.initializeUsersAction()
    return null
  }
  return (
    <div>
      <h1>{props.user.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {props.user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const user = state.users.find(user => ownProps.userId === user.id.toString())
  if (user) {
    return {
      user
    }
  }
  return {
    userId: ownProps.userId
  }
}

const mapDispatchToProps = {
  initializeUsersAction
}

const ConnectedUser = connect(
  mapStateToProps, mapDispatchToProps
)(User)

export default ConnectedUser
