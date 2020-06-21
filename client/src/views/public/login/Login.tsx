import React, { useState, useEffect, ChangeEvent } from 'react'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Footer from '../../../components/footer/Footer'
import { useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { getJWT } from '../../../cache/cookies/cookieManager'
import { AxiosError } from 'axios'
import Toast from '../../../components/toast/Toast'
import {Link} from  "react-router-dom"
// import Logo from '../../../assets/logo.png'
import { logInUser } from '../../../network/userService'
import { ReactComponent as Logo } from '../../../assets/logo/kinesya.svg'
import { useTranslation } from 'react-i18next'

export default function Login() {
    const classes = useStyles()
    const history = useHistory()
    const { t } = useTranslation('common');
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
                setToastMessage(err.response?.data)
                setOpenToast(true)
            })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline>
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            {/* <img className={classes.logo} src={Logo} alt="Logo" /> */}
                            <Link to="/">
                                <Logo />
                            </Link>
                            <form className={classes.form} autoComplete="off">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label={ t('login.email') }
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
                                    label={ t('login.password') }
                                    name="password"
                                    onChange={handlePassword}
                                />
                            </form>
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
                                color="primary"
                                onClick={() => {
                                    LogIn(email, password)
                                }}
                            >
                                { t('login.enter') }
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link to="/register"   className={classes.registerUrl} >
                                    <span >{ t('login.dontHaveAccount') }</span>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Footer></Footer>
                        </div>
                    </Grid>
            </CssBaseline>
        </Grid>
    )
}
