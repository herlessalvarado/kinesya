import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root:{
            maxWidth: 345,
        },
        media:{
            objectFit: 'contain',
        },
        button:{
            flex: 1,
        },
    })
)

interface CardProps{
    name ?: string,
    image ?: string,
    location ?: string,
    phone ?: Number
}

export default function SmallCard(props: CardProps){
    const classes = useStyles();

    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              className={classes.media}
              image={props.image}
              title={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.location}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="large" className={classes.button}>
              {props.phone}
            </Button>
          </CardActions>
        </Card>
      );
};