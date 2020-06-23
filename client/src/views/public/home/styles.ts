import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'space-between',
            overflowX: 'auto',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        paper: {
            marginTop: "10%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        appBar: {
            position: 'relative',
          },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    })
)
