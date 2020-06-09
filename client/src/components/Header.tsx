import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { CssBaseline, AppBar } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import { Link, useHistory } from "react-router-dom"
import { getJWT, AuthOff } from "../cache/CookieManager"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"

import HomeIcon from "@material-ui/icons/Home"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            backgroundColor: "black",
        },
        middle: {
            flex: 1,
        },
        typography: {
            color: "white",
        },
        button: {
            margin: "0.8vw",
            cursor: "pointer",
            fontSize: "4vw",
            color: "#BF953F",
        },
    })
)

interface HeaderProps {
    title: string
}

export default function Header(props: HeaderProps) {
    const classes = useStyles()
    const history = useHistory()
    function logOut() {
        AuthOff()
    }
    function buttons() {
        if (!getJWT()) {
            return (
                <React.Fragment>
                    <Link
                        to="/login"
                        title="login"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <AccountCircleIcon className={classes.button} />
                    </Link>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Link
                        to="/dashboard"
                        title="Perfil"
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <HomeIcon className={classes.button} />
                    </Link>
                    <Link to="/" title="Cerrar Sesion">
                        <ExitToAppIcon className={classes.button} onClick={logOut} />
                    </Link>
                </React.Fragment>
            )
        }
    }
    return (
        <React.Fragment>
            <CssBaseline>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                            <Typography
                                component="h2"
                                variant="h5"
                                color="textSecondary"
                                align="center"
                                noWrap
                                className={classes.typography}
                            >
                                {props.title}
                            </Typography>
                        </Link>
                        <Typography className={classes.middle} />
                        {buttons()}
                    </Toolbar>
                </AppBar>
            </CssBaseline>
        </React.Fragment>
    )
}
