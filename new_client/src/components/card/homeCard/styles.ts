import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
    container: {
        display: "flex",
        position: "relative",
        overflow: "hidden",
    },
    img: {
        "&:hover": {
            "&+div": {
                bottom: "0px",
            },
        },
    },
    info: {
        width: "100%",
        position: "absolute",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        overflow: "hidden",
        bottom: "0px",
        transition: "bottom .5s ease-out",
    },
    description: {
        flex: "1 0 auto",
        display: "flex",
        flexDirection: "column",
        marginLeft: "16px",
        color: "#fff",
    },
    title: {
        fontSize: "2vw",
    },
    subtitle: {
        fontSize: "1vw",
    },
    icon: {
        fontSize: "4vw ",
    },
})
)