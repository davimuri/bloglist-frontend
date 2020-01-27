import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

const Notification = ({ notification }) => {
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  if (!notification) {
    return null
  }
  const position = {
    vertical: 'top',
    horizontal: 'right',
  }
  return (
    <Snackbar message={notification.message}
      autoHideDuration={6000} open={open} onClose={handleClose}
      anchorOrigin={position} className={notification.type} />
  )
}

export default Notification
