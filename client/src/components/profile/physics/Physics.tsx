import React, { useState, ChangeEvent } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import { Zodiac, Orientations, Ethnicities, MAX_STEPS_PROFILE } from "../../../commons/constants"
import { textLengthValidatorResult, decimalValidatorResult } from "../../../commons/field_validators"
import {
    FormControlLabel,
    Checkbox,
    InputAdornment,
    Button,
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { UserStateProps } from "../../../models/user"
import {useStyles} from "./styles"
import { useTranslation } from "react-i18next";

export default function Physics(props: UserStateProps) {
    const classes = useStyles()
    const { t } = useTranslation("common")
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

    const [validHair, setValidHair] = useState(textLengthValidatorResult.validator(props.user.hair))
    const [validHeight, setValidHeight] = useState(
        decimalValidatorResult.validator(props.user.height)
    )
    const [validWeight, setValidWeight] = useState(
        decimalValidatorResult.validator(props.user.weight)
    )
    const [validEyes, setValidEyes] = useState(textLengthValidatorResult.validator(props.user.eyes))
    const [validBirthPlace, setValidBirthPlace] = useState(
        textLengthValidatorResult.validator(props.user.birthPlace)
    )
    const [validMeasurements, setValidMeasurements] = useState(
        textLengthValidatorResult.validator(props.user.measurements)
    )

    const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value)
        setValidHeight(decimalValidatorResult.validator(event.target.value))
    }
    const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value)
        setValidWeight(decimalValidatorResult.validator(event.target.value))
    }

    const handleEyes = (event: ChangeEvent<HTMLInputElement>) => {
        setEyes(event.target.value)
        setValidEyes(textLengthValidatorResult.validator(event.target.value))
    }
    const handleHair = (event: ChangeEvent<HTMLInputElement>) => {
        setHair(event.target.value)
        setValidHair(textLengthValidatorResult.validator(event.target.value))
    }
    const handleFakeBoobs = (value: boolean) => {
        setBoobs(value)
    }

    const handleBirthPlace = (event: ChangeEvent<HTMLInputElement>) => {
        setBirthPlace(event.target.value)
        setValidBirthPlace(textLengthValidatorResult.validator(event.target.value))
    }
    const handleZodiac = (value: string) => {
        setZodiac(value)
    }
    const handleMeasurements = (event: ChangeEvent<HTMLInputElement>) => {
        setMeasurements(event.target.value)
        setValidMeasurements(textLengthValidatorResult.validator(event.target.value))
    }
    const handleOrientation = (value: string) => {
        setOrientation(value)
    }
    const handleEthnicity = (value: string) => {
        setEthnicity(value)
    }

    function areAllValid() {
        return (
            hair !== "" &&
            validHair &&
            weight !== "" &&
            validWeight &&
            eyes !== "" &&
            validEyes &&
            birthPlace !== "" &&
            validBirthPlace &&
            measurements !== "" &&
            validMeasurements &&
            orientation !== "" &&
            ethnicity !== "" &&
            zodiac !== ""
        )
    }

    return (
        <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!validWeight}
                            value={weight}
                            fullWidth
                            onChange={handleWeight}
                            label={t("dashboard.profile.physics.weight")}
                            helperText={!validWeight ? decimalValidatorResult.message : ""}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={!validHeight}
                            value={height}
                            onChange={handleHeight}
                            fullWidth
                            label={t("dashboard.profile.physics.height")}
                            helperText={!validHeight ? decimalValidatorResult.message : ""}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">m</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={hair}
                            onChange={handleHair}
                            fullWidth
                            label={t("dashboard.profile.physics.hair")}
                            error={!validHair}
                            helperText={!validHair ? textLengthValidatorResult.message : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={eyes}
                            onChange={handleEyes}
                            fullWidth
                            label={t("dashboard.profile.physics.eyes")}
                            error={!validEyes}
                            helperText={!validEyes ? textLengthValidatorResult.message : ""}
                        />
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
                            label={t("dashboard.profile.physics.fakeTits")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={birthPlace}
                            onChange={handleBirthPlace}
                            fullWidth
                            label={t("dashboard.profile.physics.birthplace")}
                            error={!validBirthPlace}
                            helperText={!validBirthPlace ? textLengthValidatorResult.message : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                                    label={t("dashboard.profile.physics.zodiac")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="measurements"
                            fullWidth
                            value={measurements}
                            onChange={handleMeasurements}
                            label={t("dashboard.profile.physics.measurements")}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
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
                                    {...params}
                                    variant="standard"
                                    label={t("dashboard.profile.physics.sexualOrientation")}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                                    label={t("dashboard.profile.physics.ethnicity")}
                                />
                            )}
                        />
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
                            {t("dashboard.profile.continue.back")}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!areAllValid()}
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
                        {props.stepId === MAX_STEPS_PROFILE ? t("dashboard.profile.continue.confirm") : t("dashboard.profile.continue.next")}
                    </Button>
                </div>
        </React.Fragment>
    )
}
