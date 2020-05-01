import React, { useState, ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
    Zodiac,
    Orientations,
    Ethnicities,
} from "../utils/constants"
import validateDecimal from "../helpers/validators/field_validators"
import { createMuiTheme, ThemeProvider, FormControl, InputAdornment, FormControlLabel, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ValidateFields {
    value: string
    valid: boolean
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

export default function Physics() {
    const [height, setHeight] = useState<ValidateFields>({ valid: true, value: "" })
    const [weight, setWeight] = useState<ValidateFields>({ valid: true, value: "" })
    const [eyes, setEyes] = useState("")
    const [hair, setHair] = useState("")
    const [fakeBoobs, setFakeBoobs] = useState(false)
    const [birthPlace, setBirthPlace] = useState("")
    const [zodiac, setZodiac] = useState("")
    const [measurements, setMeasurements] = useState("")
    const [orientation, setOrientation] = useState("")
    const [etnia, setEtnia] = useState("")

    const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setHeight({ ...height, value: event.target.value })
    }
    const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight({ ...weight, value: event.target.value })
    }

    const handleEyes = (event: ChangeEvent<HTMLInputElement>) => {
        setEyes(event.target.value)
    }
    const handleHair = (event: ChangeEvent<HTMLInputElement>) => {
        setHair(event.target.value)
    }
    const handleFakeBoobs = (value: boolean) => {
        setFakeBoobs(value)
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
        setEtnia(value)
    }

    function validateHeight() {
        if (!validateDecimal(height.value)) setHeight({ ...height, valid: false })
    }
    function validateWeight() {
        if (!validateDecimal(weight.value)) setWeight({ ...weight, valid: false })
    }

  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
      <Typography variant="h6" gutterBottom>
        Caraterísticas Físicas
      </Typography>
      <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        error={!height.valid}
                                        value={height.value}
                                        onFocus={() => {
                                            setHeight({ ...height, valid: true })
                                        }}
                                        onBlur={() => {
                                            validateHeight()
                                        }}
                                        onChange={handleHeight}
                                        fullWidth
                                        label="Altura"
                                        placeholder="Altura"
                                        helperText={!height.valid ? "Altura invalida" : ""}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">m</InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!weight.valid}
                                    value={weight.value}
                                    onFocus={() => {
                                        setWeight({ ...weight, valid: true })
                                    }}
                                    onChange={handleWeight}
                                    onBlur={() => {
                                        validateWeight()
                                    }}
                                    fullWidth
                                    label="Peso"
                                    placeholder="Peso"
                                    helperText={!weight.valid ? "Peso invalido" : ""}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">Kg</InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={hair}
                                    onChange={handleHair}
                                    fullWidth
                                    label="Cabello"
                                    placeholder="Cabello"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={eyes}
                                    onChange={handleEyes}
                                    fullWidth
                                    label="Ojos"
                                    placeholder="Ojos"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={fakeBoobs}
                                            onChange={(event, value) => {
                                                handleFakeBoobs(value)
                                            }}
                                            name="checkedFakeBoobs"
                                        />
                                    }
                                    label="Tetas Falsas"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={birthPlace}
                                    onChange={handleBirthPlace}
                                    fullWidth
                                    label="Lugar de Nacimiento"
                                    placeholder="Lugar de Nacimiento"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="zodiac"
                                    selectOnFocus
                                    value={zodiac}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleZodiac(value)
                                    }}
                                    options={Zodiac}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Zodiaco"
                                            placeholder="Zodiaco"
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
                                    label="Medidas"
                                    placeholder="Medidas"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="orientation"
                                    selectOnFocus
                                    value={orientation}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleOrientation(value)
                                    }}
                                    options={Orientations}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Orientacion Sexual"
                                            placeholder="Orientacion"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="etnia"
                                    selectOnFocus
                                    value={etnia}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleEthnicity(value)
                                    }}
                                    options={Ethnicities}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Etnia"
                                            placeholder="Etnia"
                                        />
                                    )}
                                />
                            </Grid>
      </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}