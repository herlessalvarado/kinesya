import React, { useState, useEffect, ChangeEvent } from "react"
import LoginGirl from "../assets/loginGirl.jpg"
import {
    createStyles,
    makeStyles,
    Theme,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Copyrigth from "../components/Copyright"
import { useHistory } from "react-router-dom"
import { getJWT } from "../cache/CookieManager"
import { AxiosError } from "axios"
import Toast from "../components/Toast"
import { logInUser } from "../network/UserService"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100vh",
        },
        image: {
            backgroundImage: `url(${LoginGirl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor:
                theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        typography: {
            margin: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(3, 0, 2),
            background: "linear-gradient(90deg,#e8d3af,#cda777)!important",
        },
        form: {
            width: "100%",
            marginTop: theme.spacing(1),
        },
    })
)

export default function Login() {
    const classes = useStyles()
    const history = useHistory()
    const [openToast, setOpenToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handCloseToast = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setOpenToast(false)
    }
    const cleanFields = () => {
        setEmail("")
        setPassword("")
    }
    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        if (!!getJWT()) history.push("/dashboard")
    })

    const LogIn = (email: string, password: string) => {
        logInUser(email, password)
            .then(() => {
                cleanFields()
            })
            .catch((err: AxiosError) => {
                setToastMessage(err.response?.data?.message)
                setOpenToast(true)
            })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typography}>
                            Kinesya
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <form className={classes.form} autoComplete="off">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleEmail}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") LogIn(email, password)
                                    }}
                                    required
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="Contraseña"
                                    name="password"
                                    onChange={handlePassword}
                                />
                            </form>
                        </ThemeProvider>
                        <Toast
                            key="alert"
                            open={openToast}
                            handleClose={handCloseToast}
                            message={toastMessage}
                        ></Toast>
                        <Button
                            fullWidth
                            variant="contained"
                            className={classes.button}
                            onClick={() => {
                                LogIn(email, password)
                            }}
                        >
                            Iniciar sesión
                        </Button>
                        <Copyrigth></Copyrigth>
                    </div>
                </Grid>
            </CssBaseline>
        </Grid>
    )
}
