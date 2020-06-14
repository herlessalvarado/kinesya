import { makeStyles, Theme } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import styled, { keyframes } from 'styled-components'

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: "100%",
        "& > * + *": {
            marginTop: theme.spacing(6),
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

export const StyledAlert = styled(Alert)`
    animation: ${animation} 0.2s linear;
    position: fixed;
    top: 24px;
    left: auto;
    right: 24px;
` as typeof Alert