import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
export const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        width: "100%",
        height: "100%",

        alignItems: "center",
        "& span": {
            marginLeft: "1vw",
        },
        backgroundColor: "white",
        padding:"4px 8px",
        border:"none",
        borderRadius:"4px",
        transition:`background-color ${theme.transitions.duration.standard}ms`,
        color: theme.palette.primary.main,
        display: "flex",
        "&:hover": {
            backgroundColor:theme.palette.action.hover,

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
})
)
