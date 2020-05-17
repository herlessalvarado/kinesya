import React, { useEffect, useState } from "react"
import {
    createStyles,
    makeStyles,
    Theme,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Header from "../components/Header"
import PersonalData from "../components/PersonalData"
import Physics from "../components/Physics"
import Contact from "../components/Contact"
import Photos from "../components/Photos"
import Copyright from "../components/Copyright"

import { useHistory } from "react-router-dom"
import { UserViewModel, NullUser } from "../models/user"
import { MAX_STEPS_PROFILE } from "../utils/constants"
import { mapViewModelToUserRequest, mapUserDTOToViewModel } from "../helpers/user_mapper"
import { updateUser, getUserByToken } from "../network/UserService"
import { AxiosError } from "axios"
import { ToastSuccessful } from "../components/Toast"
import { UserDTO } from "../dto/user"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            width: "auto",
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: "auto",
                marginRight: "auto",
            },
        },
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
        },
        stepper: {
            padding: theme.spacing(3, 0, 5),
        },
        buttons: {
            display: "flex",
            justifyContent: "flex-end",
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
    })
)

const steps = ["Datos personales", "Físico", "Contacto y servicios", "Fotos"]

export default function Checkout() {
    const classes = useStyles()
    const [activeStep, setActiveStep] = React.useState(-1)
    const history = useHistory()
    const [openToast, setOpenToast] = useState(false)
    const [user, setUser] = useState<UserViewModel>(NullUser)
    const [toastMessage, setToastMessage] = useState("")

    function stepContentFactory() {
        switch (activeStep) {
            case 0:
                return (
                    <PersonalData
                        stepId={activeStep}
                        user={user!}
                        onClick={(value: UserViewModel, step: number) => {
                            setActiveStep(step)
                            setUser(value)
                        }}
                    />
                )
            case 1:
                return (
                    <Physics
                        user={user!}
                        stepId={activeStep}
                        onClick={(value: UserViewModel, step: number) => {
                            setActiveStep(step)
                            setUser(value)
                        }}
                    />
                )
            case 2:
                return (
                    <Contact
                        user={user!}
                        stepId={activeStep}
                        onClick={(value: UserViewModel, step: number) => {
                            setActiveStep(step)
                            setUser(value)
                        }}
                    />
                )
            case 3:
                return (
                    <Photos
                        user={user!}
                        stepId={activeStep}
                        onClick={(value: UserViewModel, step: number) => {
                            setUser(value)
                            setActiveStep(step)
                        }}
                    />
                )
        }
    }
    useEffect(() => {
        let valid = true
        if (valid) {
            getUserByToken()
                .then((res) => {
                    const userViewModel = mapUserDTOToViewModel(res as UserDTO)
                    setUser(userViewModel)
                    setActiveStep(0)
                })
                .catch(() => {
                    history.push("/login")
                })
        }
        return () => {
            valid = false
        }
    }, [])

    useEffect(() => {
        let subscribe = true
        if (subscribe) {
            if (activeStep > MAX_STEPS_PROFILE) {
                const userRequest = mapViewModelToUserRequest(user)
                updateUser(userRequest)
                    .then((message) => {
                        setToastMessage(message)
                        setOpenToast(true)
                    })
                    .catch((err: AxiosError) => {
                        history.push("/login")
                    })
            }
        }

        return () => {
            subscribe = false
        }
    }, [user])

    return (
        <React.Fragment>
            <CssBaseline />
            <Header title="Kinesya"></Header>
            <ThemeProvider theme={theme}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Completar Perfil
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <ToastSuccessful
                            key="alert"
                            open={openToast}
                            handleClose={() => {
                                setOpenToast(false)
                            }}
                            message={toastMessage}
                        ></ToastSuccessful>
                        <React.Fragment>
                            {activeStep > MAX_STEPS_PROFILE ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Gracias por completar tu perfil.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Tu perfil pasará por un proceso de veracidad de la
                                        información y fotos; una vez comprobado, se te enviará un
                                        correo con la confirmación y todos podran ver tu perfil.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>{stepContentFactory()}</React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
            </ThemeProvider>
        </React.Fragment>
    )
}
