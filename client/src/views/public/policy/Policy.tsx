import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PrivacyPolicy from "../../../components/policy/PrivacyPolicy"
import TermsConditions from "../../../components/policy/TermsConditions"
import Header from '../../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width:"100%",
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function SimpleTabs() {
  const classes = useStyles();
  const { t } = useTranslation('common')
  const location = useLocation()
  const [value, setValue] = React.useState(getCurrentTab());
  

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function getCurrentTab(){
      let result = 0
    switch (location.hash) {
        case "#terms_conditions":
            result = 1
            break;
        case "#privacy_policy":
            result = 0
            break;
        default:
            break;

    }
    return result
   }

  return (
    <div className={classes.root}>
        <Header/>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange} 
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Info tabs" >
          <Tab label={t("terms.policy.title")}  {...a11yProps(0)} />
          <Tab label={t("terms.conditions.title")} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PrivacyPolicy/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TermsConditions/>
      </TabPanel>
    </div>
  );
}