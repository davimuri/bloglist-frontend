import React from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import  { useField } from '../hooks'
import { createBlogAction } from '../reducers/blogReducer'
import Notification from './Notification'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))

const BlogForm = (props) => {
  const titileField = useField('text', 'Title')
  const authorField = useField('text', 'Author')
  const urlField = useField('text', 'URL')

  const classes = useStyles()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: titileField.props.value,
      author: authorField.props.value,
      url: urlField.props.value
    }
    props.createBlogAction(newBlog)
    titileField.clean()
    authorField.clean()
    urlField.clean()
  }

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

  if (props.user) {
    return (
      <div>
        {displayNotification()}
        <h2>New Blog</h2>
        <form onSubmit={handleCreateBlog} className={classes.root}>
          <TextField label="Title" {...titileField.props} variant="filled" className={classes.textField}/>
          <TextField label="Author" {...authorField.props} variant="filled" className={classes.textField} />
          <TextField label="URL" {...urlField.props} variant="filled" className={classes.textField} />
          <Button variant="contained" color="primary" type="submit">Add</Button>
        </form>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    success: state.blogs.success,
    error: state.blogs.error
  }
}

const mapDispatchToProps = {
  createBlogAction
}

const ConnectedBlogForm = connect(
  mapStateToProps, mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm
