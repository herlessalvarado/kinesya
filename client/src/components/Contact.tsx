import React, { useState, ChangeEvent, useRef, useEffect } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import { MIN_PRICE, DISTRICTS, SERVICES, MAX_STEPS_PROFILE } from "../utils/constants"
import {
    createMuiTheme,
    ThemeProvider,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    Chip,
    makeStyles,
    createStyles,
    Theme,
    Button,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { Validator } from "./Validator"
import {
    servicesValidatorResult,
    decimalValidatorResult,
    textLengthValidatorResult,
    priceValidatorResult,
    phoneValidatorResult,
} from "../helpers/field_validators"
import { UserStateProps } from "../models/user"
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

export default function Contact(props: UserStateProps) {
    const classes = useStyles()

    const [price, setPrice] = useState(props.user.price)
    const [phone, setPhone] = useState(props.user.phone)
    const [location, setLocation] = useState(props.user.location)
    const [tags, setTags] = useState(props.user.tags)
    const [valid, setValid] = useState(false)

    const refTags = useRef<HTMLElement>()
    const refPrice = useRef<HTMLElement>()
    const refPhone = useRef<HTMLElement>()
    const refLocation = useRef<HTMLElement>()

    const checkInvalidityPrice = (): boolean => {
        return isInvalid(refPrice)
    }
    const checkInvalidityTags = (): boolean => {
        return isInvalid(refTags)
    }
    const checkInvalidityLocation = (): boolean => {
        return isInvalid(refLocation)
    }
    const checkInvalidityPhone = (): boolean => {
        return isInvalid(refPhone)
    }

    const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value)
    }

    const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
    }

    const handleLocation = (value: string) => {
        setLocation(value)
    }

    const handleTags = (newValue: Array<string>) => {
        setTags(newValue)
    }

    function areAllInValid() {
        return isValid(refPrice) && isValid(refPhone) && isValid(refLocation) && isValid(refTags)
    }

    useEffect(() => {
        if (areAllInValid()) setValid(true)
    })

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" gutterBottom>
                    Contacto y Servicios
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Validator validator={priceValidatorResult.validator} ref={refPrice}>
                            <TextField
                                error={checkInvalidityPrice()}
                                value={price}
                                fullWidth
                                onChange={handlePrice}
                                label="Price"
                                placeholder="Price"
                                helperText={
                                    checkInvalidityPrice() ? priceValidatorResult.message : ""
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">S/.</InputAdornment>
                                    ),
                                }}
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Validator validator={phoneValidatorResult.validator} ref={refPhone}>
                            <TextField
                                error={checkInvalidityPhone()}
                                value={phone}
                                fullWidth
                                onChange={handlePhone}
                                label="Phone"
                                placeholder="Phone"
                                helperText={
                                    checkInvalidityPhone() ? phoneValidatorResult.message : ""
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">+51</InputAdornment>
                                    ),
                                }}
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Validator
                            ref={refLocation}
                            multiple
                            validator={textLengthValidatorResult.validator}
                        >
                            <Autocomplete
                                id="zodiac"
                                selectOnFocus
                                value={location}
                                onChange={(event: any) => {
                                    handleLocation(event.target.textContent)
                                }}
                                options={DISTRICTS}
                                getOptionLabel={(options) => options}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Distrito"
                                        placeholder="Distrito"
                                        error={checkInvalidityLocation()}
                                        helperText={
                                            checkInvalidityLocation()
                                                ? textLengthValidatorResult.message
                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Validator>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Validator
                            multiple
                            ref={refTags}
                            validator={servicesValidatorResult.validator}
                        >
                            <Autocomplete
                                limitTags={3}
                                multiple
                                id="tags-services"
                                value={tags}
                                onChange={(event, value) => {
                                    handleTags(value)
                                }}
                                renderTags={(value: string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip
                                            variant="outlined"
                                            color="primary"
                                            label={option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                options={SERVICES}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Servicios"
                                        placeholder="Servicios"
                                        error={checkInvalidityTags()}
                                        helperText={
                                            checkInvalidityTags()
                                                ? servicesValidatorResult.message
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
                                    { ...props.user, tags, location, price, phone },
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
                                { ...props.user, tags, location, price, phone },
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
