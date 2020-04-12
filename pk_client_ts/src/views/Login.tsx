import React, { useState, useEffect, ChangeEvent } from 'react';
import LoginGirl from '../assets/loginGirl.jpg';
import { createStyles, makeStyles, Theme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Copyrigth from '../components/Copyright';
import UserService from '../network/UserService';
import { useHistory } from 'react-router-dom';
import { AuthOn, checkAuth } from '../cache/CookieManager'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#BF953F',
        },
    },
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: `url(${LoginGirl})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor:
              theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        paper: {
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        typography: {
            margin: theme.spacing(2),
        },
        button: {
            margin: theme.spacing(3, 0, 2),
            background: 'linear-gradient(90deg,#e8d3af,#cda777)!important',
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
    }),
);

export default function Login(){
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

    const LogIn = (email: string, password: string) => {
        const userService = new UserService();
        userService.logInUser(email,password).then((res) => {
            console.log(res);
            AuthOn();
        });
    };

    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" className={classes.typography}>
                            Kinesya
                        </Typography>
                        <ThemeProvider theme={theme}>
                            <form className={classes.form} autoComplete="off">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo electrónico"
                                    name="email"
                                    autoFocus
                                    onChange={handleEmail}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    type="password"
                                    label="Contraseña"
                                    name="password"
                                    autoFocus
                                    onChange={handlePassword}
                                />
                            </form>
                        </ThemeProvider>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            className={classes.button} 
                            onClick={() => {LogIn(email,password)}}
                        >
                            Iniciar sesión
                        </Button>
                        <Copyrigth></Copyrigth>
                    </div>
                </Grid>
            </CssBaseline>
        </Grid>
    )
}