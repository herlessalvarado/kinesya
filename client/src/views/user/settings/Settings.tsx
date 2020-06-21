import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { Paper, Menu, MenuItem } from '@material-ui/core';
import Spanish from "../../../assets/flags/spanish.jpg"
import English from "../../../assets/flags/uk.png"

export default function Pricing() {
  const classes = useStyles();
  const { t, i18n } = useTranslation('common');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
		setAnchorEl(null);
	};

  function actualFlag(){
    let flag; 
    switch (i18n.language) {
      case "en":
        flag = 
          (
          <img
          style={{ width: "2rem", height: "1.5rem" }}
          src={English}
          alt=""
        />)
        break;
      case "es":
       flag =  (<img
        style={{ width: "2rem", height: "1.5rem" }}
        src={Spanish}
        alt=""
      />)
      break;
    }
    return flag
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" component="main">
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                { t('dashboard.settings.title') }
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography component="h1" variant="h6" align="center" color="textPrimary" gutterBottom>
                        { t('dashboard.settings.language') }
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ textAlign:"center"}}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleOpenMenu}>
                        {actualFlag()}
                    </Button>
                    </div>
                    <Menu id="lang-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                        <MenuItem onClick={() => i18n.changeLanguage("en") && setAnchorEl(null)}>
                            <img style={{ width: "2rem", height: "1.5rem" }} src={English} alt="" />
                        </MenuItem>
                        <MenuItem onClick={() => i18n.changeLanguage("es") && setAnchorEl(null)}>
                            <img style={{ width: "2rem", height: "1.5rem" }} src={Spanish} alt="" />
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
}