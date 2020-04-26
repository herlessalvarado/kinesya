import React, { FC, useRef, useEffect } from "react"
import Alert from "@material-ui/lab/Alert"
import { makeStyles, Theme } from "@material-ui/core/styles"
import styled, { keyframes } from "styled-components"

interface ToastProps {
    message?: string
    open: boolean
    handleClose: () => void
}
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}))

const animation = keyframes`
    from {
        transform: scale(0)
    }
    to {
        transform : scale(1) 
    } 
`

const StyledAlert = styled(Alert)`
    animation: ${animation} 0.2s linear;
    position: fixed;
    top: 24px;
    left: auto;
    right: 24px;
` as typeof Alert

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
