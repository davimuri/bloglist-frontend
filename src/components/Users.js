import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { initializeUsersAction } from '../reducers/userReducer'

const Users = (props) => {
  const loadUsers = props.initializeUsersAction
  useEffect(() => { loadUsers() }, [loadUsers])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsersAction
}

const ConnectedUsers = connect(
  mapStateToProps, mapDispatchToProps
)(Users)

export default ConnectedUsers
