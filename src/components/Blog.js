import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Typography from '@material-ui/core/Typography'

const Blog = ({ user, blog, handleLikeBlog, handleDeleteBlog }) => {

  const handleLikeButton = async () => {
    handleLikeBlog()
  }

  const displayDeleteButton = () => {
    if (user && blog.user && user.username === blog.user.username) {
      return (
        <IconButton onClick={() => handleDeleteBlog()}>
          <DeleteIcon />
        </IconButton>
      )
    }
  }

  return (
    <Card variant="outlined">
      <CardHeader title={blog.title} subheader={blog.author}/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <a href={blog.url} target='_blank' rel='noreferrer noopener'>Website</a><br />
            Added by {blog.user ? blog.user.name : 'anonymous'}
        </Typography>
      </CardContent>
      <CardActions>
        {blog.likes}
        <IconButton onClick={() => handleLikeButton()} aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Link to={`/blogs/${blog.id}`}>
          <VisibilityIcon />
        </Link>
        {displayDeleteButton()}
      </CardActions>
    </Card>
  )
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired
}

export default Blog
