import React, { useState, ChangeEvent, FC, useEffect, useRef } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { Validator } from "../components/Validator"
import moment from "moment"
import {
    createMuiTheme,
    ThemeProvider,
    TextField,
    Theme,
    makeStyles,
    createStyles,
    Button,
} from "@material-ui/core"
import { UserStateProps } from "../models/user"
import {
    textLengthValidatorResult,
    textAreaLengthValidatorResult,
    ageValidatorResult,
    dateValidatorResult,
} from "../helpers/field_validators"
import { isInvalid, isValid } from "../helpers/html_validators"
import { MAX_STEPS_PROFILE } from "../utils/constants"

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

const Personal = (props: UserStateProps) => {
    const classes = useStyles()
    const refName = useRef<HTMLDivElement>()
    const refBirthday = useRef<HTMLElement>()
    const refDescription = useRef<HTMLElement>()
    const [birthday, setBirthday] = useState(props.user.birthday)
    const [name, setName] = useState(props.user.name)
    const [description, setDescription] = useState(props.user.description)
    const [valid, setValid] = useState(false)

    const checkInvalidityName = (): boolean => {
        return isInvalid(refName)
    }

    const checkInvalidityDescription = (): boolean => {
        return isInvalid(refDescription)
    }

    const checkInvalidityBirthday = (): boolean => {
        return isInvalid(refBirthday)
    }

    function areAllInValid() {
        return isValid(refBirthday) && isValid(refDescription) && isValid(refName)
    }

    useEffect(() => {
        if (areAllInValid()) setValid(true)
    })

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleBirthday = (value: string) => {
        setBirthday(value)
    }

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>
                    Información Personal
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Validator ref={refName} validator={textLengthValidatorResult.validator}>
                            <TextField
                                id="name"
                                label="Nombre"
                                fullWidth
                                value={name}
                                onChange={handleName}
                                error={checkInvalidityName()}
                                helperText={
                                    checkInvalidityName() ? textLengthValidatorResult.message : ""
                                }
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12}>
                        <Validator
                            validator={textAreaLengthValidatorResult.validator}
                            ref={refDescription}
                        >
                            <TextField
                                id="description"
                                label="Descripción"
                                multiline
                                rows="4"
                                variant="outlined"
                                fullWidth
                                value={description}
                                onChange={handleDescription}
                                helperText={
                                    checkInvalidityDescription()
                                        ? textAreaLengthValidatorResult.message
                                        : ""
                                }
                                error={checkInvalidityDescription()}
                            />
                        </Validator>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Validator validator={dateValidatorResult.validator} ref={refBirthday}>
                            <TextField
                                type="date"
                                id="birthday"
                                value={birthday}
                                name="birthday"
                                onChange={(event) => {
                                    handleBirthday(event.target.value)
                                }}
                                helperText={
                                    checkInvalidityBirthday() ? dateValidatorResult.message : ""
                                }
                                error={checkInvalidityBirthday()}
                            />
                        </Validator>
                    </Grid>
                </Grid>
                <div className={classes.buttons}>
                    {props.stepId > 0 && (
                        <Button
                            onClick={() => {
                                props.onClick(
                                    { ...props.user, name, description, birthday },
                                    props.stepId - 1
                                )
                            }}
                            className={classes.button}
                        >
                            Atrás
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!valid}
                        onClick={() => {
                            props.onClick(
                                { ...props.user, name, description, birthday },
                                props.stepId + 1
                            )
                        }}
                    >
                        {props.stepId === MAX_STEPS_PROFILE ? "Confirmar" : "Siguiente"}
                    </Button>
                </div>
            </ThemeProvider>
        </React.Fragment>
    )
}
export default Personal
