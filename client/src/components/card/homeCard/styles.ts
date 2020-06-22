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
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        marginLeft: "16px",
        color: "#fff",
    },
    title: {
        fontSize: "16px",
        [theme.breakpoints.up("md")]:{
            fontSize: "18px"
        }
    },
    subtitle: {
        fontSize: "12px",
        [theme.breakpoints.up("md")]:{
            fontSize: "16px"
        }
    },
    icon: {
        color: "#25D366",
        fontSize:"28px",
        [theme.breakpoints.up("md")]:{
            fontSize: "32px"
        }      

    },
})
)