import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'
import Logo from '../../assets/logo.png'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { getJWT, AuthOff } from '../../cache/cookies/cookieManager'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Header() {
  const classes = useStyles();
  const { t, i18n } = useTranslation('common');
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  function logOut() {
    AuthOff()
  }

  if (!getJWT()){
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
              <IconButton onClick={handleOpen} edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton>
              <SwipeableDrawer
              anchor="left"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              >
                  <Link to="/login" title="login" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <Button size="small"> { t('header.login') } </Button>
                  </Link>
                  <Link to="/register" title="register" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <Button size="small"> { t('header.register') } </Button>
                  </Link>
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
              { i18n.language }
          </Button>
          <Menu
            id="lang-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => i18n.changeLanguage('en') && setAnchorEl(null)}>EN</MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage('es') && setAnchorEl(null)}>ES</MenuItem>
          </Menu>
              </SwipeableDrawer>
          </Hidden>
          <div className={classes.toolbarTitleXs}>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoXs} src={Logo} alt="Logo" />
                </Link>
              </Hidden>
          </div>
          <div className={classes.toolbarTitle}>
              <Hidden only={['xs', 'md', 'lg', 'xl']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoSm} src={Logo} alt="Logo" />
                  </Link>
              </Hidden>
              <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoMd} src={Logo} alt="Logo" />
                </Link>
              </Hidden>
              <Hidden only={['xs', 'sm', 'md']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoLg} src={Logo} alt="Logo" />
                </Link>
              </Hidden>
          </div>
          <Hidden xsDown>
            <Link to="/register" style={{ color: "inherit", textDecoration: "inherit" }}>
              <Button className={classes.buttons} variant="outlined" size="small"> { t('header.register') } </Button>
            </Link>
            <Link to="/login" style={{ color: "inherit", textDecoration: "inherit" }}>
              <Button className={classes.buttons} variant="outlined" size="small">
                { t('header.login') }
              </Button>
            </Link>
            <Button className={classes.buttons} aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
              { i18n.language }
          </Button>
          <Menu
            id="lang-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => i18n.changeLanguage('en') && setAnchorEl(null)}>EN</MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage('es') && setAnchorEl(null)}>ES</MenuItem>
          </Menu>
          </Hidden>
        </Toolbar>
      </React.Fragment>
    );
  }else{
    return (
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
              <IconButton onClick={handleOpen} edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton>
              <SwipeableDrawer
              anchor="left"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              >
                  <Link to="/dashboard" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <Button size="small"> { t('header.dashboard') } </Button>
                  </Link>
                  <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <Button size="small" onClick={logOut}> { t('header.logout') } </Button>
                  </Link>
              </SwipeableDrawer>
          </Hidden>
          <div className={classes.toolbarTitleXs}>
              <Hidden only={['sm', 'md', 'lg', 'xl']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoXs} src={Logo} alt="Logo" />
                </Link>
              </Hidden>
          </div>
          <div className={classes.toolbarTitle}>
              <Hidden only={['xs', 'md', 'lg', 'xl']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoSm} src={Logo} alt="Logo" />
                  </Link>
              </Hidden>
              <Hidden only={['xs', 'sm', 'lg', 'xl']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoMd} src={Logo} alt="Logo" />
                </Link>
              </Hidden>
              <Hidden only={['xs', 'sm', 'md']}>
                <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
                  <img className={classes.logoLg} src={Logo} alt="Logo" />
                </Link>
              </Hidden>
          </div>
          <Hidden xsDown>
            <Link to="/login" style={{ color: "inherit", textDecoration: "inherit" }}>
              <Button className={classes.buttons} variant="outlined" size="small">
                { t('header.logout') }
              </Button>
            </Link>
            <Button className={classes.buttons} aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
              { i18n.language }
          </Button>
          <Menu
            id="lang-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => i18n.changeLanguage('en') && setAnchorEl(null)}>EN</MenuItem>
            <MenuItem onClick={() => i18n.changeLanguage('es') && setAnchorEl(null)}>ES</MenuItem>
          </Menu>
          </Hidden>
        </Toolbar>
      </React.Fragment>
    )
  }
}