import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'contain',
  }
});

interface CardProps {
    name ?: string,
    image ?: string,
    description ?: string,
    price ?: Number
}

const ProfileCard:FC<CardProps> = (props : CardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height= "200"
          className={classes.media}
          image={props.image}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          {props.price}
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default ProfileCard