import React, { useState,  ChangeEvent, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {Link  as Link2, useHistory} from 'react-router-dom';
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
import { ToastSuccessful } from '../components/Toast';

interface Employee{
  name?: string,
  description?: string,
  age?:number,
  price?: number,
  profilePhoto: string,
  referencePhotos: Array<string>

}

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

const MIN_AGE = 18;
const MAX_AGE = 99;
const MIN_PRICE = 0.0;

interface Photo {
  url?: string,
  file?: any
}

export default function Checkout() {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [age, setAge] = useState(MIN_AGE);
  const [price, setPrice] = useState(MIN_PRICE);
  const [profile, setProfile] = useState<Photo | undefined>();
  const [references, setReferences] = useState(Array<Photo>());
  const employeeService = new EmployeeService<Employee>();
  
  useEffect(()=>{
    employeeService.getEmployeeByToken().then((res)=>{
      
      setAge(res.age || MIN_AGE)
      setPrice(res.price || MIN_PRICE)
      if(!!res.profilePhoto)
        setProfile({url: process.env.REACT_APP_API_URL!+res.profilePhoto})
      if(res.referencePhotos.length > 0)
        setReferences(res.referencePhotos?.map((photo?:string):Photo =>({
          url: process.env.REACT_APP_API_URL!+photo
        })));
      setDescription(res.description || "")
      setName(res.name || "")
    })
  },[])

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
    
    setProfile({
      file: event.target.files[0],
      url: window.URL.createObjectURL(event.target.files[0])
    });
  };

  const handleChange = (event : any) => {
    
    let _references = Array.from(event.target.files).map((photo):Photo => ({
      file: photo,
      url: window.URL.createObjectURL(photo)
    }))
    
    setReferences(references?.concat(_references));
  };

  const update = () => {
    let formData = new FormData();
    formData.append('profile',profile?.file);
    references?.forEach((photo)=>{formData.append('references',photo.file)})
    formData.append('name',name);
    formData.append('description',description);
    formData.append('age',age);
    formData.append('price',price);
    formData.append('isPublic',true);
    employeeService.updateEmployee(formData).then((message) => {
    setToastMessage(message);
    setOpenToast(true);
    }).catch((err: AxiosError)=>{
      return err.message
    })
  }
  const handCloseToast = () =>{
    setOpenToast(false);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
          <Link2 to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            PK
          </Link2>
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
          value = {description}
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
                max: MAX_AGE, min: MIN_AGE 
            }
        }}
        fullWidth
        value={age}
        variant="outlined"
        onChange={handleAge}
        />

        <ToastSuccessful  key="alert" open={openToast} handleClose={handCloseToast} message={toastMessage} ></ToastSuccessful>
        
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
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="inherit" noWrap>
              Foto de perfil
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
        <Input id="assets" name="assets" type="file" onChange={handleProfile} />
        </Grid>
        {
          !!profile? <Grid item xs={12}>
          <CardMedia
          component="img"
          height= "200"
          className={classes.media}
          image={profile.url} 
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
        <Input id="assets2" name="assets2" type="file" inputProps={{ multiple: true }}  onChange={handleChange} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
        {
         references?.map((photo: Photo,index:number)=>(
          <Grid key={index} item xs={12} sm={3}>
                    <CardMedia
                       component="img"
                       height= "200"
                       className={classes.media}
                       image={photo.url} 
                    />
            </Grid>
         ))
        }
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button
        onClick={update}>
          Publicar
        </Button>
      </Grid>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}