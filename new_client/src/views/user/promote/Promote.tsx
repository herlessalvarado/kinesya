import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

function preventDefault(event: any) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Promocionar
      </Typography>
      <Typography component="p" variant="h4">
        S/. 100.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Muestra tu perfil en el top
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Proximamente
        </Link>
      </div>
    </React.Fragment>
  );
}