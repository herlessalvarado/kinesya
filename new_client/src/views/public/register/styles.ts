import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            // background: "linear-gradient(90deg,#e8d3af,#cda777)!important",
            // background: "linear-gradient(90deg, rgba(184,107,119,1) 0%, rgba(207,152,159,1) 35%, rgba(224,188,191,1) 100%)"
        },
        loginUrl:{
            textDecoration: "none",
            color:theme.palette.primary.main
        }
    })
)