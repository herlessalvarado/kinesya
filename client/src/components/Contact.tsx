import React, { useState, ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
    MIN_PRICE,
    DISTRICTS,
    SERVICES,
} from "../utils/constants"
import { createMuiTheme, ThemeProvider, FormControl, InputLabel, Input, InputAdornment, Chip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

export default function Contact() {
    const [price, setPrice] = useState(MIN_PRICE)
    const [phone, setPhone] = useState<number>(51)
    const [location, setLocation] = useState("")
    const [tags, setTags] = useState(Array<string>())

    const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.target.value, 10) || price)
    }

    const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(parseInt(event.target.value, 10) || phone)
    }

    const handleLocation = (value: string) => {
        setLocation(value)
    }

    const handleTags = (newValue: Array<string>) => {
        setTags(newValue)
    }

  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
      <Typography variant="h6" gutterBottom>
        Contacto y Servicios
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="standard-adornment-amount">
                                        Precio
                                    </InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        type="number"
                                        value={price}
                                        onChange={handlePrice}
                                        startAdornment={
                                            <InputAdornment position="start">S/.</InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="phone"
                                    name="Phone"
                                    label="Teléfono"
                                    fullWidth
                                    value={phone}
                                    autoComplete="fphone"
                                    onChange={handlePhone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    id="districts"
                                    selectOnFocus
                                    value={location}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleLocation(value)
                                    }}
                                    options={DISTRICTS}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Distrito"
                                            placeholder="Distrito"
                                            helperText="Selecciona tu distrito"
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
                                        <TextField
                                            {...params}
                                            label="Servicios"
                                            placeholder="Servicios"
                                        />
                                    )}
                                />
                            </Grid>
      </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}