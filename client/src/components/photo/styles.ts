import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
export const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
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
})
)
