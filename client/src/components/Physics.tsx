import React, { useState, ChangeEvent, useRef, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { Zodiac, Orientations, Ethnicities, MAX_STEPS_PROFILE } from "../utils/constants"
import { textLengthValidatorResult, decimalValidatorResult } from "../helpers/field_validators"

import {
    createMuiTheme,
    ThemeProvider,
    FormControlLabel,
    Checkbox,
    InputAdornment,
    Button,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { UserStateProps } from "../models/user"
import { Validator } from "./Validator"
import { isInvalid, isValid } from "../helpers/html_validators"

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

export default function Physics(props: UserStateProps) {
    const classes = useStyles()
    const [hair, setHair] = useState(props.user.hair)
    const [orientation, setOrientation] = useState(props.user.orientation)
    const [height, setHeight] = useState(props.user.height)
    const [weight, setWeight] = useState(props.user.weight)
    const [eyes, setEyes] = useState(props.user.eyes)
    const [birthPlace, setBirthPlace] = useState(props.user.birthPlace)
    const [measurements, setMeasurements] = useState(props.user.measurements)
    const [zodiac, setZodiac] = useState(props.user.zodiac)
    const [ethnicity, setEthnicity] = useState(props.user.ethnicity)
    const [boobs, setBoobs] = useState(props.user.fakeBoobs)
    const [valid, setValid] = useState(false)
    const refHair = useRef<HTMLElement>()
    const refOrientation = useRef<HTMLElement>()
    const refHeight = useRef<HTMLElement>()
    const refWeight = useRef<HTMLElement>()
    const refEyes = useRef<HTMLElement>()
    const refBirthPlace = useRef<HTMLElement>()
    const refMeasurements = useRef<HTMLElement>()
    const refZodiac = useRef<HTMLElement>()
    const refEthnicity = useRef<HTMLElement>()

    const checkInvalidityOrientation = (): boolean => {
        return isInvalid(refOrientation)
    }
    const checkInvalidityHair = (): boolean => {
        return isInvalid(refHair)
    }

    const checkInvalidityHeight = (): boolean => {
        return isInvalid(refHeight)
    }

    const checkInvalidityWeight = (): boolean => {
        return isInvalid(refWeight)
    }
    const checkInvalidityEyes = (): boolean => {
        return isInvalid(refEyes)
    }

    const checkInvalidityBirthPlace = (): boolean => {
        return isInvalid(refBirthPlace)
    }

    const checkInvalidityMeasurements = (): boolean => {
        return isInvalid(refMeasurements)
    }

    const checkInvalidityZodiac = (): boolean => {
        return isInvalid(refZodiac)
    }
    const checkInvalidityEthnicity = (): boolean => {
        return isInvalid(refEthnicity)
    }

    const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value)
    }
    const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value)
    }

    const handleEyes = (event: ChangeEvent<HTMLInputElement>) => {
        setEyes(event.target.value)
    }
    const handleHair = (event: ChangeEvent<HTMLInputElement>) => {
        setHair(event.target.value)
    }
    const handleFakeBoobs = (value: boolean) => {
        setBoobs(value)
    }

    const handleBirthPlace = (event: ChangeEvent<HTMLInputElement>) => {
        setBirthPlace(event.target.value)
    }
    const handleZodiac = (value: string) => {
        setZodiac(value)
    }
    const handleMeasurements = (event: ChangeEvent<HTMLInputElement>) => {
        setMeasurements(event.target.value)
    }
    const handleOrientation = (value: string) => {
        setOrientation(value)
    }
    const handleEthnicity = (value: string) => {
        setEthnicity(value)
    }

    function areAllInValid() {
        return (
            isValid(refHair) &&
            isValid(refOrientation) &&
            isValid(refHeight) &&
            isValid(refEyes) &&
            isValid(refWeight) &&
            isValid(refBirthPlace) &&
            isValid(refMeasurements) &&
            isValid(refZodiac) &&
            isValid(refEthnicity)
        )
    }

    useEffect(() => {
        if (areAllInValid()) setValid(true)
    })

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>
                    Caraterísticas Físicas
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Validator validator={decimalValidatorResult.validator} ref={refWeight}>
                            <TextField
                                error={checkInvalidityWeight()}
                                value={weight}
                                fullWidth
                                onChange={handleWeight}
                                label="Peso"
                                placeholder="Peso"
                                helperText={
                                    checkInvalidityWeight() ? decimalValidatorResult.message : ""
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">Kg</InputAdornment>
                                    ),
                                }}
                            />
                        </Validator>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Validator validator={decimalValidatorResult.validator} ref={refHeight}>
                            <TextField
                                error={checkInvalidityHeight()}
                                value={height}
                                onChange={handleHeight}
                                fullWidth
                                label="Altura"
                                placeholder="Altura"
                                helperText={
                                    checkInvalidityHeight() ? decimalValidatorResult.message : ""
                                }
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">m</InputAdornment>,
                                }}
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator ref={refHair} validator={textLengthValidatorResult.validator}>
                            <TextField
                                value={hair}
                                onChange={handleHair}
                                fullWidth
                                label="Cabello"
                                placeholder="Cabello"
                                error={checkInvalidityHair()}
                                helperText={
                                    checkInvalidityHair() ? decimalValidatorResult.message : ""
                                }
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator ref={refEyes} validator={textLengthValidatorResult.validator}>
                            <TextField
                                value={eyes}
                                onChange={handleEyes}
                                fullWidth
                                label="Ojos"
                                placeholder="Ojos"
                                error={checkInvalidityEyes()}
                                helperText={
                                    checkInvalidityEyes() ? textLengthValidatorResult.message : ""
                                }
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={boobs}
                                    onChange={(event, checked) => {
                                        handleFakeBoobs(checked)
                                    }}
                                    name="checkedFakeBoobs"
                                />
                            }
                            label="Tetas Falsas"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator
                            ref={refBirthPlace}
                            validator={textLengthValidatorResult.validator}
                        >
                            <TextField
                                value={birthPlace}
                                onChange={handleBirthPlace}
                                fullWidth
                                label="Lugar de Nacimiento"
                                placeholder="Lugar de Nacimiento"
                                error={checkInvalidityBirthPlace()}
                                helperText={
                                    checkInvalidityBirthPlace()
                                        ? textLengthValidatorResult.message
                                        : ""
                                }
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator
                            ref={refZodiac}
                            multiple
                            validator={textLengthValidatorResult.validator}
                        >
                            <Autocomplete
                                id="zodiac"
                                selectOnFocus
                                value={zodiac}
                                onChange={(event: any) => {
                                    handleZodiac(event.target.textContent)
                                }}
                                options={Zodiac}
                                getOptionLabel={(options) => options}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Zodiaco"
                                        placeholder="Zodiaco"
                                        error={checkInvalidityZodiac()}
                                        helperText={
                                            checkInvalidityZodiac()
                                                ? textLengthValidatorResult.message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator
                            ref={refMeasurements}
                            validator={textLengthValidatorResult.validator}
                        >
                            <TextField
                                id="measurements"
                                fullWidth
                                value={measurements}
                                onChange={handleMeasurements}
                                label="Medidas"
                                placeholder="Medidas"
                                error={checkInvalidityMeasurements()}
                                helperText={
                                    checkInvalidityMeasurements()
                                        ? textLengthValidatorResult.message
                                        : ""
                                }
                            />
                        </Validator>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Validator
                            ref={refOrientation}
                            multiple
                            validator={textLengthValidatorResult.validator}
                        >
                            <Autocomplete
                                id="orientation"
                                selectOnFocus
                                value={orientation}
                                onChange={(event: any) => {
                                    handleOrientation(event.target.textContent)
                                }}
                                options={Orientations}
                                getOptionLabel={(options) => options}
                                renderInput={(params) => (
                                    <TextField
                                        required
                                        {...params}
                                        variant="standard"
                                        label="Orientacion Sexual"
                                        placeholder="Orientacion"
                                        error={checkInvalidityOrientation()}
                                        helperText={
                                            checkInvalidityOrientation()
                                                ? textLengthValidatorResult.message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator
                            ref={refEthnicity}
                            multiple
                            validator={textLengthValidatorResult.validator}
                        >
                            <Autocomplete
                                id="etnia"
                                selectOnFocus
                                value={ethnicity}
                                onChange={(event: any) => {
                                    handleEthnicity(event.target.textContent)
                                }}
                                options={Ethnicities}
                                getOptionLabel={(options) => options}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Etnia"
                                        placeholder="Etnia"
                                        error={checkInvalidityEthnicity()}
                                        helperText={
                                            checkInvalidityEthnicity()
                                                ? textLengthValidatorResult.message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Validator>
                    </Grid>
                </Grid>

                <div className={classes.buttons}>
                    {props.stepId > 0 && (
                        <Button
                            onClick={() => {
                                props.onClick(
                                    {
                                        ...props.user,
                                        hair,
                                        orientation,
                                        height,
                                        weight,
                                        eyes,
                                        birthPlace,
                                        measurements,
                                        zodiac,
                                        ethnicity,
                                        fakeBoobs: boobs,
                                    },
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
                                {
                                    ...props.user,
                                    hair,
                                    orientation,
                                    height,
                                    weight,
                                    eyes,
                                    birthPlace,
                                    measurements,
                                    zodiac,
                                    ethnicity,
                                    fakeBoobs: boobs,
                                },
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
