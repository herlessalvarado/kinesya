import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            padding: theme.spacing(6, 0),
        },
    })
)

export default function Copyright() {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="/">
                    Kinesya
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </footer>
    )
}
