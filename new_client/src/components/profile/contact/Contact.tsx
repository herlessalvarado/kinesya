import React, { useState, ChangeEvent } from "react"
import { Grid } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import { DISTRICTS, SERVICES, MAX_STEPS_PROFILE } from "../../../commons/constants"
import {
    InputAdornment,
    Chip,
    Button,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { priceValidatorResult, phoneValidatorResult } from "../../../commons/field_validators"
import { UserStateProps } from "../../../models/user"
import {useStyles} from "./styles"




export default function Contact(props: UserStateProps) {
    const classes = useStyles()

    const [price, setPrice] = useState(props.user.price)
    const [phone, setPhone] = useState(props.user.phone)
    const [location, setLocation] = useState(props.user.location)
    const [tags, setTags] = useState(props.user.tags)

    const [validPrice, setValidPrice] = useState(priceValidatorResult.validator(props.user.price))
    const [validPhone, setValidPhone] = useState(phoneValidatorResult.validator(props.user.phone))

    const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value)
        setValidPrice(priceValidatorResult.validator(event.target.value))
    }

    const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value)
        setValidPhone(phoneValidatorResult.validator(event.target.value))
    }

    const handleLocation = (value: string) => {
        setLocation(value)
    }

    const handleTags = (newValue: Array<string>) => {
        setTags(newValue)
    }

    function areAllValid() {
        return (
            location !== "" &&
            tags.length > 0 &&
            phone !== "" &&
            validPhone &&
            price !== "" &&
            validPrice
        )
    }

    return (
        <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!validPrice}
                            value={price}
                            fullWidth
                            onChange={handlePrice}
                            label="Price"
                            placeholder="Precio"
                            helperText={!validPrice ? priceValidatorResult.message : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">S/.</InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!validPhone}
                            value={phone}
                            fullWidth
                            onChange={handlePhone}
                            label="Phone"
                            placeholder="Telefono"
                            helperText={!validPhone ? phoneValidatorResult.message : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">+51</InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
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
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
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
                                <TextField {...params} label="Servicios" placeholder="Servicios" />
                            )}
                        />
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
                        disabled={!areAllValid()}
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
        </React.Fragment>
    )
}
