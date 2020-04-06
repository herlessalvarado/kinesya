import React, { useState, FormEvent, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import CardMedia from '@material-ui/core/CardMedia';
import EmployeeService from '../network/employeeService';
import { AxiosError } from 'axios';
import { Button } from '@material-ui/core';
import FormData from 'form-data'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        PK
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
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
  media: {
    objectFit: 'contain',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState(18);
  const [price, setPrice] = useState(100);
  const [profile, setProfile] = useState('');
  const [file, setFile] = useState();
  var arrProf: any;
  var arrFiles: any;
  var aux: Array<any> = [];

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleAge = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value, 10));
  }

  const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value, 10));
  }

  const handleProfile = (event: any) => {
    arrProf = event.target.files[0];
    setProfile(URL.createObjectURL(event.target.files[0]));
  };

  const handleChange = (event : any) => {
    arrFiles = Array.from(event.target.files);
    const files = arrFiles.map((file: any, index: any) => {
        const src = window.URL.createObjectURL(file);
        aux.push(src);
    })
    setFile(aux);
  };

  const update = (name: string, description: string, age: number, price: number, profilePhoto: any, referencePhotos: any) => {
    let formData = new FormData();
    formData.append('profile',profile,{contentType: 'image/jpeg'});
    // formData.append('references',arrFiles,{contentType: 'image/jpeg'});
    formData.append('name',name);
    formData.append('description',description);
    formData.append('age',age);
    formData.append('price',age);
    let employeeService = new EmployeeService();
    employeeService.updateEmployee(formData).then(res => {
      console.log(res);
    }).catch((err: AxiosError)=>{
      return err.message
    })
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Pk
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
            Completar perfil
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="Name"
            label="Nombre"
            fullWidth
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
          onChange={handleDescription}
        />
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
                max: 99, min: 18 
            }
        }}
        fullWidth
        value={age}
        variant="outlined"
        onChange={handleAge}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Precio</InputLabel>
          <Input
            id="standard-adornment-amount"
            type="number"
            value={price}
            onChange={handlePrice}
            startAdornment={<InputAdornment position="start">S/.</InputAdornment>}
          />
        </FormControl>
        {console.log(profile)}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="inherit" noWrap>
              Foto de perfil
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
        <Input id="assets" name="assets" type="file" onChange={handleProfile} fullWidth/>
        </Grid>
        {
          profile ? <Grid item xs={12}>
          <CardMedia
          component="img"
          height= "200"
          className={classes.media}
          image={profile} 
          />
        </Grid> : null
        }
        </Grid>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="inherit" noWrap>
              Fotos secundarias
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
        <Input id="assets2" name="assets2" type="file" inputProps={{ multiple: true }} onChange={handleChange} fullWidth/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
        {
            file ? file.map((f: any,index: any) => {
                return(
                <Grid key={index} item xs={12} sm={3}>
                    <CardMedia
                       component="img"
                       height= "200"
                       className={classes.media}
                       image={f} 
                    />
                </Grid>)
            }) : null
        }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
        onClick={() => update(name,description,age,price,profile,file)}>
          Publicar
        </Button>
      </Grid>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}