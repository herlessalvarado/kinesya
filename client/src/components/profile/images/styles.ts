import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
export const useStyles = makeStyles((theme: Theme) =>
createStyles({
    label: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        "& span": {
            marginLeft: "1vw",
            color: "#BF953F",
        },
        backgroundColor: "white",
        color: "#BF953F",
        display: "flex",
        "&:hover": {
            cursor: "pointer",
        },
        justifyContent: "center",
        "& input": {
            width: "0.1px",
            height: "0.1px",
            opacity: "0",
            overflow: "hidden",
            position: "absolute",
            zIndex: "-1",
        },
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    root:{
        overflow: "scroll"
    }
})
)