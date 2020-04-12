import React,{ FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface ToastProps{
    message ?: string,
    open : boolean,
    handleClose: () =>void
}
const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  const ToastError:FC<ToastProps> = function CustomizedSnackbars(props: ToastProps) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
          <Snackbar open={props.open}  autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal:'right'}} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity="error">
              {props.message}
            </Alert>
          </Snackbar> 
      </div>
    );
  }
 export  const ToastSuccessful:FC<ToastProps> = function CustomizedSnackbars(props: ToastProps) {
    const classes = useStyles();
    return (
      <div className={classes.root}>
          <Snackbar open={props.open}  autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal:'right'}} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity="success">
              {props.message}
            </Alert>
          </Snackbar>
      </div>
    );
  }
  export default ToastError;