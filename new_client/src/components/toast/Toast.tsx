import React, { FC, useRef, useEffect } from 'react'
import { useStyles, StyledAlert } from './styles'

interface ToastProps {
    message?: string
    open: boolean
    handleClose: () => void
}

const ToastError: FC<ToastProps> = function CustomizedSnackbars(props: ToastProps) {
    const classes = useStyles()
    const ref = useRef(null)
    useEffect(() => {
        if (ref.current !== null) {
            setTimeout(props.handleClose, 6000)
        }
    })

    return (
        <div className={classes.root}>
            {props.open && (
                <StyledAlert ref={ref} onClose={props.handleClose} severity="error">
                    {props.message}
                </StyledAlert>
            )}
        </div>
    )
}
export const ToastSuccessful: FC<ToastProps> = function CustomizedSnackbars(props: ToastProps) {
    const classes = useStyles()
    const ref = useRef(null)
    useEffect(() => {
        if (ref.current !== null) {
            setTimeout(props.handleClose, 6000)
        }
    })
    return (
        <div className={classes.root}>
            {props.open && (
                <StyledAlert ref={ref} onClose={props.handleClose} severity="success">
                    {props.message}
                </StyledAlert>
            )}
        </div>
    )
}
export default ToastError
