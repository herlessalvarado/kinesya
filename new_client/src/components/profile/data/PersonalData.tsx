import React, { useState, ChangeEvent } from "react"
import Grid from "@material-ui/core/Grid"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import {
    TextField,
    Button,
} from "@material-ui/core"
import { UserStateProps } from "../../../models/user"
import {
    textLengthValidatorResult,
    textAreaLengthValidatorResult,
} from "../../../commons/field_validators"
import { MAX_STEPS_PROFILE, DATE_FORMAT } from "../../../commons/constants"
import { format, subYears } from "date-fns"
import {useStyles} from "./styles"


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
        </React.Fragment>
    )
}
export default Personal
