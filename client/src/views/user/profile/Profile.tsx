import React, { useEffect, useState } from "react"
import Paper from "@material-ui/core/Paper"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Typography from "@material-ui/core/Typography"
import PersonalData from "../../../components/profile/data/PersonalData"
import Physics from "../../../components/profile/physics/Physics"
import Contact from "../../../components/profile/contact/Contact"
import Photos from "../../../components/profile/images/Photos"
import { UserViewModel,} from "../../../models/user"
import { MAX_STEPS_PROFILE } from "../../../commons/constants"
import { mapViewModelToUserRequest } from "../../../commons/user_mapper"
import { updateUser } from "../../../network/UserService"
import { AxiosError } from "axios"
import Toast from "../../../components/toast/Toast"
import {useStyles} from "./styles"
import { StepContent, Hidden } from "@material-ui/core"
import { getUser } from "../../../cache/cookies/cookieManager"
import { useTranslation } from 'react-i18next'
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Logo } from '../../../assets/logo/kinesya.svg';

interface ProfileProps {
    callback: (parentPath:string) => void
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledLogo = styled(Logo)`
animation: ${rotate} infinite 2s linear;
`

export default function Profile(props: ProfileProps) {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const [activeStep, setActiveStep] = React.useState(0)
    const [openToast, setOpenToast] = useState(false)
    const [user, setUser] = useState<UserViewModel>(getUser())
    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState("")

    const steps = [t('dashboard.profile.stepper.personalData'), t('dashboard.profile.stepper.physics'), t('dashboard.profile.stepper.contact'), t('dashboard.profile.stepper.photos')]

    function LoadingScreen() {
        return(
            <div className={classes.loading}>
                <StyledLogo />
            </div>
        )
    }

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
                    {
                        loading ? 
                        <div>
                            <Typography variant="h5" gutterBottom>
                                {t('dashboard.profile.finish.thanks')}
                            </Typography>
                            <LoadingScreen />
                        </div> 
                        : 
                        <div>
                            <Typography variant="h5" gutterBottom>
                                {t('dashboard.profile.finish.thanks')}
                            </Typography>
                            <Typography variant="subtitle1">
                                {t('dashboard.profile.finish.message')}
                            </Typography>
                        </div>
                    }
                </React.Fragment>
                )
        }
    }
    

    useEffect(() => {
        let subscribe = true
        if (subscribe) {
            if (activeStep > MAX_STEPS_PROFILE) {
                setLoading(true)
                const userRequest = mapViewModelToUserRequest(user)
                updateUser(userRequest)
                    .then((message) => {
                        setLoading(false)
                        setOpenToast(true)
                        setToastMessage(message)
                    })
                    .catch((err: AxiosError) => {
                        props.callback("/login");
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
                            {t('dashboard.profile.stepper.profile')}
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
