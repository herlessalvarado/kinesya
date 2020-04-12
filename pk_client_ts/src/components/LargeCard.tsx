import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ButtonBase, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,

  },
  card: {
    padding: theme.spacing(0.2),
    height : '40vw',
    overflowY:'auto',
    overflowX:'hidden',
    margin: 'auto',
    width: '50vw',
    '&::-webkit-scrollbar': {
      width: '0.5em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  
  },
  textField:{
    margin:'1.5vh'
  },

  img: {
    width: '100%',
    objectFit: 'cover',
    height: '100%',
  },
}),
  );

interface CardProps {
    name ?: string,
    description ?: string,
    age ?: Number,
    location ?: string,
    phone ?: Number,
    price ?: Number,
    profile ?: string,
    references ?: Array<string>,
}

export default function LargeCard (props : CardProps){
  const classes = useStyles();
  const path = process.env.REACT_APP_API_URL!;


  return (
    
      <Card className={classes.card}>
        <CardContent>
        <Grid container spacing={2}>
            <Grid item sm md={6} container alignItems="center" >
              <ButtonBase>
                <img className={classes.img}  alt="complex" src={`${props.profile}`} />
              </ButtonBase>
            </Grid>
            <Grid item md={6} sm container  >
              <Grid item xs={12} container alignContent='center'>
              <Typography variant="h5" component="h2">
                {props.name}
              </Typography>
              </Grid>
              <Grid item xs={12} container alignContent='center'>
              <Typography variant="h5" component="h2">
                {props.name}
              </Typography>
              </Grid>
              <Grid item xs={12} container alignContent='center'>
              <Typography  variant="h5" component="h2">
                {props.name}
              </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} wrap="wrap">
            {
              props.references?.map((reference,index)=>(
                <Grid item sm md={6}>
                  <ButtonBase>
                    <img key={index} className={classes.img} alt="complex" src={path + reference} />
                  </ButtonBase>
                </Grid>
              ))
            }
          </Grid>
        </CardContent>
      </Card>

  );
};