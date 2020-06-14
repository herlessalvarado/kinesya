import React, { useEffect, lazy, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import Copyright from '../../../components/footer/Footer';
import Pricing from '../pricing/Pricing';
import HomeCard from '../../../components/card/homeCard/HomeCard';
import { ReactComponent as Logo } from '../../../assets/logo/kinesya.svg';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useHistory } from "react-router-dom";
import { AuthOff, setUser, getUser } from '../../../cache/cookies/cookieManager';
import { getUserByToken } from '../../../network/userService';
import { mapUserDTOToViewModel } from '../../../commons/user_mapper';
import { UserDTO } from '../../../dto/user';
import { NullUser } from '../../../models/user';
import { DEFAULT_PHOTO } from '../../../commons/constants';
const Profile = lazy(()=>import('../profile/Profile')) 


const drawerWidth = 240;

function preventDefault(event: any) {
    event.preventDefault();
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    backgroundColor: "white",
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  depositContext: {
    flex: 1,
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const history = useHistory()
  let { path, url } = useRouteMatch();
  const [user,setCurrentUser] = useState(NullUser) 

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  useEffect(() => {
    let valid = true
    if (valid) {
        getUserByToken()
            .then((res) => {
                const  _user =  mapUserDTOToViewModel(res as UserDTO)
                setUser(_user)
                if (_user.name.length > 0)
                {
                  setCurrentUser(_user)
                }
                
            })
            .catch(() => {
                history.push("/login")
            })
    }
    return () => {
        valid = false
    }
}, [])

  return (
    <div className={classes.root}>
        <AppBar position="absolute"  className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                <Logo />
            </Typography>
            <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            <IconButton color="inherit">
           
                <HomeIcon />
            
                
            </IconButton>
            </Link> 
            <Link to="/login" style={{ color: "inherit", textDecoration: "inherit" }}>
            <IconButton color="inherit" onClick={()=>{AuthOff()}}>
                
                <ExitToAppIcon  />
                
            </IconButton>
            </Link>
            </Toolbar>
        </AppBar>
    <Router>
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>
                <Link to={`${url}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to={`${url}/profile`} style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </Link>
                <Link to={`${url}/pricing`} style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <AttachMoneyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Pricing" />
                    </ListItem>
                </Link>
                <Link to={`${url}/settings`} style={{ color: "inherit", textDecoration: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </Drawer>
        <main className={classes.content}>
        {console.log(user)}
        <Switch>
            <Route exact path={path}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Typography component="h1" variant="h5"  color="textPrimary" gutterBottom>
                        Bienvenida {user.name}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <HomeCard
                                onClick={() => preventDefault}
                                name={user.name}
                                location={user.location}
                                image={user.bannerPhoto[0].url ||  DEFAULT_PHOTO }
                                phone={Number(user.phone)}
                            ></HomeCard>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Facturación
                                </Typography>
                                <Typography component="p" variant="h6">
                                    Su ciclo se renovará en 5 días
                                </Typography>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    el 15 de Junio del 2020
                                </Typography>
                                <Link to={`${url}`} style={{ color: "inherit", textDecoration: "inherit" }}>
                                    Más info
                                </Link>
                            </Paper>
                        </Grid>  
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </Route>
            <Route path={`${path}/profile`}>
                <div className={classes.appBarSpacer} />
                        <Profile  />
                        
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                
            </Route>
            <Route path={`${path}/pricing`}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Pricing />
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </Route>
        </Switch>
        </main>
        </Router>
        </div>
    
  );
}