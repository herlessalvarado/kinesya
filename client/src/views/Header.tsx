import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { AuthOff } from '../cache/CookieManager';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

interface Section {
    title : string;
    url : string;
}

interface HeaderProps {
    title ?: string;
    sections ?: Section[];
}

const Header:FC<HeaderProps> = (props : HeaderProps) => {
  const classes = useStyles();
  const [aux, setAux] = useState(false);
  const Logout = () => {
    AuthOff();
    setAux(true);
  }
  
  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {props.title}
        </Typography>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      { props.sections ? props.sections.map((section: Section, index) => { 
          return(
          <Link key={index} to={section.url} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            {(section.title == 'Logout') ? <Button onClick={() => {Logout()}}>
            {section.title}
            </Button> : 
            <Button>
            {section.title}
            </Button>}
          </Link>
          )
         }) : null}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;