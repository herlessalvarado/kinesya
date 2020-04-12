import React, { useState, useEffect, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import Header from '../components/Header';
import UserService from '../network/UserService';
import { useHistory } from 'react-router-dom';
import { checkAuth } from '../cache/CookieManager'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#BF953F',
        },
    },
});

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            background: 'linear-gradient(90deg,#e8d3af,#cda777)!important',
        },
    }),
);

export default function Register() {
    const classes = useStyles();
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event : ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    
    const handlePassword = (event : ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    useEffect(()=>{
      if (!!checkAuth())
        history.push("/dashboard")
    })

    const SignUp = (email: string, password: string) => {
        const userService = new UserService();
        userService.signUp(email,password).then((res)=>{
            console.log(res);
            history.push('/login');
        })
    }

  return (
      <React.Fragment>
          <Header title="Kinesya"></Header>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <ThemeProvider theme={theme}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={handlePassword}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth 
            variant="contained" 
            className={classes.submit}
            onClick={()=>SignUp(email,password)}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tienes una cuenta? Inicia sesión.
              </Link>
            </Grid>
          </Grid>
        </form>
        </ThemeProvider>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    </React.Fragment>
  );
}