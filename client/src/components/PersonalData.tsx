import React, { useState, ChangeEvent } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"

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
} from "../helpers/field_validators"
import { MAX_STEPS_PROFILE, DATE_FORMAT } from "../utils/constants"
import { format, subYears } from "date-fns"

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
    const [birthday, setBirthday] = useState(props.user.birthday)
    const [name, setName] = useState(props.user.name)
    const [description, setDescription] = useState(props.user.description)
    const [validName, setValidName] = useState(textLengthValidatorResult.validator(props.user.name))
    const [validDescription, setValidDescription] = useState(
        textAreaLengthValidatorResult.validator(props.user.description)
    )

    function areAllValid() {
        return name !== "" && validName && description !== "" && validDescription
    }

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        setValidName(textLengthValidatorResult.validator(event.target.value))
    }

    const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
        setValidDescription(textAreaLengthValidatorResult.validator(event.target.value))
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
                        <TextField
                            id="name"
                            label="Nombre"
                            fullWidth
                            value={name}
                            onChange={handleName}
                            error={!validName}
                            helperText={!validName ? textLengthValidatorResult.message : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                                !validDescription ? textAreaLengthValidatorResult.message : ""
                            }
                            error={!validDescription}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                maxDate={subYears(new Date(), 18)}
                                openTo="year"
                                views={["year", "month", "date"]}
                                label="Fecha de Nacimiento"
                                value={birthday}
                                placeholder="Fecha de Nacimiento"
                                onChange={(date) => {
                                    if (date !== null) handleBirthday(format(date, DATE_FORMAT))
                                }}
                                format="MM/dd/yyyy"
                            />
                        </MuiPickersUtilsProvider>
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
                        disabled={!areAllValid()}
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
