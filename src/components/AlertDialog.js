import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'

const AlertDialog = (props) => {

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
            No
        </Button>
        <Button onClick={() => props.handleYes(props.data)} color="primary" autoFocus>
            Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
