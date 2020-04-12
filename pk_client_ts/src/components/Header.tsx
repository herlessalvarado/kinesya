import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme)=>
  createStyles({
    toolbar:{
        backgroundColor: "black",
    },
    middle:{
        flex: 1,
    },
    typography:{
        color: "white",
    },
    button:{
        margin: theme.spacing(1),
        border: `1px solid #BF953F`,
        backgroundColor: "black",
        color: "#BF953F",
        "&:hover": {
            backgroundColor: "#BF953F",
            color: "black",
        },
    },
  }),
);

interface HeaderProps{
    title: string;
}

export default function Header(props: HeaderProps) {
    const classes = useStyles();

    return(
        <React.Fragment>
            <CssBaseline>
                <Toolbar className={classes.toolbar}>
                    <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="textSecondary"
                        align="center"
                        noWrap
                        className={classes.typography}
                        >
                        {props.title}
                    </Typography>
                    </Link>
                    <Typography className={classes.middle}/>
                    <Link to='/login' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Button className={classes.button}>
                            Iniciar sesión
                        </Button>
                    </Link>
                    <Link to='/register' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <Button className={classes.button}>
                            Registrarse
                        </Button>
                    </Link>
                </Toolbar>
            </CssBaseline>
        </React.Fragment>
    )
};