import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import LogginButton from './LoginButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const NavigationBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="/" className={classes.menuButton}>Blogs</Button>
          <Button color="inherit" href="/users" className={classes.menuButton}>Users</Button>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          <LogginButton />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavigationBar
