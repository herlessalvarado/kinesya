import React, { useState, useEffect, ChangeEvent } from 'react'
import ToastError from '../../../components/toast/Toast'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import {Link} from  "react-router-dom"
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Footer from '../../../components/footer/Footer'
import Header from '../../../components/header/Header'
import { signUp } from '../../../network/userService'
import { useHistory } from 'react-router-dom'
import { getJWT } from '../../../cache/cookies/cookieManager'
import { AxiosError } from 'axios'
import { useStyles } from './styles'
import { useTranslation } from 'react-i18next';

export default function Register() {
    const classes = useStyles()
    const history = useHistory()
    const { t } = useTranslation('common');
    const [openToast, setOpenToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [username, SetUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handCloseToast = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setOpenToast(false)
    }
    const handleUsername = (event: ChangeEvent<HTMLInputElement>) => {
        SetUsername(event.target.value)
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

    const SignUp = (username: string, email: string, password: string) => {
        signUp(username, email, password)
            .then(() => {
                history.push("/login")
            })
            .catch((err: AxiosError) => {
                const { property } = JSON.parse(err.response?.data?.message)

                setToastMessage(` ${t('register.title')} ${property}`)
                setOpenToast(true)
            })
    }

    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
          <Header />
          <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        { t('register.title') }
                    </Typography>
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label={ t('register.username') }
                                        name="username"
                                        autoComplete="username"
                                        onChange={handleUsername}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label={ t('register.email') }
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label={ t('register.password') }
                                        type="password"
                                        id="password"
                                        onChange={handlePassword}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                                onClick={() => SignUp(username, email, password)}
                            >
                                { t('register.signup') }
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to="/login" className={classes.loginUrl} >
                                        { t('register.haveAccount') }
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                </div>
                <Box mt={5}>
                    <Footer />
                </Box>
                </Container>
            </Container>
            <ToastError
                key="alert"
                open={openToast}
                handleClose={handCloseToast}
                message={toastMessage}
            ></ToastError>
        </React.Fragment>
    )
}
