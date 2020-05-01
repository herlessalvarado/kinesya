import React, { useState, ChangeEvent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
    MIN_AGE,
    MAX_AGE,
} from "../utils/constants"
import DateFnsUtils from "@date-io/date-fns"
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

export default function PersonalData() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [age, setAge] = useState(MIN_AGE)
    const [birthday, setBirthday] = useState(new Date())

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleBirthday = (date: Date) => {
        setBirthday(date)
    }

    const handleAge = (event: ChangeEvent<HTMLInputElement>) => {
        setAge(parseInt(event.target.value, 10) || age)
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
                                    required
                                    id="name"
                                    name="Name"
                                    label="Nombre"
                                    fullWidth
                                    value={name}
                                    autoComplete="fname"
                                    onChange={handleName}
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
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        disableToolbar
                                        label="Fecha de Nacimiento"
                                        variant="inline"
                                        value={birthday}
                                        placeholder="Fecha de Nacimiento"
                                        onChange={(date) => {
                                            if (date !== null) handleBirthday(date)
                                        }}
                                        format="MM/dd/yyyy"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="age"
                                    label="Edad"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            max: MAX_AGE,
                                            min: MIN_AGE,
                                        },
                                    }}
                                    fullWidth
                                    value={age}
                                    variant="outlined"
                                    onChange={handleAge}
                                />
                            </Grid>
      </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}