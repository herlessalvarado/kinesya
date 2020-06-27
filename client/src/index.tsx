import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_en from "./translations/en/common.json";
import common_es from "./translations/es/common.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'es',
  resources: {
      en: {
          common: common_en
      },
      es: {
          common: common_es
      },
  },
});

const theme = createMuiTheme({
  palette: {
     primary: {
       main: "#DF6F7F",
     },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <MuiThemeProvider theme = { theme }>
        <App />
      </MuiThemeProvider>
   </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
