import React, { useEffect, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Typography from "@material-ui/core/Typography"

import PersonalData from "../../../components/profile/data/PersonalData"
import Physics from "../../../components/profile/physics/Physics"
import Contact from "../../../components/profile/contact/Contact"
import Photos from "../../../components/profile/images/Photos"
import { useHistory } from "react-router-dom"
import { UserViewModel, NullUser } from "../../../models/user"
import { MAX_STEPS_PROFILE } from "../../../commons/constants"
import { mapViewModelToUserRequest, mapUserDTOToViewModel } from "../../../commons/user_mapper"
import { updateUser, getUserByToken } from "../../../network/userService"
import { AxiosError } from "axios"
import Toast from "../../../components/toast/Toast"
import { UserDTO } from "../../../dto/user"
import {useStyles} from "./styles"
import { StepContent, Hidden } from "@material-ui/core"


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
            case 4:
                return (
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
                        setOpenToast(true)
                        setToastMessage(message)
                        
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
               <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Perfil
                        </Typography>
                        <Hidden smDown >
                            <Stepper activeStep={activeStep} className={classes.stepper}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <React.Fragment>{stepContentFactory()}</React.Fragment> 
                        </Hidden>
                        <Hidden mdUp>
                            <Stepper orientation="vertical"  activeStep={activeStep} className={classes.stepper}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                        <React.Fragment>{stepContentFactory()}</React.Fragment> 
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {
                               activeStep > MAX_STEPS_PROFILE && (
                                stepContentFactory()
                               )
                            }
                        </Hidden>
                       
                        
                    </Paper>
                </main>
                <Toast
                                key="alert"
                                open={openToast}
                                handleClose={()=>{
                                    setOpenToast(false)
                                }}
                                message={toastMessage}
                            ></Toast>
                          
        </React.Fragment>
    )
}
