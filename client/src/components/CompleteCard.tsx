import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: "50%",
    },
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
    media: {
        width: 200,
        height: 400,
        objectFit: 'cover',
    },
    ref: {
        objectFit: 'contain',
    }
  }));

interface CardProps {
    name ?: string,
    description ?: string,
    price ?: Number,
    profile ?: string,
    references ?: Array<string>,
}

const CompleteCard:FC<CardProps> = (props : CardProps) => {
  const classes = useStyles();
  const path = "http://localhost:8000/"

  return (
    <Card className={classes.card}>
        <div className={classes.root}>
      <CardActionArea className={classes.details}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" color="primary">
          {props.price}
        </Button>
      </CardActions>
      </CardActionArea>
      <CardMedia
          component="img"
          height= "200"
          className={classes.media}
          image={props.profile}
          title={props.name}
        />
      </div>
      <div>
          <Typography variant="h5">
              Fotos
          </Typography>
          <Grid container spacing={3}>
        { props.references ?
            props.references.map((reference,index) => (
            <Grid key={index} item xs={3} sm={3}>
              <CardMedia
          component="img"
          height= "200"
          width= "200"
          className={classes.ref}
          image={path+reference}
        />
            </Grid>
            )) : <Typography variant="h6">
                No hay mas fotos</Typography>}
                {/* </Grid> */}
        </Grid>
      </div>
    </Card>
  );
}

export default CompleteCard